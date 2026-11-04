import { DoubleSide, FrontSide, Matrix3, NearestFilter, NoColorSpace, ShaderMaterial, Vector2, Vector3, type Mesh, type MeshBasicMaterial, type Texture } from 'three';
import { readN64Settings, type N64MaterialExtension, type N64SamplerExtension } from './n64-material-settings';

export function createN64Material(mesh: Mesh, original: MeshBasicMaterial, extension: N64MaterialExtension, sampler?: N64SamplerExtension) {
  const settings = readN64Settings(extension, sampler);
  if (settings.textured && (!original.map || !mesh.geometry.hasAttribute('uv'))) throw new Error('N64 texture or UV coordinates are missing.');
  if (!mesh.geometry.hasAttribute('color')) throw new Error('N64 vertex colors are missing.');
  const texture = original.map?.clone();
  if (texture) {
    // N64 intensity and shade multiply in their stored range, without PBR lighting.
    texture.colorSpace = NoColorSpace;
    texture.minFilter = texture.magFilter = NearestFilter;
    texture.generateMipmaps = false;
    texture.updateMatrix();
    texture.needsUpdate = true;
  }
  const image = texture?.image as { width: number; height: number } | undefined;
  const material = new ShaderMaterial({
    name: original.name,
    side: settings.cullBack ? FrontSide : DoubleSide,
    // The exported glTF says BLEND, but this combiner explicitly outputs alpha=1.
    transparent: false,
    uniforms: {
      tex: { value: texture ?? null },
      texSize: { value: new Vector2(image?.width ?? 1, image?.height ?? 1) },
      uvTransform: { value: texture?.matrix ?? new Matrix3() },
      levels: { value: (1 << settings.intensityBits) - 1 },
      primitive: { value: new Vector3(...settings.primitive as [number, number, number]) },
      textured: { value: settings.textured },
      viewMode: { value: 0 },
      threePoint: { value: settings.threePoint },
    },
    vertexShader: `
      attribute vec4 color;
      varying vec3 shade;
      varying vec2 texUV;
      uniform mat3 uvTransform;
      void main() {
        // Match tiny3d's importer: linear glTF vertex RGB → display gamma
        // before interpolation (tools/gltf_importer/src/parser.cpp).
        shade = floor(pow(clamp(color.rgb, 0.0, 1.0), vec3(0.4545)) * 255.0) / 255.0;
        texUV = (uvTransform * vec3(uv, 1.0)).xy;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform sampler2D tex;
      uniform vec2 texSize;
      uniform float levels;
      uniform vec3 primitive;
      uniform bool textured;
      uniform bool threePoint;
      uniform int viewMode;
      varying vec3 shade;
      varying vec2 texUV;
      float intensity(vec2 pixel) {
        return floor(texture2D(tex, (pixel + 0.5) / texSize).r * levels + 0.5) / levels;
      }
      float sampleTexture() {
        vec2 p = texUV * texSize - 0.5;
        vec2 base = floor(p);
        vec2 f = fract(p);
        if (!threePoint) return intensity(floor(texUV * texSize));
        // Interpolate inside one of the two triangles in a 2×2 texel block.
        if (f.x + f.y <= 1.0) {
          float a = intensity(base);
          return a + f.x * (intensity(base + vec2(1,0)) - a)
                   + f.y * (intensity(base + vec2(0,1)) - a);
        }
        float d = intensity(base + vec2(1,1));
        return d + (1.0-f.x) * (intensity(base + vec2(0,1)) - d)
                 + (1.0-f.y) * (intensity(base + vec2(1,0)) - d);
      }
      void main() {
        float t = textured ? sampleTexture() : 1.0;
        vec3 rgb = vec3(t) * shade * primitive;
        if (viewMode == 1) rgb = vec3(t);
        if (viewMode == 2) rgb = shade;
        if (viewMode == 3) rgb = vec3(0.65, 0.76, 1.0);
        gl_FragColor = vec4(clamp(rgb, 0.0, 1.0), 1.0);
      }`,
  });
  return { material, texture: texture as Texture | undefined };
}
