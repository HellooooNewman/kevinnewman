export type ViewMode = 'combined' | 'texture' | 'vertices' | 'wireframe';
export type TextureReference = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
  format: string;
  texelBytes: number;
};
export type ModelStats = { triangles: number; textureCount: number; textureBytes: number };
export type ViewerOptions = {
  src: string;
  rendering: 'gltf' | 'n64';
};
export type ViewerHandle = {
  setMode: (mode: ViewMode) => void;
  reset: () => void;
  zoom: (factor: number) => void;
  pan: (horizontal: number, vertical: number) => void;
  dispose: () => void;
};
