import Layout from "../common/components/Layout/Layout";
import {GetStaticProps} from "next";
import dynamic from "next/dynamic";
import Jumbotron from "../modules/home/components/Jumbotron";
import Container from "../common/components/Container/Container";
import FeaturedCard from "../modules/home/components/FeaturedCard";
import {getRecentPosts} from "../modules/posts/lib/posts";
import {Post} from "../modules/posts/types/Post";
import Head from "next/head";
import FeaturedLinks from "../modules/home/components/FeaturedLinks";

/**
 * Homepage
 * - Jumbotron that summarises the about page
 * - List social media links
 * - List featured posts
 */
interface Props {
    recentPosts: Post[]
}
const Homepage = (props: Props) => {
    // Grab the PixiComponent as NextJS dynamic
    // Render the PixiComponent clientside rather than serverside
    const PixiComponent = dynamic(() => import('../modules/home/components/Pixi/PixiComponent'), {
        ssr: false
    });
    return (
        <>
            <Head>
                <title>Homepage</title>
            </Head>
            <Layout>
                {/* Background Boids Simulation (using Pixi.JS) */}
                <PixiComponent/>
                {/* Jumbotron */}
                <Jumbotron/>
                {/* Content */}
                <Container className={"pt-20 sm:px-6 px-8 mb-10"}>
                    {/* Social Media Links */}
                    <section className={"mt-10 mb-16"}>
                        <h2 className={"font-medium text-3xl font-sans"}>
                            Social links
                        </h2>
                        <div className={"grid grid-cols-12 gap-6 mt-4"}>
                            <FeaturedLinks/>
                        </div>
                    </section>
                    {/* Recent Posts */}
                    <section className={"mt-10"}>
                        <h2 className={"font-medium text-3xl font-sans"}>
                            Recent posts
                        </h2>
                        <div className={"grid grid-cols-12 gap-6 mt-4"}>
                            {props.recentPosts.map((recent, key) => (
                                <div className={"col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6"} key={key}>
                                    <FeaturedCard
                                        link={`/posts/${recent.slug}`}
                                        title={recent.meta.title}
                                        date={recent.meta.published}
                                        backgroundURL={`/assets/modules/posts/img/${recent.meta.thumbnail}`}
                                        backgroundBlurURL={`/assets/modules/posts/img/blur-${recent.meta.thumbnail}`}
                                        abstract={recent.meta.abstract}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Recent Walks: TODO */}
                    </section>
                </Container>
            </Layout>
        </>
    );
}

/**
 * NextJS will pre-render this page with featured blog posts from MDX files.
 * @param context NextJS context
 */
export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            recentPosts: getRecentPosts(),
        }
    }
}

export default Homepage;
