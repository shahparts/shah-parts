import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import sliderImg1 from "../../../public/assets/imgpsh_fullsize-2.png"
import sliderImg2 from "../../../public/assets/warehouse.jpg"
// import whatsApp from "../../../public/assets/whatsapp123.jpg"
import stripesBanner from "../../../public/assets/Stripes-Banner.jpg"
import Image from 'next/image';
import { Col, Row } from 'antd';
import Link from 'next/link';
import styles from "./Header.module.css";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const Header = () => {
    return (
        <header className={styles.Header}>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                }}
                loop={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                pagination={{
                    clickable: true,
                }}
                className={styles.swiper}
                modules={[Pagination, Navigation, Autoplay]}
            >
                <SwiperSlide className={styles.swiperSlide}>
                    <Link href="/">
                        <Image src={sliderImg1} alt="Engine Banner" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Link href="/">
                        <Image src={sliderImg2} alt="Engine Banner2" />
                    </Link>
                </SwiperSlide>
                {/* <SwiperSlide>
                    <Link href="/">
                        <Image src={sliderImg1} alt="Engine Banner" />
                    </Link>
                </SwiperSlide> */}
            </Swiper>
            {/* <Col xs={24} md={8}>
                    <Link href="https://shahparts.com/product-category/brand/toyota">
                        <Image className='h-[110px] object-cover' src={whatsApp} alt="WhatsApp Banner" />
                    </Link>
                    <div className='mt-8'>
                        <Link href="https://shahparts.com/product/african-soldier-stripes-toyota-vitz-jask3435/">
                            <Image src={stripesBanner} alt="Stripes Banner" />
                        </Link>
                    </div>
                </Col> */}
        </header>
    );
};

export default Header;
