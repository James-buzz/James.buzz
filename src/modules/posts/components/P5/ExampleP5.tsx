import Sketch from "react-p5";
import p5Types from "p5";

interface Props {
    width: number;
    height: number;
}

const ExampleP5 = ({width, height}: Props) => {
    const setup = (p5: p5Types, canvasRef: any) => {
        p5.createCanvas(width, height).parent(canvasRef);
    }
    const draw = (p5: p5Types) => {
        p5.background(255, 130, 20)
        p5.ellipse(100, 100, 100)
        p5.ellipse(300, 100, 100)
    }
    return <Sketch setup={setup} draw={draw}/>
}

export default ExampleP5;