import React from 'react';
import styles from "./terms.module.css";

const TermsAndConditionsPage = () => {
    return (
        <div className={styles.termsPage}>
            <header className={styles.header}>
                <h1>Terms and Conditions</h1>
            </header>

            <section className={styles.section}>
                <h2>Introduction</h2>
                <p>
                    Welcome to Shah Parts! These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please do not use our website.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Use of the Website</h2>
                <p>
                    You are granted a limited, non-exclusive, non-transferable license to access and use our website for personal, non-commercial use. You agree not to use our website for any unlawful or prohibited purpose. You may not reproduce, distribute, or otherwise exploit any part of our website without prior written consent.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Product Information</h2>
                <p>
                    We make every effort to provide accurate and up-to-date information about the products listed on our website. However, we do not warrant that the product descriptions or other content on our website are accurate, complete, or current. We reserve the right to make changes to our product offerings and pricing without prior notice.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Ordering and Payment</h2>
                <p>
                    When placing an order, you agree to provide accurate and complete information. All orders are subject to availability and acceptance. Payment must be made in full before your order is processed. We accept various payment methods, which will be displayed at checkout.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Shipping and Delivery</h2>
                <p>
                    We strive to process and ship orders as quickly as possible. Shipping times may vary depending on your location and the availability of the products. We are not responsible for any delays caused by third-party shipping carriers or other external factors.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Returns and Refunds</h2>
                <p>
                    If you are not satisfied with your purchase, please contact us to request a return or exchange. Returns and refunds are subject to our return policy, which can be found on our website. All returned items must be in their original condition and packaging.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by law, Shah Parts shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services. Our liability for any claim arising out of or in connection with our website or services shall be limited to the amount you paid for the relevant product or service.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Changes to Terms</h2>
                <p>
                    We reserve the right to update or modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our website after any changes constitutes your acceptance of the revised terms.
                </p>
            </section>

            <footer className={styles.footer}>
                <p>If you have any questions about these Terms and Conditions, please contact us at info@shahparts.com</p>
            </footer>
        </div>
    );
}

export default TermsAndConditionsPage;
