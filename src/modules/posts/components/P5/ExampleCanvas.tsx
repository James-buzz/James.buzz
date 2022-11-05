import {useEffect, useRef} from "react";


const ExampleCanvas = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        // @ts-ignore
        const context = canvas.getContext('2d');
        context.imageSmoothingEnabled = false;

        context.canvasWidth = context.canvas.offsetWidth;

        let frameCount = 0;
        let animationFrameId: number;
        const balls: Ball[] = [];

        for (let i = 0; i < 15; i++) {
            balls.push(new Ball(Math.random() * context.canvas.width, 3 * (Math.random() * context.canvas.height) / 4 + (Math.random() * context.canvas.height) / 4, 10));
        }

        const drawCanvas = (ctx: any, frameCount: number) => {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fill();
            for (const ball of balls) {
                ball.draw(ctx, frameCount);
                ball.update(ctx, frameCount);
            }
        }

        const render = () => {
            // Resize canvas
            frameCount++;
            drawCanvas(context, frameCount);
            animationFrameId = window.requestAnimationFrame(render)
        }

        render();

        // @ts-ignore
        document.getElementById("example-canvas").onclick = evt => {
            for (const ball of balls) {
                ball.x = Math.random() * context.canvas.width
                ball.y = 3 * (Math.random() * context.canvas.height) / 4 + (Math.random() * context.canvas.height) / 4
            }
        }

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, []);
    return <div>
        <canvas
            id={"example-canvas"}
            className={"mx-auto shadow w-full"}
            width="650px"
            height={"250px"}
            ref={canvasRef}
        ></canvas>
    </div>
}

class Ball {
    x: number;
    y: number;
    vX: number;
    vY: number;
    gravity: number = 0.003;
    radius: number;
    colour: string;


    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vX = 0;
        this.vY = Math.random() * 3;
        this.colour = 'hsl(' + 360 * Math.random() + ', 60%, 60%)';
    }

    draw = (ctx: any, frameCount: number) => {
        ctx.fillStyle = this.colour;

        // Circle shape
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true)
        ctx.closePath();
        ctx.fill();
        ctx.strokeWidth = 0.5;
        ctx.stroke();
        ctx.restore();
    }

    update = (ctx: any, frameCount: number) => {
        // Update by gravity
        this.vY += this.gravity;

        // Update position by velocity
        this.x += this.vX;
        this.y += this.vY;

        // Handle bouncing
        if (this.y > ctx.canvas.height - this.radius) {
            this.y = ctx.canvas.height - this.radius;
            this.vY *= -0.8;
        }
        if (this.x > ctx.canvas.width + this.radius) {
            this.x = -this.radius;
        }
        // Bounce off top and bottom walls
        if (this.x + this.vX > ctx.canvas.width || this.x + this.vX < 0) {
            this.vX = -this.vX;
        }
        if (this.y + this.vY > ctx.canvas.height || this.y + this.vY < 0) {
            this.vY = -this.vY;
        }
        // Bounce off left and right walls
        if (this.x + this.vX > ctx.canvas.width - this.radius || this.x + this.vX < this.radius) {
            this.vX = -this.vX;
        }
        if (this.y + this.vY > ctx.canvas.height - this.radius || this.y + this.vY < this.radius) {
            this.vY = -this.vY;
        }
    }
}

export default ExampleCanvas;