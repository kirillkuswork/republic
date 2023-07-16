import App from 'next/app';
import { NextPageWithLayout } from './page';

import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '../store/reduxStore';
import { MINIMUM_SUPPORTED_BROWSERS } from '../constants/minimum-supported-browsers';

import '../styles/globals.scss';
import Wrapper from '../wrapper';

//@ts-ignore
import UAParser from 'ua-parser-js';
import Script from 'next/script';

interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout;
}

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
    const { store, props } = wrapper.useWrappedStore(rest);

    const getLayout = Component.getLayout || ((page) => page);

    return (
        <Provider store={store}>
            <Script src='/YandexMetrikaScript.js' />
            <Script
                src='https://app.comagic.ru/static/cs.min.js?k=6cfa8yWQ94R9pQ2oGE8eLPGloudodG8k'
                strategy='beforeInteractive'
                onLoad={() => {
                    console.log('Скрипт CoMagicScript загружен');
                }}
            />
            <Script
                src='/GTMScript.js'
                strategy='beforeInteractive'
                onLoad={() => {
                    console.log('Скрипт GTMScript загружен');
                }}
            />
            <Script src='/CoMagicScript.js' />
            {getLayout(
                <Wrapper>
                    <Component {...props.pageProps} />
                </Wrapper>,
            )}
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N2G48GR"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                }}
            ></noscript>
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<div><img src="https://mc.yandex.ru/watch/88450177" style="position:absolute; left:-9999px;" alt="" /></div>`,
                }}
            ></noscript>
        </Provider>
    );
}

MyApp.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps & { userAgent: string }> => {
    const appProps = await App.getInitialProps(appContext);

    const userAgent = appContext.ctx.req?.headers['user-agent'] || '';

    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser();

    const currentBrowserVersion = parseFloat(browser.version);
    //@ts-ignore
    const minimumSupportedVersion = MINIMUM_SUPPORTED_BROWSERS[browser.name];

    if (appContext.ctx.req && appContext.ctx.res && minimumSupportedVersion && currentBrowserVersion < minimumSupportedVersion) {
        appContext.ctx.res.writeHead(302, { Location: '/unsupported/unsupported.html' });
        appContext.ctx.res.end();
        return { ...appProps, userAgent, pageProps: {} };
    }

    if (appContext.ctx.req && appContext.ctx.res && browser.name === 'IE') {
        appContext.ctx.res.writeHead(302, { Location: '/unsupported/unsupported.html' });
        appContext.ctx.res.end();
        return { ...appProps, userAgent, pageProps: {} };
    }

    return { ...appProps, userAgent };
};

export default MyApp;
