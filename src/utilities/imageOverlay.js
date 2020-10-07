import ImageLayer from 'ol/layer/Image';
import OlProjection from "ol/proj/Projection";

import Static from 'ol/source/ImageStatic'

export class ImageOverlay {
    static createImageOverlay (name, extent, map) {
        const imgPath = "data/" + name + ".png";

        fetch(imgPath, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                    const source = new Static({
                        url: "data/" + name + ".png",
                        imageExtent: extent
                    });
            
                    const layer = new ImageLayer({
                        source: source
                    });
            
                    map.addLayer(layer);
                } else {
                    console.log('Image does not exist.');
                    return;
                }
            })
            .catch((error) => {
                debugger
            })

    };
    static imageLoadFunction = function(image, src) {
        debugger
        // Where you start showing the loader using a variable
        console.time('loader');
        image.getImage().addEventListener('load', function() {
          // Where you should mention to stop the loader
          console.timeEnd('loader');
        });
        image.getImage().src = src;
      };
}


