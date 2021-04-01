import ImageLayer from 'ol/layer/Image';
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
                    return;
                }
            })
            .catch((error) => {
                debugger
            })

    };
}


