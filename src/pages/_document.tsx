import {Html, Head, Main, NextScript} from 'next/document'

/**
 * NextJS document component.
 * A custom `document` to update `html` and `body` tags used to render the page
 * @constructor
 */
export default function Document() {
    return (
        <Html lang={'en'}>
            <Head>
                {/* Stylesheet imports */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}