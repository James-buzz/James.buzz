import '../common/styles/global.scss';
import type {AppProps} from 'next/app'
import {ThemeProvider} from 'next-themes';
import '../common/styles/highlight/github-dark.min.css';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Bind NProgress javascript library to NextJS loading event
Router.events.on('routeChangeStart', () => {
    NProgress.start();
})
Router.events.on('routeChangeComplete', () => {
    NProgress.done();
})
Router.events.on('routeChangeError', () => {
    NProgress.done();
})

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider defaultTheme={'dark'} enableSystem={true} attribute={"class"}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp;
