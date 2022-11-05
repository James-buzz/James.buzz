type P5 = import("p5");
import { Vector } from "p5";
import Playground from "./Playground";

/**
 * A sprite is a graphical object that can be placed on the canvas.
 * It can be used to display an image, a shape, or text.
 * The sprite can be moved, rotated, and scaled.
 *
 * @param {P5} P5 The P5.js instance.
 */
abstract class Sprite {
    position: Vector;
    velocity: Vector;
    acceleration: Vector;

    /**
     * Creates a new sprite.
     * @param {number} x The x coordinate of the sprite.
     * @param {number} y The y coordinate of the sprite.
     */
    constructor(x: number, y: number) {
        this.position = Playground.p5.createVector(x, y);
        this.velocity = Playground.p5.createVector();
        this.acceleration = Playground.p5.createVector();
    }

    abstract onUpdate(p5: P5): void;
    abstract onDraw(p5: P5): void;

    draw = (p5: P5) => {
        this.onDraw(p5);
    };

    maxSpeed: number = 3;

    update = (p5: P5) => {
        this.onUpdate(p5);

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);

        this.acceleration.mult(0);
    };
}

export default Sprite;
