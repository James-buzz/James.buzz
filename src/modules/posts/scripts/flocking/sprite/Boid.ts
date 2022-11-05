import p5Types, {Vector} from "p5";

type P5 = import("p5");
import Sprite from "../Sprite";

class Boid extends Sprite {

    radius: number = 6;
    maxForce: number = 0.05;
    clr: any;

    constructor(pGame: P5, x: number, y: number, radius: number, clr: any) {
        super(pGame, x, y);
        this.radius = radius;
        this.clr = clr;
    }

    /**
     * Draw the Boid (Triangle)
     *
     * @param p5
     */
    onDraw(p5: P5): void {
        p5.noSmooth(); // Ensure no smoothing for aesthetics

        // Get the Angle of the velocity of the travelling Boid
        const theta = this.velocity.heading() + p5.radians(90);

        // Draw the triangle in direction of velocity
        p5.push();
        p5.fill(this.clr);
        p5.noStroke();
        p5.rotate(theta);
        p5.beginShape();
        p5.vertex(0, -this.radius * 2);
        p5.vertex(-this.radius, this.radius * 2);
        p5.vertex(this.radius, this.radius * 2);
        p5.endShape(p5.CLOSE);

        p5.pop();
    }

    onUpdate(p5: P5): void {
        // Cannot escape canvas
        if (this.position.x < -this.radius) this.position.x = p5.width + this.radius;
        if (this.position.y < -this.radius) this.position.y = p5.height + this.radius;
        if (this.position.x > p5.width + this.radius) this.position.x = -this.radius;
        if (this.position.y > p5.height + this.radius) this.position.y = -this.radius;
    }

    flock(p5: P5, flock: Boid[], separation: boolean, alignment: boolean, cohesion: boolean) {
        const sep = this.separate(p5, flock); // Separation
        const ali = this.align(p5, flock); // Alignment
        const coh = this.cohesion(p5, flock); // Cohesion

        // Arbitrarily weight these forces
        sep.mult(separation ? 1 : 0);
        ali.mult(alignment ? 1 : 0);
        coh.mult(cohesion ? 0.5 : 0);

        // Add the force vectors to acceleration
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
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
     * Apply force to the boid.
     * @param {Vector} force The force to apply
     */
    applyForce(force: Vector) {
        this.acceleration.add(force);
    }

}

export default Boid;