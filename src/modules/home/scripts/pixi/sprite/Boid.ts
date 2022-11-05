import { Vector } from "p5";
import p5Types from "p5";
import Sprite from "../Sprite";
import Playground from "../Playground";

/**
 * A boid is a type of sprite that can be used to simulate a flock of birds.
 */
class Boid extends Sprite {
  team: number;

  radius: number = 6;

  maxSpeed: number = 2;
  maxForce: number = 0.05;

  initalTimer: number;

  history: Vector[];

  /**
   *
   * @param {number} x The x position of the boid
   * @param {number} y The y position of the boid
   * @param {number} team  The
   */
  constructor(x: number, y: number, team: number) {
    super(x, y);
    this.team = team;
    this.initalTimer = Date.now();

    this.history = [];
  }

  /**
   *
   * @param {P5} p5
   */
  onUpdate(p5: p5Types): void {}

  /**
   * Compute the flocking algorithm on the boid.
   *
   * @param {P5} p5
   * @param {Boid[]} flock
   */
  flock(p5: p5Types, flock: Boid[]) {
    const sep = this.separate(p5, flock); // Separation
    const ali = this.align(p5, flock); // Alignment
    const coh = this.cohesion(p5, flock); // Cohesion
    const avd = this.avoid(p5, flock); // Avoid

    // Arbitrarily weight these forces
    sep.mult(1);
    ali.mult(1);
    coh.mult(0);
    avd.mult(1);

    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
    this.applyForce(avd);
  }

  /**
   *
   * @param {P5} p5
   */
  onDraw(p5: p5Types): void {
    // Draw a triangle rotated in the direction of velocity
    const theta = this.velocity.heading() + p5.radians(90);

    // Colour scheme: https://coolors.co/palette/f72585-7209b7-3a0ca3-4361ee-4cc9f0

    /* Boid colour */
    const alpha = 200;
    let endClr = p5.color(255, 0, 255, alpha);
    switch (this.team) {
      case 1: {
        // rgb(236,72,153)
        endClr = p5.color(236, 72, 153, alpha);
        break;
      }
      case 2: {
        endClr = p5.color(72, 236, 165, alpha);
        break;
      }
      case 3: {
        endClr = p5.color(72, 159, 236, alpha);
        break;
      }
    }

    /** Trail */

    // TODO

    /** Triangle body */

    const middle = p5.createVector(
      Playground.instance.cameraX + Playground.instance.cameraWidth / 2,
      Playground.instance.cameraY + Playground.instance.cameraHeight / 2
    );
    const dist = Vector.dist(this.position, middle);
    let lerpClc = 200 / dist;
    if (lerpClc > 1) lerpClc = 1;

    const radius = this.radius;

    p5.push();
    p5.fill(endClr);
    p5.noStroke();
    p5.rotate(theta);
    p5.beginShape();
    p5.vertex(0, -radius * 2);
    p5.vertex(-radius, radius * 2);
    p5.vertex(radius, radius * 2);
    p5.endShape(p5.CLOSE);

    p5.pop();
  }

