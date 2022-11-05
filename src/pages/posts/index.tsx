import type {GetStaticProps, NextPage} from 'next'
import Layout from "../../common/components/Layout/Layout";
import Container from "../../common/components/Container/Container";
import Head from "next/head";
import {Post} from "../../modules/posts/types/Post";
import {getAllPosts} from "../../modules/posts/lib/posts";
import classNames from "classnames";
import Moment from "react-moment";
import Link from "next/link";

interface Props {
    posts: Post[];
}
// @ts-ignore
const PostsPage: NextPage = ({posts}: Props) => {
    return <>
        <Head>
            <title>Posts</title>
        </Head>
        <Layout>
            <Container className={"pt-4 sm:pt-16 sm:px-6 px-8"}>
                <h1 className={classNames(
                    'text-center text-gray-700',
                    'text-8xl font-medium font-serif',
                    'dark:text-gray-100',
                )}>
                    Posts
                </h1>
                <section className={"mx-auto mt-24"} id={"posts"} style={{maxWidth: '41rem'}}>
                    {posts && posts.map((post: any, key: number) => (
                        <article className={"mb-20"} key={key}>
                            <Link href={"/posts/" + post.slug}>
                                <div className={classNames(
                                    'text-4xl cursor-pointer font-normal font-serif tracking-wide',
                                    'hover:text-pink-600 text-pink-500',
                                    'dark:hover:text-cyan-600 dark:text-cyan-500'
                                )}>
                                    {post.meta.title}
                                </div>
                            </Link>
                            <div className={classNames(
                                'mt-2',
                                'flex gap-1 items-center',
                                'text-lg text-gray-500 font-sans',
                                'dark:text-gray-300'
                            )}>
                                <div className={"tracking-wide"}>
                                    <Moment parse={"DD/MM/YYYY"} format={"D MMM YYYY"}>{post.meta.published}</Moment>
                                </div>
                                <div>⋅</div>
                                <div className={"uppercase tracking-wider font-serif"}>
                                    {post.meta.category}
                                </div>
                            </div>
                            <div className={"mt-2 font-sans font-light text-2xl text-gray-600 dark:text-gray-200"}>
                                {post.meta.abstract}
                            </div>
                        </article>
                    ))}
                </section>
            </Container>
        </Layout>
    </>;
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            posts: getAllPosts()
        }
    }
}

export default PostsPage;

