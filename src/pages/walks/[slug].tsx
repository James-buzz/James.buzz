import type {NextPage} from 'next'
import Head from "next/head";
import Layout from "../../common/components/Layout/Layout";
import Container from "../../common/components/Container/Container";
import {getFileNames, getWalkBySlug} from "../../modules/walks/lib/walks";
import {serialize} from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import dynamic from "next/dynamic";
import classNames from "classnames";
import Moment from "react-moment";
import {Walk} from "../../modules/walks/types/Walk";
import {Suspense} from 'react'
import Markdown from "../../modules/walks/components/Markdown";

interface Props {
    walk: Walk
}

// @ts-ignore
const WalkPage: NextPage = (props: Props) => {
    return <>
        <Head>
            <title>{props.walk.meta.title} - Walk</title>
        </Head>
        <Layout>
            <Container className={"pt-4 sm:pt-16 sm:px-6 px-8 overflow-hidden"}>
                {/* Walk post */}
                <section id={'walk-post'} className={"mx-auto"} style={{maxWidth: '41rem'}}>
                    <h1 className={classNames(
                        "text-7xl text-center",
                        "font-bold font-serif text-gray-800",
                        "dark:text-cyan-500",
                        "mb-8"
                    )}>
                        {props.walk.meta.title}
                    </h1>
                    <div className={classNames(
                        "mt-8",
                        "text-center text-lg font-light"
                    )}>
                        <Moment parse={"DD/MM/YYYY"} format={"D MMM YYYY"}>{props.walk.meta.published}</Moment> ⋅ <span
                        className={"uppercase"}>{props.walk.meta.category}</span>
                    </div>
                    <div
                        className={classNames("mt-12",
                            "text-3xl font-light"
                    )}>
                        {props.walk.meta.abstract}
                    </div>
                </section>
                <iframe
                    src={props.walk.meta.mapURL}
                    className={classNames(
                        "w-full",
                        "mt-16"
                    )}
                    style={{
                        height: '600px'
                    }}
                ></iframe>
                <section className={"markdown mx-auto mt-12"} style={{maxWidth: '41rem'}}>
                    {props.walk.content ? (
                        <Markdown content={props.walk.content}/>
                    ) : (<>No content seen here</>)}
                </section>
            </Container>
        </Layout>
    </>;
}

export const getStaticPaths = async () => {
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

export const getStaticProps = async (context: { params: { slug: any; }; }) => {
    const {slug} = context.params;

    const walk = await getWalkBySlug(slug.toLowerCase());
    walk.content = await serialize(walk.content);

    return {
        props: {
            walk
        }
    }
}

export default WalkPage;

