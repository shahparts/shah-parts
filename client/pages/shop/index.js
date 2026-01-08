import { ErrorAlert } from '@/components/Commons/Messages/Messages';
import { Col, Pagination, Row, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import styles from './shop.module.css';
import Loading from '@/components/Commons/Loading/Loading';
import { ProductCard } from '@/components/Commons/ProductCard/ProductCard';
import { useRouter } from 'next/router';
import FiltersBar from '@/components/Commons/FiltersBar/FiltersBar';

const ShopPage = () => {
  const router = useRouter();

  const [productsArray, setProductsArray] = useState([]);
  const [sortValue, setSortValue] = useState("createdAt");
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [current, setCurrent] = useState(1);

  // Local filter state from URL
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    part: '',
    partAccessory: ''
  });

  const searchQuery = useMemo(() => {
    return router.query.searchQuery || '';
  }, [router.query.searchQuery]);

  const hasSearchQuery = searchQuery.trim().length > 0;

  const getAllData = async () => {
    setLoading(true);

    console.log(filters);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get`, {
        page: current - 1,
        pageSize: "20",
        Make: filters.make,
        Model: filters.model,
        Part: filters.part,
        PartAccessorries: filters.partAccessory,
        sortBy: sortValue
      });

      setLoading(false);
      if (res.status === 200) {
        setProductsArray(res.data?.products || []);
        setTotalCount(res.data.count || 0);
      } else {
        ErrorAlert(res.data.errorMessage);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const getSearchResults = async () => {
    setLoading(true);
    try {
      // First, get all matching product IDs from search
      const searchRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/search`,
        { q: searchQuery, perPage: 100 } // Get a large number to get all matches
      );

      if (searchRes.status === 200) {
        const ids = searchRes.data.results.map(item => item.id);
        
        if (ids.length > 0) {
          // Then fetch products by IDs with pagination and sorting
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/by-ids`, {
            ids,
            page: current - 1,
            pageSize: "20"
          });

          setLoading(false);
          if (res.status === 200) {
            setProductsArray(res.data?.products || []);
            setTotalCount(res.data.count || 0);
          } else {
            ErrorAlert(res.data.errorMessage);
          }
        } else {
          setLoading(false);
          setProductsArray([]);
          setTotalCount(0);
        }
      } else {
        setLoading(false);
        ErrorAlert(searchRes.data.errorMessage);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      setProductsArray([]);
      setTotalCount(0);
    }
  };

  // Fetch data when filters, pagination, or sort changes
  useEffect(() => {
    // if (router.isReady) {
    if (hasSearchQuery) {
      getSearchResults();
    } else {
      getAllData();
    }
    // }
  }, [filters, current, sortValue, hasSearchQuery, searchQuery]);

  // Reset to page 1 when filters or sort changes
  useEffect(() => {
    if (router.isReady) {
      setCurrent(1);
    }
  }, [filters.make, filters.model, filters.part, filters.partAccessory, sortValue, hasSearchQuery, searchQuery]);

  const handleSortChange = (value) => {
    setSortValue(value);
  };

  // Handle search from FiltersBar
  const handleSearch = (filterValues) => {
    // if (filterValues?.make) {
    router.query && router.push("/shop");
    // setTimeout(() => {
    setFilters({
      make: filterValues.make,
      model: filterValues.model,
      part: filterValues.part,
      partAccessory: filterValues.partAccessory
    });
    // }, 1000);
    // }
  };

  return (
    <div className={styles.ShopPage}>
      <div className={styles.sortSection}>
        <div className='flex items-center gap-6'>
          <h4 className='mb-0'>Products</h4>
          <p className='w-full'>{productsArray?.length} of {totalCount} items</p>
        </div>
        <div className={styles.right}>
          <h4 className='mb-0'>Sort By:</h4>
          <Select
            className={styles.sortSelect}
            value={sortValue}
            onChange={handleSortChange}
            placeholder="Sort"
            options={[
              { value: "lth", label: "Price: Low to High" },
              { value: "htl", label: "Price: High to Low" },
              { value: "a-z", label: "Product Name: A-Z" },
              { value: "z-a", label: "Product Name: Z-A" },
              { value: "createdAt", label: "Released Date" },
            ]}
          />
        </div>
      </div>
      <div className='mt-4'>
        <Row gutter={[23, 23]} className="p-4">
          <Col xs={24} md={6}>
            <div>
              <FiltersBar
                initialMake={filters.make}
                initialModel={filters.model}
                initialPart={filters.part}
                initialAccessory={filters.partAccessory}
                onSearch={handleSearch}
              />
            </div>
          </Col>
          <Col xs={24} md={18}>
            {
              loading ?
                <Loading />
                :
                <Row gutter={[23, 23]}>
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
          </Col>
        </Row>
      </div>
      <div className='flex justify-center my-10'>
        <Pagination
          current={current}
          defaultPageSize={20}
          showSizeChanger={false}
          onChange={(page) => setCurrent(page)}
          total={totalCount}
        />
      </div>
    </div>
  )
}

export default ShopPage;