// pages/Home.js
import Header from '@/components/Home/Header/Header';
import { Col, Input, Row } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from "../styles/home.module.css"
import featuredBadge from "../public/assets/sidebar-badge-1.png";
import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import axios from 'axios';
import { ProductCard } from '@/components/Commons/ProductCard/ProductCard';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { CarOutlined, DeliveredProcedureOutlined, DollarCircleOutlined, GlobalOutlined, PhoneFilled, SearchOutlined } from '@ant-design/icons';
import { useGlobalContext } from '@/context/GlobalContext';

const Home = () => {
  const router = useRouter();
  const { setFilterValuesFun } = useGlobalContext();
  const [featuredProductsArray, setFeaturedProductsArray] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);


  const getAllFeaturedProducts = async (e) => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/featured`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setFeaturedProductsArray(res.data);
      }
      else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
    })
  }

  const getAllBrands = async (e) => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/makes`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setBrands(res.data);
      }
      else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
    });
  }

  useEffect(() => {
    getAllFeaturedProducts();
    getAllBrands();

    return () => {

    }
  }, []);


  const featuredData = [
    {
      title: "Engine Parts",
      link: "Engine & Components",
      image: "https://storage.googleapis.com/shah-parts/categories/engine.jpg"
    },
    {
      title: "Transmissions & Suspension",
      link: "Suspension & Components",
      image: "https://storage.googleapis.com/shah-parts/categories/Suspension.jpg"
    },
    {
      title: "LIGHT SECTION",
      link: "Lightings",
      image: "https://storage.googleapis.com/shah-parts/categories/lighting.jpg"
    },
    {
      title: "Body Parts",
      link: "Body Parts",
      image: "https://storage.googleapis.com/shah-parts/categories/body%20parts.jpg"
    }
  ];

  const handleReferCategoryToShop = (part) => {
    if (part) {
      setFilterValuesFun("", "", part, "");
      const query = new URLSearchParams();
      if (part) query.append('Part', part);

      router.push(`/shop?${query.toString()}`);
    }
  };

  return (
    <div className={`${styles.Home} home`}>
      <main className="pb-8">
        <Header />
        <section className={styles.featuredParts}>
          <div className={styles.viewAllContainer}>
            <h1 className={`${styles.title} mainTitle`}>Featured auto parts categories</h1>
            <Link href="/categories">View All &gt;</Link>
          </div>
          <Row gutter={[40, 40]}>
            {
              featuredData?.map((data, index) => {
                return (
                  <Col xs={24} md={12} lg={8} xl={6} className='text-left cursor-pointer' onClick={() => handleReferCategoryToShop(data?.link)} key={index}>
                    <h3 className={styles.subTitle}>{data?.title}</h3>
                    <Image
                      style={{ width: "100%" }}
                      width={200}
                      height={200}
                      src={data?.image}
                      className={styles?.ftImage}
                      alt=""
                    />
                  </Col>
                )
              })
            }
          </Row>
        </section>
        <section className={styles.featuredProducts}>
          <div className='flex justify-between items-center mt-5'>
            <h1 className={`${`${styles.title} mainTitle`}`}>Featured Products</h1>
            <Image width={130} className="w-[60px] md:w-[130px]" src={featuredBadge} alt="Featured Banner" />
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: true,
            }}
            loop={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            {
              featuredProductsArray?.map((product, index) => {
                return (
                  <SwiperSlide className={styles.swiperSlide} key={index}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                )
              })
            }
          </Swiper>
        </section>
        <section className="mt-[60px]">
          <div className={styles.viewAllContainer}>
            <h1 className={`${styles.title} mainTitle`}>car auto parts by brands</h1>
            <Link href="/brands">View All &gt;</Link>
          </div>
          <div className={`${styles.brands} flex gap-10 flex-wrap`}>
            {
              brands?.map((brand, index) => {
                return (
                  <div className="border-2 border-[rgba(244,244,244,1)]" key={index}>
                    <Link key={index} href={`/shop?Make=${brand?.make?.toUpperCase()}`}>
                      <Image src={brand?.image} alt={brand?.make} width={200} height={200} style={{ height: "180px", objectFit: "contain" }} />
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </section>
        <section className="mt-4 md:mt-[60px]">
          <div className={styles.textContainer}>
            <h1 className={`${styles.title} mainTitle`}>Auto Parts you get</h1>
            <p>As Japan’s leading used automobile and auto parts exporter, SHAH PARTS provides an extensive selection of top-of-the-line used parts and accessories available for worldwide delivery. Our stock is sourced daily from a network of registered and professional representatives who review all auction markets throughout Japan, as well as private owners and car dealerships.</p>
            <p>We pride ourselves not only in providing quality Japanese automobiles and auto parts at prices you can afford, but also maintaining the highest level of Japanese customer service throughout the shopping process. Buy from us once and you will see why our number of loyal customers continues to grow.</p>
            <div className='my-0'>
              <Swiper
                className={styles.swiper}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: true,
                }}
                loop={true}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
              >
                <SwiperSlide className={styles.swiperSlide}>
                  <div className={styles.icon}>
                    <DeliveredProcedureOutlined />
                  </div>
                  <li>Access to over 400,000 genuine parts and accessories with new stock arriving every day.</li>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                  <div className={styles.icon}>
                    <SearchOutlined />
                  </div>
                  <li>Easy-to-use search results that show only the parts you need.</li>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                  <div className={styles.icon}>
                    <GlobalOutlined />
                  </div>
                  <li>Quick and efficient shipping direct from Japan.</li>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                  <div className={styles.icon}>
                    <PhoneFilled />
                  </div>
                  <li>Expert guidance in 30 languages.</li>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                  <div className={styles.icon}>
                    <DollarCircleOutlined />
                  </div>
                  <li>Quality parts at reasonable prices.</li>
                </SwiperSlide>
                <SwiperSlide className={styles.swiperSlide}>
                  <div className={styles.icon}>
                    <CarOutlined />
                  </div>
                  <li>Extensive listings by Japan’s top auto makers: Toyota, Nissan, Honda, Mazda, and more!</li>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
      </main>
      <Row gutter={[23, 23]} className={styles.emailListContainer}>
        <Col xs={24} md={12}>
          <Image src="/assets/car.jpg" width={100} height={100} />
        </Col>
        <Col xs={24} md={12} className={styles.inner}>
          <div>
            <h1 className={`${styles.title} mainTitle`}>Expert advice to your inbox</h1>
            <h3>Subscribe to our Emailing List for Updated Prices and Sales Alert on Auto Parts and Electronics</h3>
          </div>
          <form>
            <div>
              <label>Full Name</label>
              <Input required />
            </div>
            <div>
              <label>Email</label>
              <Input type='email' required />
            </div>
            <ButtonComp text="Submit" />
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
