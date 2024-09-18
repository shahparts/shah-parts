import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { Col, Rate, Row, Tabs } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from './product.module.css';
import { ButtonComp } from '@/components/Commons/ButtonComp/ButtonComp';
import { useCartContext } from '@/context/CartContext';
import ReviewsAndRatings from '@/components/ReviewsAndRatings/ReviewsAndRatings';
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { RelatedProductCard } from '@/components/Commons/RelatedProductCard/RelatedProductCard';
import Loading from '@/components/Commons/Loading/Loading';
import Head from 'next/head';
import { generateSeoData } from '@/components/Seo/SeoData';


const ProductPage = () => {
    const router = useRouter();
    let productId = router.query?.id;
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [qtyToShop, setQtyToShop] = useState(1);
    const [averageRating, setAverageRating] = useState(0);
    const { addToCart } = useCartContext();

    const onChange = (key) => {
        console.log(key);
    };


    const handleAddToCart = async () => {
        product.qtyToShop = qtyToShop;

        await addToCart(product);
        router.push("/checkout")
    }

    const getProduct = async (id) => {
        setLoading(true);
        await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/product/${id}`).then((res) => {
            setLoading(false);
            if (res.status === 200) {
                setProduct(res.data);
                getRelatedProducts(res.data);
                setAverageRating(res.data?.Reviews?.reduce((acc, review) => acc + review?.rating, 0) / res.data?.Reviews?.length);
            }
            else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err)
        })
    }

    const getRelatedProducts = async (prd) => {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/related`, {
            Make: prd?.Make,
            Model: prd?.Model,
            Part: prd?.Part
        }).then(async (res) => {
            if (res.status === 200) {
                setRelatedProducts(res.data?.filter(f => f?._id !== productId));
            }
            else {
                ErrorAlert(res.data.errorMessage);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        console.log('Product ID:', productId);
        if (router.isReady && productId) {
            getProduct(productId);
        }
    }, [router.isReady, productId]);



    const ProductDescription = () => {
        // Function to filter out specific keys
        const filterObject = (obj, keysToExclude) => {
            return Object.keys(obj)
                .filter(key => !keysToExclude.includes(key))
                .reduce((acc, key) => {
                    acc[key] = obj[key];
                    return acc;
                }, {});
        };

        // Keys to exclude
        const keysToExclude = ["_id", "createdAt", "updatedAt", "Pictures", "__v", "Featured", "Title", "Description", "Price", "CategoryImage", "BrandImage", "Reviews"];

        // Use the function
        const filteredData = filterObject(product, keysToExclude);

        const putSpaceInKeys = (k) => {
            return k?.replace(/([A-Z])/g, ' $1').trim()
        }

        return (
            <div className={styles.descriptionItemContainer}>
                <div>
                    {/* <h1 className='mb-4 text-[36px] font-bold'>Product Specifications</h1> */}
                    <ul className={styles.descriptionItems}>
                        {Object.entries(filteredData).map(([key, value]) => (
                            <li key={key}>
                                <strong>{putSpaceInKeys(key)}:</strong> <span>{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }


    const items = [
        {
            key: '1',
            label: 'Specifications',
            children: <ProductDescription />,
        },
        {
            key: '2',
            label: 'Reviews',
            children: <ReviewsAndRatings product={product} updateParent={() => getProduct(productId)} reviews={product?.Reviews} />,
        }
    ];

    function roundRating(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }
    console.log(generateSeoData(product));

    const seoGenerated = generateSeoData(product);

    return (
        loading ?
            <Loading />
            :
            product &&
            <>
                {
                    seoGenerated &&
                    <Head>
                        <title>{generateSeoData(product)?.title}</title>
                        {generateSeoData(product)?.metaTags?.map((tag, index) => (
                            <meta key={index} {...tag} />
                        ))}
                    </Head>
                }
                <div className={styles.product}>
                    <div>
                        <Row gutter={[80, 23]} className="mb-[100px]" align="middle">
                            <Col xs={24} md={12} lg={12}>
                                <Carousel className={styles.Carousel} showArrows={true} autoPlay showIndicators={false} renderThumbs={() => {
                                    return (
                                        product?.Pictures?.map((picture, index) => {
                                            return (
                                                <div key={index} className={styles.thumbContainer}>
                                                    <Image width={300} height={300} src={picture} />
                                                    <p className='text-white'>wejdfjqhd</p>
                                                </div>
                                            )
                                        })
                                    )
                                }}>
                                    {
                                        product?.Pictures?.map((picture, index) => {
                                            return (
                                                <div key={index}>
                                                    <Image width={300} height={300} alt="Carouse Picture" src={picture} />
                                                    <p className='text-white'>wejdfjqhd</p>
                                                </div>
                                            )
                                        })
                                    }
                                </Carousel>
                            </Col>
                            <Col xs={24} md={12} lg={12} className={styles.right}>
                                <div className='p-[0px] md:p-0 md:ml-3'>
                                    <h3>
                                        {product?.PartAccessorries}
                                    </h3>
                                    <h1>
                                        {product?.Title}
                                    </h1>
                                    <div className='flex items-center gap-2 my-4'>
                                        <Rate disabled allowHalf value={averageRating} /><b>{averageRating ? roundRating(averageRating, 1) : null}</b> <b>({product?.Reviews?.length})</b>
                                    </div>
                                    <h5>
                                        ${product?.Price}
                                    </h5>
                                    <div className='mt-4 flex gap-4 flex-wrap items-center'>
                                        <div className={styles.qtyContainer}>
                                            <MinusOutlined onClick={() => qtyToShop > 1 && setQtyToShop(prev => prev - 1)} />
                                            <div>{qtyToShop}</div>
                                            <PlusOutlined onClick={() => setQtyToShop(prev => prev + 1)} />
                                            {/* <InputNumber className='py-[12px]' min={1} max={100000} defaultValue={1} onChange={(value) => setQtyToShop(value)} /> */}
                                        </div>
                                        <div className='flex-1'>
                                            <ButtonComp text={<div className='flex items-center justify-center gap-4'><ShoppingCartOutlined /> Add to cart</div>} loading={loading} disabled={loading} onClick={handleAddToCart} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={[80, 23]}>
                            <Col xs={24} md={16} className={styles.specicificationsContainer}>
                                <Tabs rootClassName={styles.productTabs} centered defaultActiveKey="1" items={items} onChange={onChange} />
                            </Col>
                            <Col xs={24} md={8}>
                                <div className={styles.relatedProducts}>
                                    <h1>Similar Items</h1>
                                    <div className='flex flex-col gap-3'>
                                        {
                                            relatedProducts?.slice(0, 4)?.map((product, index) => {
                                                return (
                                                    <RelatedProductCard key={index} product={product} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </>
    )
}

export default ProductPage;
