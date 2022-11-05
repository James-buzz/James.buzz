import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Layout from "../../common/components/Layout/Layout";
import Container from "../../common/components/Container/Container";
import Head from "next/head";
import {Post} from "../../modules/posts/types/Post";
import {getFileNames, getPostBySlug} from "../../modules/posts/lib/posts";
import classNames from "classnames";
import Moment from "react-moment";
import {serialize} from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import dynamic from "next/dynamic";
import Markdown from "../../modules/posts/components/Markdown";

interface Props {
    post: Post
}

// @ts-ignore
const PostPage: NextPage = ({post}: Props) => {
    return <>
        <Head>
            <title>{post.meta.title}</title>
        </Head>
        <Layout>
            <Container className={"pt-4 sm:pt-16 sm:px-6 px-8 overflow-hidden"}>
                <section className={"mx-auto"} id={"post"} style={{maxWidth: '41rem'}}>
                    <h1 className={classNames(
                        'text-7xl text-center',
                        'font-bold font-serif text-pink-500 hover:text-pink-600',
                        'dark:hover:text-cyan-500 dark:text-cyan-400',
                        "mb-8"
                    )}>
                        {post.meta.title}
                    </h1>
                    <div className={classNames(
                        "mt-8",
                        "text-center text-lg font-light"
                    )}>
                        <Moment parse={"DD/MM/YYYY"} format={"D MMM YYYY"}>{post.meta.published}</Moment> ⋅ <span
                        className={"uppercase"}>{post.meta.category}</span>
                    </div>
                    <div className={classNames(
                        "mt-12",
                        "text-3xl font-light"
                    )}>
                        {post.meta.abstract}
                    </div>
                    <div
                        className={classNames(
                            'mt-12',
                            'markdown'
                        )}>
                        {post.content ? (
                            <Markdown content={post.content}/>
                        ) : (<>No content seen here</>)}
                    </div>
                </section>
            </Container>
        </Layout>
    </>;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const fileNames = getFileNames();

    const paths = fileNames.map(fileName => ({
        params: {
            slug: fileName.replace('.mdx', '')
        }
    }))

    return {
        paths,
        fallback: false
    }
}

// @ts-ignore
export const getStaticProps: GetStaticProps = async (context: { params: { slug: any; }; }) => {
    const {slug} = context.params;

    const post = await getPostBySlug(slug.toLowerCase());
    post.content = await serialize(post.content, {
        mdxOptions: {rehypePlugins: [rehypeHighlight]}
    });

    return {
        props: {
            post
        }
    }
}

export default PostPage;

