import {MDXRemote} from "next-mdx-remote";
import Image from "next/image";

interface Props {
    content: any;
}

const Markdown = (props: Props) => {
    const components = {
        Image
    }
    return <MDXRemote {...props.content} components={components}/>
}
export default Markdown;
