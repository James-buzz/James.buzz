import Boid from "./sprite/Boid";

type P5 = import("p5");

/**
 * The playground class contains all the sprites that are displayed on the canvas.
 * It acts as the game environment simulator.
 *
 */

class Simulator {
    separation: boolean;
    alignment: boolean;
    cohesion: boolean;

    count: number;
    controls: boolean;
    colours: boolean;
    boids: Boid[];

    constructor(pGame: P5, separation: boolean, alignment: boolean, cohesion: boolean, count: number, controls: boolean, colours: boolean) {
        this.separation = separation;
        this.alignment = alignment;
        this.cohesion = cohesion;
        this.count = count;
        this.controls = controls;
        this.colours = colours;

        this.boids = [];
        this.spawnBoids(pGame);
    }


    spawnBoids = (pGame: P5) => {
        for (let i = 0; i < this.count; i++) {
            let clr = pGame.color(250, 0, 230, 250);
            if (this.colours) {
                const randoms = [
                    [250, 0, 230],
                    [0, 200, 250]
                ];
                const random = randoms[Math.floor(Math.random() * randoms.length)];
                clr = pGame.color(random[0], random[1], random[2], 250);
            }
            const boid = new Boid(pGame, 50, 50, 5, clr);
            boid.velocity = pGame.createVector(pGame.random(-1, 1), pGame.random(-1, 1));
            this.boids.push(boid);
        }
    }

    draw = (p5: P5) => {
        p5.noSmooth();
        for (const boid of this.boids) {
            p5.push();
            p5.translate(boid.position.x, boid.position.y)
            boid.draw(p5);
            p5.pop();
        }
    }

    update = (p5: P5) => {
        for (const boid of this.boids) {
            boid.update(p5);
            boid.flock(p5, this.boids, this.separation, this.alignment, this.cohesion);
        }
    }


}

export default Simulator;