// import Footer from '@/components/Commons/Footer/Footer';
import Footer from '@/components/Commons/Footer/Footer';
import { GlobalContextProvider } from '@/context/GlobalContext';
import Head from 'next/head';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/globals.css'
import FixedButtons from '@/components/Commons/FixedButtons/FixedButtons';
import { useRouter } from 'next/router';
import { CartProvider } from '@/context/CartContext';
import UpdatedHeader from '@/components/Home/UpdatedHeader/UpdatedHeader';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Shah Parts</title>
                <link rel="icon" href="/assets/logo.png" type="image/png" />
            </Head>
            <GlobalContextProvider>
                <CartProvider>
                    <UpdatedHeader />
                    <FixedButtons />
                    <div className='min-h-[60vh]'>
                        <Component {...pageProps} />
                    </div>
                </CartProvider>
            </GlobalContextProvider>
            <Footer />
        </>
    )
}

export default MyApp;