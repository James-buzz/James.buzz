import {MDXRemote} from "next-mdx-remote";
import dynamic from "next/dynamic";
import CodeBlock from "./Code/CodeBlock";

interface Props {
    content: any;
}

const PostMarkdown = ({content}: Props) => {
    return <MDXRemote {...content} components={components}/>
}

// Client-side computed components
const SimulatorComponent = dynamic(() => import('./Flocking/SimulatorComponent'), {
    ssr: false
})
const ExampleCanvas = dynamic(() => import('./P5/ExampleCanvas'), {
    ssr: false
})
const ExampleP5 = dynamic(() => import('./P5/ExampleP5'), {
    ssr: false
})

// Components to include in MDX markdown
const components = {
    SimulatorComponent,
    ExampleCanvas,
    ExampleP5,
    CodeBlock
};

export default PostMarkdown;