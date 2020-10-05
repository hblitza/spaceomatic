import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OlFormatGeoJSON from "ol/format/GeoJSON";

export class Features {
        static createVectorLayer () {
            return new VectorLayer({
                source: new VectorSource()
            })
        };
        static loadGeoJSON (name, source) {
            const path = "data/" + name + ".geojson";
            fetch(path)
                .then(function (response) {
                    response.json().then(data => {
                        const geojsonFt = new OlFormatGeoJSON().readFeatures(data, {
                            dataProjection: 'EPSG:4326',
                            featureProjection: 'EPSG:3857'
                        });
                        source.addFeatures(geojsonFt);
                      });     
                    })
                .catch(error => {
                    debugger
                })
        };
}
