import React from 'react';
import { Menu, Dropdown } from 'antd';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';
import styles from "./DropDownMenu.module.css";

const DropDownMenu = ({ title, items }) => {
    return (
        <Dropdown
            arrow
            overlayClassName={styles.overlay}
            overlay={
                <Menu>
                    {items?.map((item, subIndex) => (
                        <Menu.Item key={subIndex}>
                            <Link href={item?.link}>{item.title}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            }
        >
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {title} <DownOutlined />
            </a>
        </Dropdown>
    );
};

export default DropDownMenu;
