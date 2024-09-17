import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import sliderImg1 from "../../../public/assets/imgpsh_fullsize-2.jpg"
import sliderImg2 from "../../../public/assets/warehouse.jpg"
import sliderImg3 from "../../../public/assets/1.jpg"
import sliderImg4 from "../../../public/assets/2.jpg"
import sliderImg5 from "../../../public/assets/3.jpg"
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
                navigation={false}
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
                        <Image 
                            src={sliderImg1}
                            alt="Engine Banner" 
                            width={1000} // Replace with the actual width of your image
                            height={100} // Replace with the actual height of your image
                            className={styles.image} 
                        />
                        <div className={styles.text}>👋 Welcome to SHAH PARTS</div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Link href="/">
                        <Image 
                            src={sliderImg2} // Update the path and name accordingly
                            alt="Engine Banner2" 
                            width={1000} // Replace with the actual width of your image
                            height={100} // Replace with the actual height of your image
                            className={styles.image} 
                        />
                        <div className={styles.text}>SHAH PARTS Warehouse</div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Link href="/">
                        <Image 
                            src={sliderImg3} // Update the path and name accordingly
                            alt="Engine Banner3" 
                            width={1000} // Replace with the actual width of your image
                            height={100} // Replace with the actual height of your image
                            className={styles.image} 
                        />
                        <div className={styles.text}>1. Personal/Commercial, Affordable Shipping Cost.</div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Link href="/">
                        <Image 
                            src={sliderImg4} // Update the path and name accordingly
                            alt="Engine Banner4" 
                            width={1000} // Replace with the actual width of your image
                            height={100} // Replace with the actual height of your image
                            className={styles.image} 
                        />
                        <div className={styles.text}>2. Port to Port Engine/Transmission Shipping.</div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                    <Link href="/">
                        <Image 
                            src={sliderImg5} // Update the path and name accordingly
                            alt="Engine Banner5" 
                            width={1000} // Replace with the actual width of your image
                            height={100} // Replace with the actual height of your image
                            className={styles.image} 
                        />
                        <div className={styles.text}>3. Customers Looking for Rare Japanese Engine/Transmissions, Always End Up At SHAHPARTS.</div>
                    </Link>
                </SwiperSlide>
                {/* Additional slides can be added here */}
            </Swiper>
        </header>
    );
};

export default Header;
