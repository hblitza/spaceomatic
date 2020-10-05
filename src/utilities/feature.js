import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Bonn from "../data/Bonn.json";

export class Features {
        static loadGeoJSON (name) {
            const path = "../data/" + name + ".json";
            debugger
            fetch(path)
                .then(function (response) {
                    console.log(response);
                    debugger
                    response.json().then(data => {
                        console.log(data)
                      });     
                    })
                .catch(error => {
                    debugger
                })
        };
}
