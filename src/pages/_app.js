import MainLayout from "@layouts/MainLayout";
import NoLayout from "@layouts/NoLayout";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@style/app.scss';
import '@style/components/Menu.scss';

function MyApp({ Component, pageProps, router }) {
    const isAdmin = router.pathname.includes('admin')
    const Layout = isAdmin ? NoLayout : Component.Layout || MainLayout;
    return (
        <>
            <title>{ !isAdmin ? '畳サーバーホームページ' : '管理画面 for 畳サーバーホームページ' }</title>
            
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
