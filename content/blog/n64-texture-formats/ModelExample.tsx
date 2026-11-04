import ModelViewer from '@/components/ModelViewer/ModelViewer';
import { assetRoot } from './figures';
import reference from '@/public/assets/blog/pandemonium/models/columns-reference.json';

export default function ModelExample() {
  return <ModelViewer
    id="columns-3d"
    src={`${assetRoot}/models/columns.glb`}
    rendering="n64"
    title="Explore the boss-room columns"
    textures={reference.textures.map((texture) => ({ ...texture, src: `${assetRoot}/models/${texture.file}`, alt: `${texture.label} intensity texture used by the column model` }))}
    stats={reference.stats}
    poster={`${assetRoot}/models/columns-poster.jpg`}
    posterAlt="Four textured boss-room columns, rendered from the game’s mesh with vertex colors"
  />;
}
