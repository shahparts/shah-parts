import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { Col, Pagination, Row, Select } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from './shop.module.css';
import Loading from '@/components/Commons/Loading/Loading';
import { ProductCard } from '@/components/Commons/ProductCard/ProductCard';
import { useGlobalContext } from '@/context/GlobalContext';

const ShopPage = () => {
  const router = useRouter();
  const { setFilterValuesFun } = useGlobalContext();
  const [productsArray, setProductsArray] = useState([]);
  const [sortValue, setSortValue] = useState("createdAt");
  const [parts, setParts] = useState([]);
  const [makes, setMakes] = useState([]);
  const [make, setMake] = useState(router.query.Make);
  const [part, setPart] = useState(router.query.Part);
  const [model, setModel] = useState(router.query.Model);
  const [partAccessory, setPartAccessory] = useState(router.query.PartAccessory);
  const [priceRange, setPriceRange] = useState();
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [current, setCurrent] = useState(1);

  const getAllData = async () => {
    setLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get`, { page: current - 1, pageSize: "20", priceRange, Make: make, Model: model, Part: part, PartAccessorries: partAccessory, sortBy: sortValue }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        setProductsArray(res.data?.products);
        setTotalCount(res.data.count);
        let firstProduct = res.data.products[0];
        // if (router?.query?.Make) {
        //   setFilterValuesFun(router?.query?.Make);
        // }
        // if (router?.query?.Model) {
        //   setFilterValuesFun(router?.query?.Make, router?.query?.Model);
        // }
        if (!router?.query?.Model && router?.query?.Part) {
          setFilterValuesFun(firstProduct?.Make, firstProduct?.Model, router?.query?.Part)
        } else {
          setFilterValuesFun(router?.query?.Make, router?.query?.Model, router?.query?.Part, router?.query?.partAccessory);
        }
      }
      else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
    });
  }

  const getAllParts = async () => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/parts`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setParts(res.data?.map(f => ({ value: f?.part, label: f?.part })));
      }
      else {
        ErrorAlert(res.data.errorMessage);
      }
    }).catch(err => {
      setLoading(false);
      console.log(err)
    });
  }

  const getAllMakes = async () => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/makes`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setMakes(res.data?.map(f => ({ value: f?.make, label: f?.make })));
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
    getAllParts();
    getAllMakes();
    setMake(router.query?.Make)
    setModel(router.query?.Model)
    setPart(router.query?.Part)
    setPartAccessory(router.query?.PartAccessory)

    // if (router.query?.Make) {
    //   setMake(router.query?.Make)
    // }
    // if (router.query?.Model) {
    //   setModel(router.query?.Model)
    // }
    // if (router.query?.Part) {
    //   setPart(router.query?.Part)
    // }
    // if (router.query?.PartAccessory) {
    //   setPartAccessory(router.query?.PartAccessory)
    // }

    return () => {

    }
  }, [router.asPath]);

  useEffect(() => {
    getAllData();
    // console.log("Shop page", make, model, part, partAccessory)

    return () => {

    }
  }, [current, make, model, partAccessory, part, priceRange, sortValue]);


  const handleSortChange = (value) => {
    setSortValue(value);
  };

  console.log(router.query);

  return (
    <div className={styles.ShopPage}>
      <div className={styles.sortSection}>
        <div className='flex items-center gap-6'>
          <h4 className='mb-0'>Products</h4>
          <p className='w-full'>{productsArray?.length} of {totalCount} items</p>
        </div>
        <div className={styles.right}>
          <h4 className='mb-0'>Sort By:</h4>
          <Select className={styles.sortSelect} defaultValue={"createdAt"} onChange={handleSortChange} placeholder="Sort" options={[
            { value: "lth", label: "Price: Low to High" },
            { value: "htl", label: "Price: High to Low" },
            { value: "a-z", label: "Product Name: A-Z" },
            { value: "z-a", label: "Product Name: Z-A" },
            { value: "createdAt", label: "Released Date" },
          ]} />
        </div>
      </div>
      <div className='mt-4'>
        {
          loading ?
            <Loading />
            :
            <Row gutter={[23, 23]} className="p-4">
              {
                productsArray?.map((product, index) => {
                  return (
                    <Col xs={12} md={8} lg={6} key={index}>
                      <ProductCard product={product} />
                    </Col>
                  )
                })
              }
            </Row>
        }
      </div>
      <div className='flex justify-center my-10'>
        <Pagination current={current} defaultPageSize={20} showSizeChanger={false} onChange={(page) => setCurrent(page)} total={totalCount} />
      </div>
    </div >
  )
}

export default ShopPage;