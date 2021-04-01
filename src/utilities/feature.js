import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OlFormatGeoJSON from "ol/format/GeoJSON";

export class Features {
        static loadGPKG (source) {
            // eslint-disable-next-line no-undef
            window.GeoPackage.GeoPackageAPI.open("data/geodata/cities.GPKG")
                .then(gpkg => {
                    const featureTables = gpkg.getFeatureTables();
                    const geojsonFeatures = [];
                    const features = [];

                    for (let row = 1; row < 56; row++) {
                        geojsonFeatures.push(gpkg.getFeature(featureTables[0], row));
                    }

                    geojsonFeatures.forEach(ft => {
                        features.push(new OlFormatGeoJSON().readFeature(ft, {
                                dataProjection: 'EPSG:4326',
                                featureProjection: 'EPSG:3035'
                            })
                        )
                    });
                    source.addFeatures(features);
                })
                .catch(error => {
                    debugger
                })
        }
        static createVectorLayer () {
            return new VectorLayer({
                source: new VectorSource(),
                name: "featureLayer"
            })
        };
        static loadGeoJSON (name, source) {
            const path = "data/geodata/" + name + ".geojson";
            fetch(path)
                .then(function (response) {
                    response.json().then(data => {
                        const geojsonFt = new OlFormatGeoJSON().readFeatures(data, {
                            dataProjection: 'EPSG:4326',
                            featureProjection: 'EPSG:3035'
                        });
                        source.addFeatures(geojsonFt);
                      });     
                    })
                .catch(error => {
                    debugger
                })
        };
}
