import '../common/styles/global.scss';
import type {AppProps} from 'next/app'
import {ThemeProvider} from 'next-themes';
import '../common/styles/highlight/github-dark.min.css';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ThemeProvider defaultTheme={'dark'} enableSystem={true} attribute={"class"}>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp;
