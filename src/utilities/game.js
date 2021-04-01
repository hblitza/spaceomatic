export class Game {
        static shuffleFeatures (features) {
            features.forEach(ft => {
                ft.getGeometry().translate(this.getRandomIntInclusive(-1000000,1000000) , this.getRandomIntInclusive(-1000000,1000000));
            });
        };
        static getRandomIntInclusive (min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive 
        }
};

