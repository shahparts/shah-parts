import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { Col, Pagination, Row, Select } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from './shop.module.css';
import Loading from '@/components/Commons/Loading/Loading';
import { ProductCard } from '@/components/Commons/ProductCard/ProductCard';
import { useGlobalContext } from '@/context/GlobalContext';
import { debounce } from 'lodash'; 

const ShopPage = () => {
  const router = useRouter();
  const {
    setFilterValuesFun,
    make,
    model,
    part,
    partAccessorries,
    updateData
  } = useGlobalContext();
  const [productsArray, setProductsArray] = useState([]);
  const [sortValue, setSortValue] = useState("createdAt");
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState();
  const [current, setCurrent] = useState(1);

  const getAllData = async () => {
    setLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get`, { page: current - 1, pageSize: "20", Make: make, Model: model, Part: part, PartAccessorries: partAccessorries, sortBy: sortValue }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        setProductsArray(res.data?.products);
        setTotalCount(res.data.count);
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
    const debouncedGetAllData = debounce(() => getAllData(), 700);
    debouncedGetAllData();

    return () => {
      debouncedGetAllData.cancel();
    };
  }, [updateData, current, sortValue]);


  const handleSortChange = (value) => {
    setSortValue(value);
  };

  useEffect(() => {
    const updateGlobalState = () => {
      if (productsArray?.length > 0) {
        let firstProduct = productsArray[0];
        if (router?.query?.Part && (!router?.query?.Model && !router?.query?.Make && !router?.query?.partAccessory)) {
          console.log("called with");
          setFilterValuesFun(firstProduct?.Make, firstProduct?.Model, router?.query?.Part, "", "NoRefresh")
        }
      }
    }
    const debouncedUpdateGlobalState = debounce(() => updateGlobalState(), 1000);
    debouncedUpdateGlobalState();

    return () => {
      debouncedUpdateGlobalState.cancel();
    };
  }, [productsArray]);


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