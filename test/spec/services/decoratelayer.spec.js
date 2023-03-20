import {layerDecoration as ngeoMiscDecorateLayer} from 'ngeo/misc/decorate.js';
import olLayerTile from 'ol/layer/Tile.js';
import olSourceOSM from 'ol/source/OSM.js';

describe('ngeo.misc.DecorateLayer', () => {
  it('can change the visibility', () => {
    const layer = new olLayerTile({
      source: new olSourceOSM(),
      visible: false,
    });
    ngeoMiscDecorateLayer(layer);
    layer.set('visible', true);
    expect(layer.getVisible()).toBe(true);
    layer.set('visible', false);
    expect(layer.getVisible()).toBe(false);
  });

  it('can change the opacity', () => {
    const layer = new olLayerTile({
      source: new olSourceOSM(),
      opacity: 0.5,
    });
    ngeoMiscDecorateLayer(layer);
    layer.set('opacity', 0.7);
    expect(layer.getOpacity()).toBe(0.7);
  });
});
