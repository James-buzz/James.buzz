import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

interface Props {
    children: React.ReactNode
}

const Layout = ({children}: Props) => {
    return (
        <div id={"wrapper"} className={"h-screen"}>
            <Head>
                {/* Meta Tags */}
                <meta charSet={"UTF-8"}/>
                <meta
                    name={"description"}
                    content={"James is a self-taught Software Developer and a full-time Electrical Engineer. I blog about my projects and share tips about my latest hikes."}/>
                <meta name={"keywords"} content={'software, full-stack, '}/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <Header />
            <main className={"min-h-screen mb-auto"}>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout;