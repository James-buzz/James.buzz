import type {NextPage} from 'next'
import Head from "next/head";
import Layout from "../../common/components/Layout/Layout";
import Container from "../../common/components/Container/Container";
import {GetStaticProps} from "next";
import {getAllWalks} from "../../modules/walks/lib/walks";
import {Walk} from "../../modules/walks/types/Walk";
import classNames from "classnames";
import Link from "next/link";
import Moment from "react-moment";

interface Props {
    walks: Walk[];
}
// @ts-ignore
const WalksPage: NextPage = (props: Props) => {
    return <>
        <Head>
            <title>Walks</title>
        </Head>
        <Layout>
            <Container className={"pt-4 sm:pt-16 sm:px-6 px-8"}>
                <h1 className={classNames(
                    'text-center text-gray-700',
                    'text-8xl font-medium font-serif',
                    'dark:text-gray-100',
                )}>
                    Walks
                </h1>
                <section className={"mx-auto mt-24"} id={"posts"} style={{maxWidth: '41rem'}}>
                    {props.walks && props.walks.map((walk: any, key: number) => (
                        <article className={"mb-20"} key={key}>
                            <Link href={"/walks/" + walk.slug}>
                                <div className={classNames(
                                    'text-4xl cursor-pointer font-normal font-serif tracking-wide',
                                    'hover:text-pink-600 text-pink-500',
                                    'dark:hover:text-cyan-600 dark:text-cyan-500'
                                )}>
                                    {walk.meta.title}
                                </div>
                            </Link>
                            <div className={classNames(
                                'mt-2',
                                'flex gap-1 items-center',
                                'text-lg text-gray-500 font-sans',
                                'dark:text-gray-300'
                            )}>
                                <div className={"tracking-wide"}>
                                    <Moment parse={"DD/MM/YYYY"} format={"D MMM YYYY"}>{walk.meta.published}</Moment>
                                </div>
                                <div>⋅</div>
                                <div className={"uppercase tracking-wider font-serif"}>
                                    {walk.meta.category}
                                </div>
                            </div>
                            <div className={"mt-2 font-sans font-light text-2xl text-gray-600 dark:text-gray-200"}>
                                {walk.meta.abstract}
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
            walks: getAllWalks()
        }
    }
}

export default WalksPage;

