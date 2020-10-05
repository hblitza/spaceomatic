import ImageLayer from 'ol/layer/Image';
import OlProjection from "ol/proj/Projection";

import Static from 'ol/source/ImageStatic'

export class ImageOverlay {
    static createImageOverlay (name, extent) {

        var extent1 = [0, 0, 1024, 968];
        var projection = new OlProjection({
            code: 'xkcd-image',
            units: 'pixels',
            extent: extent1
        });
        
        const source = new Static({
            url: "data/" + name + ".png",
            extent: extent1,
            projection: projection
        });

        source.on('error', evt => {
            debugger
            console.log('abc');
            console.log(evt.getState());
        });

        debugger
        
        // debugger
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


