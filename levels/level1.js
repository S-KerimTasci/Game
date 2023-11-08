let level1;

/**
 * 
 * This function sets the background, enemies, cloud and objects of the new level
 */
function initLevel() {
    level1 = new Level(
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ],

        [
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new SmallChicken(),
            // new SmallChicken(),
            // new SmallChicken(),
            new Endboss()
        ],

        new Cloud(),

        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Salsa(),
            new Salsa(),
            new Salsa(),
            new Salsa(),
            new Salsa(),
            new Salsa(),
        ]
    )
}

/**
 * Counts the collected bottles and retruns the count. Is used to determan the amount of bottles that the character can throw
 * 
 * @param {*} objects Salsa
 * @returns amount of collecte bottles
 */
function countSalsaObjects(objects) {
    let count = 0;
    for (const obj of objects) {
        if (obj instanceof Salsa) {
            count++;
        }
    }
    return count;
}

