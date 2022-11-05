import type {NextPage} from 'next'
import Head from "next/head";
import Layout from "../../common/components/Layout/Layout";
import Container from "../../common/components/Container/Container";
import classNames from "classnames";

const PrivacyPolicyPage: NextPage = () => {
    return <>
        <Head>
            <title>Privacy Policy</title>
        </Head>
        <Layout>
            <Container className={"mt-16"}>
                {/* Heading */}
                <h1 className={classNames(
                    "text-center font-serif text-gray-700 text-8xl",
                    "dark:text-gray-100"
                )}>
                    Privacy Policy
                </h1>
                {/* Policy */}
                <section className={"mx-auto mt-24"} style={{maxWidth: '41rem'}}>
                    <div className={"text-xl tracking-wide leading-9"}>
                        This website collects no personal information. It does not employ any cookies or tracking
                        scripts from third parties. During your visit, no user analytics or other metrics are handled,
                        and the server writes no log files, thus your IP address is not saved anywhere.
                    </div>
                    <div className={"text-xl tracking-wide leading-9"}>
                    </div>
                </section>
            </Container>
        </Layout>
    </>;
}

export default PrivacyPolicyPage;

