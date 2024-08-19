import { FacebookFilled, InstagramFilled, MailFilled, TwitterSquareFilled } from '@ant-design/icons';
import { Divider } from 'antd';
import Link from 'next/link';
import React from 'react';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import styles from "./TopMenu.module.css";

const TopMenu = () => {
    // const menuItems = [
    //     {
    //         title: 'Help',
    //         items: [
    //             {
    //                 title: 'How To Buy',
    //                 link: 'https://shahparts.com/how-to-buy/',
    //             },
    //             {
    //                 title: 'Shipping Policy',
    //                 link: 'https://shahparts.com/shipping-policy/',
    //             },
    //             {
    //                 title: 'Payment Policy',
    //                 link: 'https://shahparts.com/payment-policy/',
    //             },
    //             {
    //                 title: 'Privacy Policies',
    //                 link: 'https://shahparts.com/privacy-policies/',
    //             },
    //         ],
    //     },
    //     {
    //         title: 'Company',
    //         items: [
    //             {
    //                 title: 'About Us',
    //                 link: 'https://shahparts.com/about-us/',
    //             },
    //             {
    //                 title: 'Terms and Conditions',
    //                 link: 'https://shahparts.com/terms-and-conditions/',
    //             },
    //             {
    //                 title: 'Blog',
    //                 link: 'https://shahparts.com/blog/',
    //             },
    //             {
    //                 title: 'Shop',
    //                 link: 'https://shahparts.com/shop/',
    //             },
    //             {
    //                 title: 'My account',
    //                 link: 'https://shahparts.com/my-account/',
    //             },
    //         ],
    //     },
    //     {
    //         title: 'Contact Us',
    //         link: 'https://shahparts.com/contact-us/',
    //     },
    // ];

    // const socialIcons = [
    //     {
    //         title: 'Facebook',
    //         link: 'https://www.facebook.com/shahpart/',
    //         icon: <FacebookFilled />,
    //     },
    //     {
    //         title: 'Instagram',
    //         link: 'https://www.instagram.com/learn.drift/',
    //         icon: <InstagramFilled />,
    //     },
    //     {
    //         title: 'Twitter',
    //         link: 'https://twitter.com/shahpartsdotcom',
    //         icon: <TwitterSquareFilled />,
    //     },
    //     {
    //         title: 'Email',
    //         link: 'mailto:askar3481@gmail.com',
    //         icon: <MailFilled />,
    //     },
    // ];

    return (
        <nav className={styles.TopMenu}>
            <div>Fastest Growing Online Seller for Genuine Auto Parts of Your Branded Cars - Original & Affordable</div>
            {/* <ul className="flex space-x-4">
                {menuItems.map((menuItem, index) => (
                    <li key={index} className="relative">
                        {menuItem.items ? (
                            <DropDownMenu title={menuItem?.title} items={menuItem?.items} />
                        ) : (
                            <>
                                <Divider type='vertical' />
                                <Link href={menuItem.link} className="">
                                    {menuItem.title}
                                </Link>
                            </>
                        )}
                    </li>
                ))}
                <li className="flex items-center space-x-2">
                    {socialIcons?.map((social, index) => (
                        <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="">
                            {social?.icon}
                        </a>
                    ))}
                </li>
            </ul> */}
        </nav>
    );
};

export default TopMenu;
