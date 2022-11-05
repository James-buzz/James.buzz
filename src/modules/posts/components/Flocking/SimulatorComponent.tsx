import p5Types from "p5";
import Sketch from "react-p5";
import classNames from "classnames";
import Simulator from "../../scripts/flocking/Simulator";

interface Props {
    separation: boolean;
    alignment: boolean;
    cohesion: boolean;
    count: number;
    controls: boolean;
    colours?: boolean;
}

const FlockingComponent = (props: Props) => {
    let simulator: Simulator;

    const setup = (p5: p5Types, canvasRef: any) => {
        simulator = new Simulator(p5, props.separation, props.alignment, props.cohesion, props.count, props.controls, !!props.colours);

        // @ts-ignore
        const width = document.getElementById('Flocking').offsetWidth;

        const cvn = p5.createCanvas(width, 350).parent(canvasRef);
        cvn.id("simulator");
    };
    const draw = (p5: p5Types) => {
        // @ts-ignore
        p5.drawingContext.clearRect(0, 0, p5.width, p5.height);

        simulator.draw(p5);
        simulator.update(p5);
    };

    return (
        <div id={"Flocking"} className={classNames(
            "w-full mb-16",
            "shadow"
        )}>
            <Sketch
                setup={setup}
                draw={draw}
            />
        </div>
    );
};

export default FlockingComponent;