  /**
   * Compute the avoid other teams force for the boid.
   *
   * @param {P5} p5 The P5 instance
   * @param {Boid[]} flock The flock of boids
   * @return {Vector} The avoid other teams force
   */
  avoid(p5: p5Types, flock: Boid[]): Vector {
    const avoidRadius = 100;
    const steer = p5.createVector();
    let count = 0;

    for (const other of flock) {
      if (other == this) continue;

      const dist = Vector.dist(this.position, other.position);
      if (dist < 0 || dist > avoidRadius) continue;

      if (this.team === other.team) continue;

      const diff = Vector.sub(this.position, other.position);
      diff.normalize();
      diff.div(dist);
      steer.add(diff);
      count++;
    }

    if (count > 0) steer.div(count);
    if (steer.mag() <= 0) return steer;

    steer.normalize();
    steer.mult(this.maxSpeed);
    steer.sub(this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  /**
   * The force to separate the boid from other boids.
   *
   * @param {P5} p5  The P5 instance
   * @param {Boid[]} flock The flock of boids
   * @return {Vector} The separation force
   */
  separate(p5: p5Types, flock: Boid[]): Vector {
    const desiredSeparation = 25;
    const steer = p5.createVector();
    let count = 0;

    // Check every boid in the system and whether it's too close
    for (const other of flock) {
      if (other == this) continue;

      const dist = Vector.dist(this.position, other.position);
      if (dist < 0 || dist > desiredSeparation) continue;

      // Calculate vector pointing away from neighbour
      const diff = Vector.sub(this.position, other.position);
      diff.normalize();
      diff.div(dist);
      steer.add(diff);
      count++;
    }

    if (count > 0) steer.div(count);

    if (steer.mag() <= 0) return steer;

    steer.normalize();
    steer.mult(this.maxSpeed);
    steer.sub(this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  /**
   * The force to align the boid with other boids.
   *
   * @param {P5} p5 The P5 instance
   * @param {Boid[]} flock The flock of boids
   * @return {Vector} The alignment force
   */
  align(p5: p5Types, flock: Boid[]): Vector {
    const neighbourDist = 50;
    const sum = p5.createVector();
    let count = 0;

    for (const other of flock) {
      if (other == this) continue;

      const dist = Vector.dist(this.position, other.position);
      if (dist < 0 || dist > neighbourDist) continue;
      if (this.team !== other.team) continue;

      sum.add(other.velocity);
      count++;
    }

    if (count <= 0) return p5.createVector();

    sum.div(count);
    sum.normalize();
    sum.mult(this.maxSpeed);
    const steer = Vector.sub(sum, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  /**
   * The force to cohesion the boid with other boids.
   *
   * @param {P5} p5 The P5 instance
   * @param {Boid[]} flock The flock of boids
   * @return {Vector} The cohesion force
   */
  cohesion(p5: p5Types, flock: Boid[]): Vector {
    const neighbourDist = 30;
    const sum = p5.createVector();
    let count = 0;

    for (const other of flock) {
      if (other == this) continue;

      const dist = Vector.dist(this.position, other.position);
      if (dist < 0 || dist > neighbourDist) continue;
      if (this.team !== other.team) continue;

      sum.add(other.velocity);
      count++;
    }

    if (count <= 0) return p5.createVector();

    sum.div(count);

    return this.seek(p5, sum);
  }

  /**
   * The force to seek the target.
   *
   * @param {P5} p5 The P5 instance
   * @param {Vector} target The target position
   * @return {Vector} The force to seek the target
   */
  seek(p5: p5Types, target: Vector) {
    const desired = Vector.sub(target, this.position); // A vector pointing from the location to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxSpeed);

    // Steering = Desired minus Velocity
    const steer = Vector.sub(desired, this.velocity);

    // Limit to maximum steering force
    steer.limit(this.maxForce);

    return steer;
  }

  /**
   * Do not allow the boid to go outside the playground.
   *
   * @param {P5} p5 The P5 instance
   */
  edges(p5: p5Types): void {
    const gameW = Playground.instance.gameWidth;
    const gameH = Playground.instance.gameHeight;

    if (this.position.x < -this.radius) {
      this.position.x = gameW + this.radius;
    }
    if (this.position.y < -this.radius) {
      this.position.y = gameH + this.radius;
    }
    if (this.position.x > gameW + this.radius) {
      this.position.x = -this.radius;
    }
    if (this.position.y > gameH + this.radius) {
      this.position.y = -this.radius;
    }

    // const size = 15
    // if (this.position.x < size) this.position.x = size
    // if (this.position.x > P5.width - size) this.position.x = P5.width - size
    // if (this.position.y < size) this.position.y = size
    // if (this.position.y > P5.height - size) this.position.y = P5.height - size

    // if (this.position.x >= P5.width - size) this.velocity.rotate(180)
    // if (this.position.x <= size) this.velocity.rotate(180)

    // if (this.position.y >= P5.height - size) this.velocity.rotate(180)
    // if (this.position.y <= size) this.velocity.rotate(180)
  }

  /**
   * Apply force to the boid.
   * @param {Vector} force The force to apply
   */
  applyForce(force: Vector) {
    this.acceleration.add(force);
  }
}

export default Boid;
