import { AmbientLight, Box3, DirectionalLight, Material, Mesh, MeshBasicMaterial, MOUSE, PerspectiveCamera, Scene, ShaderMaterial, Texture, Vector3, WebGLRenderer, type Object3D } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createN64Material } from './n64-material';
import type { N64MaterialExtension, N64SamplerExtension } from './n64-material-settings';
import type { ViewerHandle, ViewerOptions } from './types';

type GltfJson = {
  materials?: { extensions?: { FAST64_materials_n64?: N64MaterialExtension }; pbrMetallicRoughness?: { baseColorTexture?: { index: number } } }[];
  textures?: { sampler?: number }[];
  samplers?: { extensions?: { FAST64_sampler_n64?: N64SamplerExtension } }[];
};

export async function createViewer(canvas: HTMLCanvasElement, options: ViewerOptions, signal: AbortSignal, onContextLost: () => void): Promise<ViewerHandle> {
  const geometries = new Set<Mesh['geometry']>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  let renderer: WebGLRenderer | undefined;
  let controls: OrbitControls | undefined;
  let observer: ResizeObserver | undefined;
  let disposed = false;
  const rememberMaterial = (material: Material) => {
    materials.add(material);
    for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value);
  };
  const rememberTree = (root: Object3D) => root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    geometries.add(object.geometry);
    (Array.isArray(object.material) ? object.material : [object.material]).forEach(rememberMaterial);
  });
  const contextLost = (event: Event) => { event.preventDefault(); onContextLost(); };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    observer?.disconnect();
    controls?.dispose();
    canvas.removeEventListener('webglcontextlost', contextLost);
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    const images = new Set<ImageBitmap>();
    textures.forEach((texture) => {
      if (typeof ImageBitmap !== 'undefined' && texture.image instanceof ImageBitmap) images.add(texture.image);
      texture.dispose();
    });
    images.forEach((image) => image.close());
    renderer?.dispose();
    renderer?.forceContextLoss();
  };
  try {
    const response = await fetch(options.src, { signal });
    if (!response.ok) throw new Error(`Model request failed (${response.status}).`);
    const bytes = await response.arrayBuffer();
    signal.throwIfAborted();
    const loader = new GLTFLoader();
    const gltf = await loader.parseAsync(bytes, new URL('.', new URL(options.src, location.href)).href);
    gltf.scenes.forEach(rememberTree);
    signal.throwIfAborted();
    const scene = new Scene();
    const model = gltf.scene;
    model.updateMatrixWorld(true);
    const json = gltf.parser.json as GltfJson;
    const renderedMaterials = new Set<Material>();
    model.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      const adapt = (original: Material) => {
        if (options.rendering === 'gltf') { renderedMaterials.add(original); return original; }
        if ('isSkinnedMesh' in object || object.morphTargetInfluences?.length) throw new Error('The N64 adapter currently supports static meshes.');
        const index = gltf.parser.associations.get(original)?.materials;
        const definition = index === undefined ? undefined : json.materials?.[index];
        const extension = definition?.extensions?.FAST64_materials_n64;
        if (!extension) throw new Error('This model is missing Fast64 material data. Use standard glTF rendering for ordinary models.');
        const textureIndex = definition?.pbrMetallicRoughness?.baseColorTexture?.index;
        if (extension.textures?.['0'] && extension.textures['0'].index !== textureIndex) throw new Error('N64 texture input differs from the exported glTF texture.');
        const samplerIndex = textureIndex === undefined ? undefined : json.textures?.[textureIndex]?.sampler;
        const sampler = samplerIndex === undefined ? undefined : json.samplers?.[samplerIndex]?.extensions?.FAST64_sampler_n64;
        const result = createN64Material(object, original as MeshBasicMaterial, extension, sampler);
        materials.add(result.material);
        renderedMaterials.add(result.material);
        if (result.texture) textures.add(result.texture);
        return result.material;
      };
      object.material = Array.isArray(object.material) ? object.material.map(adapt) : adapt(object.material);
    });
    const bounds = new Box3().setFromObject(model);
    if (bounds.isEmpty()) throw new Error('The model has no visible geometry.');
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const radius = size.length() / 2;
    model.position.sub(center);
    scene.add(model);
    scene.add(new AmbientLight(0xffffff, 2));
    const keyLight = new DirectionalLight(0xffffff, 3);
    keyLight.position.set(1, 2, 3);
    scene.add(keyLight);
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    // Let the themed CSS backdrop show through without reloading the model.
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    const camera = new PerspectiveCamera(40, 1, Math.max(radius / 1000, 0.001), radius * 100);
    controls = new OrbitControls(camera, canvas);
    controls.enablePan = true;
    controls.screenSpacePanning = true;
    controls.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };
    controls.minDistance = radius * 0.35;
    controls.maxDistance = radius * 8;
    // No animation loop or damping: render only on interaction and resize.
    const render = () => { if (!disposed) renderer!.render(scene, camera); };
    controls.addEventListener('change', render);
    const reset = () => {
      const direction = new Vector3(1, 0.45, 1.5).normalize();
      const right = new Vector3().crossVectors(camera.up, direction).normalize();
      const up = new Vector3().crossVectors(direction, right);
      const tanY = Math.tan(camera.fov * Math.PI / 360);
      let distance = 0;
      for (const x of [-0.5, 0.5]) for (const y of [-0.5, 0.5]) for (const z of [-0.5, 0.5]) {
        const corner = new Vector3(size.x * x, size.y * y, size.z * z);
        distance = Math.max(distance, corner.dot(direction) + Math.max(Math.abs(corner.dot(right)) / (tanY * camera.aspect), Math.abs(corner.dot(up)) / tanY) * 1.1);
      }
      controls!.maxDistance = Math.max(radius * 8, distance * 2);
      camera.position.copy(direction.multiplyScalar(distance));
      controls!.target.set(0, 0, 0);
      camera.lookAt(0, 0, 0);
      controls!.update();
      render();
    };
    const resize = () => {
      if (disposed) return;
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      renderer!.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      reset();
    };
    observer = new ResizeObserver(resize);
    observer.observe(canvas);
    canvas.addEventListener('webglcontextlost', contextLost);
    resize();
    return {
      setMode(mode) {
        for (const material of renderedMaterials) {
          if ('wireframe' in material) material.wireframe = mode === 'wireframe';
          if (material instanceof ShaderMaterial) material.uniforms.viewMode.value = ['combined', 'texture', 'vertices', 'wireframe'].indexOf(mode);
        }
        render();
      },
      reset,
      zoom(factor) {
        const offset = camera.position.clone().sub(controls!.target);
        offset.setLength(Math.max(controls!.minDistance, Math.min(controls!.maxDistance, offset.length() * factor)));
        camera.position.copy(controls!.target).add(offset);
        controls!.update();
        render();
      },
      pan(horizontal, vertical) {
        // Use the same screen-space panning as mouse/touch, scaled to the view.
        const step = canvas.clientHeight * 0.04;
        controls!.pan(-horizontal * step, vertical * step);
      },
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
