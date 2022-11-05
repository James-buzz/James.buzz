import p5Types from "p5";
import Boid from "./Boid";
import Sprite from "../Sprite";

/**
 * A projectile is a type of sprite that can be used to shoot circles/bullets.
 */
class Projectile extends Sprite {
  boid: Boid;

  /**
   *
   * @param {number} x The x coordinate of the projectile.
   * @param {number} y The y coordinate of the projectile.
   * @param {Boid} boid target
   */
  constructor(x: number, y: number, boid: Boid) {
    super(x, y);
    this.boid = boid;
  }

  /**
   * Updates the projectile.
   *
   * @param {P5} p5
   */
  onUpdate(p5: p5Types): void {}

  /**
   *  Draws the projectile.
   * @param {P5} p5
   */
  onDraw(p5: p5Types): void {
    p5.push();
    p5.noFill();
    p5.strokeWeight(0.5);
    p5.stroke(this.boid.team);
    p5.circle(0, 0, 2);
    p5.pop();
  }
}

export default Projectile;
