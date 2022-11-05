import type {NextPage} from 'next'
import Layout from "../common/components/Layout/Layout";
import Container from "../common/components/Container/Container";
import About from "../modules/about/components/About";
import Head from "next/head";

/**
 * About James page.
 * Includes:-
 * 1. Summary
 * 2. Work
 * 3. Hobbies
 * 4. Social Media Accounts
 */
const AboutPage: NextPage = () => {
    return <>
        {/* Browser metadata */}
        <Head>
            <title>About me</title>
        </Head>
        {/* Content  */}
        <Layout>
            <Container className={"pt-12 sm:pt-16"}>
                <About />
            </Container>
        </Layout>
    </>;
}

export default AboutPage;

