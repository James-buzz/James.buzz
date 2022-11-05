import React from "react";
import Sketch from "react-p5";

import p5Types from "p5";
import Playground from "../../scripts/pixi/Playground";

/**
 * Encapsulate the p5 component in react to use as a NextJS component.
 * @constructor
 */
const PixiComponent = () => {
    const playground = new Playground();

    const setup = (p5: p5Types, canvasRef: any) => {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;

        const cvn = p5.createCanvas(width, height).parent(canvasRef);
        cvn.id("background-canvas");

        playground.canvasWidth = width;
        playground.canvasHeight = height;

        playground.cameraWidth = width / 3;
        playground.cameraHeight = height / 2;

        // playground.cameraWidth = playground.gameWidth;
        // playground.cameraHeight = playground.gameHeight;

        playground.setup(p5, canvasRef);
    };
    const draw = (p5: p5Types) => {
        // @ts-ignore
        p5.drawingContext.clearRect(0, 0, p5.width, p5.height);
        playground.draw(p5);
    };
    const windowResize = (p5: p5Types) => {
        playground.windowResize(p5);
    };
    const mousePressed = (p5: p5Types) => {
        playground.mousePressed(p5);
    };
    return (
        <Sketch
            mousePressed={mousePressed}
            windowResized={windowResize}
            setup={setup}
            draw={draw}
        />
    );
};

export default PixiComponent;
