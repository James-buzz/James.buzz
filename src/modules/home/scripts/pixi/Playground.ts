import Boid from "./sprite/Boid";
import Projectile from "./sprite/Projectile";

import p5Types from "p5";


/**
 * The playground contains all the sprites that are displayed on the canvas.
 * It is responsible for updating and drawing all sprites.
 * It also handles the interaction between the sprites.
 *
 *
 * @param {P5} P5 The P5.js instance.
 * @param {HTMLCanvasElement} canvasRef The canvas element.
 */
class Playground {
    static instance: Playground;
    static p5: p5Types;

    canvasWidth: number;
    canvasHeight: number;

    gameWidth: number;
    gameHeight: number;

    cameraWidth: number;
    cameraHeight: number;

    cameraX: number;
    cameraY: number;

    boids: Boid[];
    projectiles: Projectile[];

    /**
     * Creates a new playground.
     */
    constructor() {
        Playground.instance = this;

        // Size of the HTMLCanvas
        this.canvasWidth = 0;
        this.canvasHeight = 0;

        // Size of the game map
        this.gameWidth = 2000;
        this.gameHeight = 2000;

        // Size of the camera relative to the game map
        this.cameraWidth = 350;
        this.cameraHeight = 350;

        // Position of the camera relative to the game map
        this.cameraX = 0;
        this.cameraY = 0;

        this.boids = [];
        this.projectiles = [];
    }

    setup = (p5: p5Types, canvasRef: any) => {
        Playground.p5 = p5;

        // Sizes set in PixiComponent

        this.spawnBoids(p5);
    };

    draw = (p5: p5Types) => {
        p5.noSmooth();

        for (const prjt of this.projectiles) {
            prjt.update(p5);

            // Is the projectile in camera view
            if (prjt.position.x < this.cameraX) continue;
            if (prjt.position.y < this.cameraY) continue;
            if (prjt.position.x > this.cameraX + this.cameraWidth) continue;
            if (prjt.position.y > this.cameraY + this.cameraHeight) continue;

            /* Draw position of projectile */
            const renderX = prjt.position.x - this.cameraX;
            const renderY = prjt.position.y - this.cameraY;

            // Draw the projecitle
            p5.push();
            p5.scale(
                (this.canvasWidth) / this.cameraWidth,
                (this.canvasHeight) / this.cameraHeight
            );
            p5.translate(renderX, renderY);
            prjt.draw(p5);
            p5.pop();
        }

        for (const boid of this.boids) {
            /* Update boid */
            boid.update(p5);
            boid.flock(p5, this.boids);
            boid.edges(p5);

            /* Draw boid */
            const renderX = boid.position.x - this.cameraX;
            const renderY = boid.position.y - this.cameraY;

            // Is the sprite in camera view
            if (boid.position.x < this.cameraX) continue;
            if (boid.position.y < this.cameraY) continue;
            if (boid.position.x > this.cameraX + this.cameraWidth) continue;
            if (boid.position.y > this.cameraY + this.cameraHeight) continue;
            //
            p5.push();
            p5.scale(
                (this.canvasWidth) / this.cameraWidth,
                (this.canvasHeight) / this.cameraHeight
            );
            p5.translate(renderX, renderY);
            boid.draw(p5);
            p5.pop();
        }
    };

    mousePressed = (p5: p5Types) => {
        //
        const gameMouseX = (p5.mouseX / this.canvasWidth) * this.cameraWidth;
        const gameMouseY = (p5.mouseY / this.canvasHeight) * this.cameraHeight;

        const boid = new Boid(gameMouseX, gameMouseY, Math.floor(p5.random(1, 4)));
        boid.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
        this.boids.push(boid);
    };

    windowResize = (p5: p5Types) => {
        // Resize canvas with size
        this.canvasWidth = p5.width;
        this.canvasHeight = p5.height;
    };

    /**
     * Listens for key pressed event in P5.js
     *
     * @param {any} event keypressed event for P5.js
     */
    keyPressed = (event: any) => {
        this.cameraX += 10;
    };

    spawnBoids = (p5: p5Types) => {
        const locations = [
            {x: this.gameWidth / 2, y: 0},
            {x: this.gameWidth, y: this.gameHeight / 2},
            {x: this.gameWidth / 2, y: this.gameHeight},
            {x: 0, y: this.gameHeight / 2},
        ];
        for (let i = 0; i < locations.length; i++) {
            const location = locations[i];
            for (let j = 0; j < 5; j++) {
                const boid = new Boid(
                    location.x,
                    location.y,
                    Math.floor(p5.random(1, 4))
                );
                boid.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));

                let posX = boid.position.x;
                let posY = boid.position.y;
                switch (i) {
                    // top
                    case 0: {
                        posX += p5.random(-5, 5);
                        break;
                    }
                    // right
                    case 1: {
                        posY += p5.random(-5, 5);
                        break;
                    }
                    // bottom
                    case 2: {
                        posX += p5.random(-5, 5);
                        break;
                    }
                    // left
                    case 3: {
                        posY += p5.random(-5, 5);
                        break;
                    }
                }

                boid.position.x = posX;
                boid.position.y = posY;

                this.boids.push(boid);
            }
        }
    };
}

export default Playground;