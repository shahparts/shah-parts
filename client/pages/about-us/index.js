import React from 'react';
import styles from "./about.module.css";

const AboutPage = () => {
    return (
        <div className={styles.aboutPage}>
            <header className={styles.header}>
                <h1>Welcome to Shah Parts</h1>
                <p>Your trusted source for high-quality vehicle parts imported from Japan.</p>
            </header>

            <section className={styles.section}>
                <h2>Who We Are</h2>
                <p>
                    At Shah Parts, we specialize in providing a comprehensive range of vehicle parts imported from Japan. Our journey began with a simple goal: to offer top-notch automotive components to enthusiasts and professionals alike. With years of experience in the industry, we've established ourselves as a leading supplier of Japanese vehicle parts, known for our commitment to quality and customer satisfaction.
                </p>
            </section>

            <section className={styles.section}>
                <h2>What We Offer</h2>
                <div className={styles.offers}>
                    <div className={styles.offerItem}>
                        <h3>Diverse Inventory</h3>
                        <p>Our extensive catalog includes a wide variety of vehicle parts for different makes and models. From engine components to exterior accessories, we have what you need to keep your vehicle running smoothly.</p>
                    </div>
                    <div className={styles.offerItem}>
                        <h3>Competitive Pricing</h3>
                        <p>We offer some of the best prices in the market by sourcing directly from trusted suppliers in Japan. Our goal is to provide you with high-quality parts at affordable prices.</p>
                    </div>
                    <div className={styles.offerItem}>
                        <h3>Genuine Parts</h3>
                        <p>All our parts are sourced from reputable manufacturers and are guaranteed to be authentic. We take pride in offering products that meet the highest standards of quality and reliability.</p>
                    </div>
                    <div className={styles.offerItem}>
                        <h3>Exceptional Service</h3>
                        <p>Our dedicated team is here to assist you with any inquiries and provide expert advice. Whether you need help finding the right part or have questions about installation, we're here to ensure a smooth and satisfying experience.</p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Our Values</h2>
                <div className={styles.values}>
                    <div className={styles.valueItem}>
                        <h3>Integrity</h3>
                        <p>We are committed to transparency and honesty in all our dealings. Our customers can trust that they are receiving accurate information and genuine products.</p>
                    </div>
                    <div className={styles.valueItem}>
                        <h3>Quality</h3>
                        <p>We prioritize the quality of our parts and strive to exceed industry standards. Each product is carefully vetted to ensure it meets our stringent quality requirements.</p>
                    </div>
                    <div className={styles.valueItem}>
                        <h3>Customer Focus</h3>
                        <p>Our customers are at the heart of everything we do. We listen to your needs and continuously seek ways to improve our services to provide an exceptional experience.</p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <h2>Why Choose Us</h2>
                <p>Choosing Shah Parts means choosing a partner who values quality, authenticity, and customer satisfaction. We are dedicated to providing you with the best parts and service, making us your go-to source for Japanese vehicle parts.</p>
            </section>

            <footer className={styles.footer}>
                <p>Thank you for visiting Shah Parts. We are excited to help you find the perfect parts for your vehicle and look forward to serving you in the future.</p>
            </footer>
        </div>
    );
}

export default AboutPage;
