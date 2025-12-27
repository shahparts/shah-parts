import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { Col, Pagination, Row, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './shop.module.css';
import Loading from '@/components/Commons/Loading/Loading';
import { ProductCard } from '@/components/Commons/ProductCard/ProductCard';
import { useGlobalContext } from '@/context/GlobalContext';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

const ShopPage = () => {
  const hasRun = useRef(false);
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

  const router = useRouter();
  const ids = useMemo(() => {
    return router.query.ids ? router.query.ids.split(',') : [];
  }, [router.query.ids]);



  const getAllData = async () => {
    setLoading(true);
    await axios.post(`http://localhost:8000/api/products/get`, { page: current - 1, pageSize: "20", Make: make, Model: model, Part: part, PartAccessorries: partAccessorries, sortBy: sortValue }).then(res => {
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

  const getSelectedData = async () => {
    setLoading(true);
    await axios.post(`http://localhost:8000/api/products/by-ids`, { ids }).then(res => {
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
  if (ids.length > 0) {
    getSelectedData();
  } else {
    getAllData();
  }
}, [ids.length, make, model, part, partAccessorries, current, sortValue]);


  const handleSortChange = (value) => {
    setSortValue(value);
  };

  useEffect(() => {
  if (!part || hasRun.current) return;
  if (make || model || partAccessorries) return;

  if (productsArray.length > 0) {
    const first = productsArray[0];
    setFilterValuesFun(
      first.Make,
      first.Model,
      part,
      "",
      "NoRefresh"
    );
    hasRun.current = true;
  }
}, [productsArray, part, make, model, partAccessorries]);



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