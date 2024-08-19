import { useCartContext } from '@/context/CartContext';
import { useGlobalContext } from '@/context/GlobalContext';
import { LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Link from 'next/link';
import React from 'react';
import { logout } from '../Auth/Auth';
import Logo from '../Logo/Logo';
import SearchContainer from '../SearchContainer/SearchContainer';
import styles from './Navbar.module.css';
import SearchForm from './SearchForm/SearchForm';

const Navbar = () => {
    const { userAuth } = useGlobalContext();
    const { cart } = useCartContext();


    return (
        <div className={styles.Navbar}>
            <div className={styles.left}>
                <div className={styles.logo}>
                    <Logo />
                </div>
            </div>
            <div className="flex items-center gap-10">
                <Link href="/">
                    Home
                </Link>
                <Link href="/about">
                    About
                </Link>
                <Link href="/contact">
                    Contact
                </Link>
            </div>
            <div className={styles.right}>
                <SearchForm />
                {
                    userAuth?.role === 1 &&
                    <Link href="/admin/products">
                        Dashboard
                    </Link>
                }
                <SearchContainer />
                <Link href="/cart" className="flex gap-2 items-center">
                    <Badge count={cart?.length}>
                        <ShoppingCartOutlined className='text-[23px]' />
                    </Badge>
                </Link>
                <Link href={userAuth ? "/user/profile" : "/login"} className={styles.accountBtn}>
                    <UserOutlined className='text-[23px]' />
                </Link>
                {
                    userAuth &&
                    <a href="/" onClick={logout}>
                        <LogoutOutlined className='text-[23px]' />
                    </a>
                }
            </div>
        </div>
    )
}

export default Navbar
