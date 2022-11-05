type P5 = import("p5");
import { Vector } from "p5";

/**
 * A sprite is a graphical object that can be placed on the canvas.
 * It can be used to display an image, a shape, or text.
 * The sprite can be moved, rotated, and scaled.
 *
 * @param {P5} P5 The P5.js instance.
 */
abstract class Sprite {

    position: Vector; // Position of the sprite
    velocity: Vector; // Directional speed of the sprite in motion as an indication of its rate of change in position
    acceleration: Vector; // Rate of change of velocity of an object with respect to time

    /**
     * Creates a new sprite.
     * @param p5
     * @param {number} x The x coordinate of the sprite.
     * @param {number} y The y coordinate of the sprite.
     */
    constructor(p5: P5, x: number, y: number) {
        this.position = p5.createVector(x, y); // New position with parameters supplied
        this.velocity = p5.createVector();
        this.acceleration = p5.createVector();
    }

    abstract onUpdate(p5: P5): void;
    abstract onDraw(p5: P5): void;

    draw = (p5: P5) => {
        // Draw the sprite to the canvas with P5.js
        this.onDraw(p5);
    };

    maxSpeed: number = 3;

    update = (p5: P5) => {
        this.onUpdate(p5);

        // Set the velocity of the sprite with the rate of change / acceleration
        this.velocity.add(this.acceleration);
        // Limit the velocity / moving speed of the sprite with the max speed of the sprite
        // Set to 3 for this example
        this.velocity.limit(this.maxSpeed);
        // Add the velocity to the position of the sprite
        this.position.add(this.velocity);

        // Remove the acceleration of the sprite as it's been set to the velocity already
        this.acceleration.mult(0);
    };
}

export default Sprite;
