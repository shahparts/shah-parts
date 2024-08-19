import { SearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import React from 'react';
import styles from "./SearchForm.module.css";
const { Option } = Select;

const SearchForm = () => {
    return (
        <form method="get" className={styles.SearchForm}>
            {/* <div>
                <Select popupClassName={styles.dropdown} className={styles.select} defaultValue="">
                    <Option value="" selected>All</Option>
                    <Option value="parts">Parts</Option>
                    <Option value="uncategorized">Uncategorized</Option>
                </Select>
            </div> */}
            <Input className={styles.input} placeholder="Search Products" suffix={<SearchOutlined />} />
        </form>
    );
};

export default SearchForm;
