import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { Col, Row } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from './categories.module.css';
import Loading from '@/components/Commons/Loading/Loading';
import Image from 'next/image';
import { useGlobalContext } from '@/context/GlobalContext';


const CategoriesPage = () => {
  const router = useRouter();
  const { setFilterValuesFun } = useGlobalContext();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCategories = async () => {
    setLoading(true);
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/parts`).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        setCategories(res.data);
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
    getAllCategories();
    return () => {

    }
  }, []);


  const handleRoute = (part) => {
    if (part) {
      setFilterValuesFun("", "", part, "");
      const query = new URLSearchParams();
      if (part) query.append('Part', part);

      router.push(`/shop?${query.toString()}`);
    }
  };

  return (
    <div className={styles.CategoriesPage}>
      <h1 className={`${styles.title} mainTitle`}>All Categories</h1>
      {
        loading ?
          <Loading />
          :
          <Row justify="center" gutter={[23, 15]} className="gap-4">
            {
              categories?.length > 0 ?
                categories?.map((category, index) => {
                  return (
                    category?.image !== "FALSE" &&
                    <Col xs={11} md={6} lg={4} xl={4} xxl={4} key={index} className={styles.category}>
                      <button className="border-2 h-[200px] p-0 text-center border-[rgba(244,244,244,1)]" onClick={() => handleRoute(category?.part)} key={index}>
                        <Image src={category?.image} width={200} height={200} alt={category?.part} />
                        <span className='mt-1 text-[18px] font-[600] text-center'>{category?.part}</span>
                      </button>
                    </Col>
                  )
                })
                :
                <Col xs={24} className="text-center">
                  <h3 className='text-[36px] font-bold'>No Categories Found!</h3>
                </Col>
            }
          </Row>
      }
    </div>
  )
}

export default CategoriesPage;