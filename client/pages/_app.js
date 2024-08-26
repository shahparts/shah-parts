// import Footer from '@/components/Commons/Footer/Footer';
import Footer from '@/components/Commons/Footer/Footer';
import Navbar from '@/components/Commons/Navbar/Navbar';
import SearchBar from '@/components/Commons/SearchBar/SearchBar';
import TopMenu from '@/components/Commons/TopMenu/TopMenu';
import logo from '../public/assets/logo.png';
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
                <link href="../public/assets/logo.png"></link>
            </Head>
            <GlobalContextProvider>
                <CartProvider>
                    <UpdatedHeader />
                    <FixedButtons />
                    {/* <TopMenu />
                    <Navbar />
                    {
                        router.pathname !== "/shop" &&
                        <SearchBar />
                    } */}
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