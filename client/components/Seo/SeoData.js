"use client";

import { faker } from '@faker-js/faker';

// Array of SEO titles and descriptions
const seoTitles = [
    "$post_title$ || Contact us For Suspension, Engine, Body parts for Used Recycled JDM Japanese vehicles cars.",
    "$post_title$ || Contact us For Suspension, Engine, Body parts for Used Recycled Auto Japanese vehicles cars.",
    "$post_title$ || Contact us For Suspension, Engine, Body parts for Used Discounted JDM Japanese vehicles cars.",
    "$post_title$ || Contact us For Suspension, Engine, Body parts for Used Recycled OEM Japanese vehicles cars.",
    "$post_title$ || Contact us For Suspension, Engine, Body parts for Used Genuine JDM Japanese vehicles cars.",
    "$post_title$ || Contact us For Suspension, Engine, Body parts for Used import JDM Japanese vehicles cars.",
    "$post_title$ || Contact us For Suspension, Engine, Body parts for Used Salvage JDM Japanese vehicles cars.",
    "$post_title$ || Contact us For Suspension, Engine, Body parts for Second hand JDM Japanese vehicles cars.",
    "$post_title$ || Contact us For Suspension, Engine, Body parts for Used Recycled JDM Japanese vehicles cars.",
    "$post_title$ || Contact us For Suspension, Engine, Body  Spare parts for Recycled JDM Japanese vehicles cars."
];

const seoDescriptions = [
    "Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com for Suspension Parts, Transmission Parts, Engine Parts, Body parts for used Japanese cars. Please check our Affordable Japanese used car parts catalogue.",
    "Number of variations of $post_title$ are available with us. Most of the parts in catalogue are OEM used parts sourced from Used Japanese cars. Suspension Parts, Transmission Parts, Engine Parts, Body parts for used Japanese cars widely available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Multiple variations of $post_title$ are available with us. We already are catering to hundreds of our regular customers by providing quality USED JDM car parts. Suspension Parts, Transmission Parts, Engine Parts, Body parts for used Japanese cars widely available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Few variations of $post_title$ are available with us. We source our parts directly from Japanese car dismantlers, Japanese car salvage companies. We cut the middle man cost to provide cheapest possible second hand parts for Japanese cars. Suspension Parts, Transmission Parts, Engine Parts, Body parts for used Japanese cars widely available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Feature variations of $post_title$ are available with us. We source our parts directly from Japanese car Wrecker companies. We cut the middle man cost to provide cheapest possible second hand parts for Japanese cars. Suspension Parts, Transmission Parts, Engine Parts, Body parts for used Japanese cars widely available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Some variations of $post_title$ are available with us. We source our parts directly from Japanese car Wrecker companies. We cut the middle man cost to provide cheapest possible second hand parts for Japanese cars. Used transmissions for Japanese cars widely available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Model variations of $post_title$ are available with us. We source our parts directly from Japanese car Wrecker companies. We cut the middle man cost to provide cheapest possible second hand parts for Japanese cars. Used auto parts from Japan are widely available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Select variations of $post_title$ are available with us. We already are catering to hundreds of our regular customers by providing quality USED JDM car parts. Reconditioned Japanese car parts Suspension Parts, Transmission Parts, Engine Parts, Body parts for used Japanese cars widely available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "SHAH PARTS is Authentic Japanese car parts store, with hundreds of regular customers worldwide. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "SHAH PARTS is Home to Thousands of Replacement parts for Japanese cars. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com. Variations of $post_title$ are available with us. Custom Japanese car accessories widely available in our store, beside used parts for Japanese cars.",
    "Used suspension parts for Japanese vehicles or Reconditioned Japanese car parts, SHOP WITH US. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Used JDM parts or Discounted Japanese car components SHOP WITH US. Variations of $post_title$ are available with us.",
    "Japanese used car parts, Used auto parts from Japan widely available. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650.",
    "Order Japanese used car parts or Buy Japanese car salvage parts, SHOP WITH US. Variations of $post_title$ are available with us. Email: info@shahparts.com",
    "Either Second-hand parts for Japanese cars or Affordable Japanese used car parts SHAH PARTS is answer. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Quality used parts for Japanese vehicles, Genuine Japanese car spare parts widely available. $post_title$ Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "$post_title$ for sale now. We resource Recycled Japanese car parts from Japanese car wreckers to make our parts cost effective compared to market rate. Contact us via Whats-App (preferred) +818050821650",
    "Get Best deals on JDM parts by buying direct from Japan car parts. Variations of $post_title$",
    "Used JDM parts, Discounted Japanese car components are available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com. Variations of $post_title$ are available with us.",
    "OEM used parts for Japanese cars & Used engine parts for Japanese vehicles widely available. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "$post_title$ Contact us via Whats-App (preferred) +818050821650. Used transmissions for Japanese cars directly bought from Japanese car dismantlers. Email us info@shahparts.com",
    "Reconditioned Japanese car parts or Used body parts for Japanese cars at excellent rates. Variations of $post_title$ are available with us.",
    "Selection of $post_title$ are available with us. Used suspension parts for Japanese vehicles bought from approved Japanese car salvage yards. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Import tuner parts from Japan, or Discounted Japanese car accessories, widely available in our Store. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "SHAH PARTS is Authentic Japanese car parts store, with hundreds of regular customers worldwide. For Used Suspension Parts, Used Axle parts, Used Transmission Parts, Used Engine Parts, Used Body parts for used Japanese cars, please check our Affordable Japanese used car parts catalogue. Most of the parts in catalogue are OEM used parts sourced from Used Japanese cars. We source our parts directly from approved Japanese car dismantlers, Japanese car Wrecker companies, and Japanese car salvage companies. We cut the middle man cost to provide most cost effective second hand parts for Japanese cars. We already are catering to hundreds of our regular customers by providing quality USED JDM car parts, reconditioned Japanese car parts. SHAH PARTS is Home to Thousands of Replacement parts for Japanese cars. Custom Japanese car accessories widely available in our store. SHOP WITH US for Second-hand parts for Japanese cars. For Affordable Japanese used car parts SHAH PARTS is only solution, if you are smart detail oriented businessman. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email us at info@shahparts.com",
    "SHAH PARTS is Japanese car parts store, with hundreds of regular loyal customers worldwide. To buy Used Suspension Parts, Used Axle parts, Used Transmission Parts, Used Engine Parts, Used Body parts for used Japanese cars, Please check our used car parts catalogue. Variations of $post_title$ are available with us. Almost all of the parts in catalogue are OEM used parts sourced from Used Japanese cars. We source our parts from approved Japanese car dismantlers and Japanese car salvage companies. We cut the middle man cost to provide most cost effective price possible second hand parts for Japanese cars. We already are serving hundreds of our loyal customers by providing quality USED JDM car parts. Reconditioned Japanese car parts. SHAH PARTS keeps Thousands of Replacement parts for Japanese cars in storage. Custom Japanese car accessories widely available in our store. SHOP WITH US for Second-hand parts for Japanese cars. For Affordable Japanese used car parts SHAH PARTS is only solution, if you are smart detail oriented businessman. Contact us via Whats-App (preferred) +818050821650 or email us at info@shahparts.com",
    "For Used Suspension Parts, Used Axle parts, Used Transmission Parts, Used Engine Parts, Used Body parts for used Japanese cars, Please check our parts catalogue. Few Variations of $post_title$ are available with us. Most of the parts in catalogue are OEM used parts sourced from Used Japanese cars. We resource our parts directly from approved Japanese car dismantlers and Japanese car Wrecker companies. We cut the middle man cost to provide best possible second hand parts for Japanese cars. We already are providing service to hundreds of our partner companies by providing USED JDM aftermarket car parts and Reconditioned Japanese car parts. SHAH PARTS is Home to Thousands of Replacement parts for Japanese cars. Custom Japanese car accessories are available in our store. Do visit our shop for Second-hand parts for Japanese cars. For Affordable Japanese used car parts SHAH PARTS is only solution, if you are smart businessman. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email us at info@shahparts.com",
    "For Used Suspension Parts, Used Axle parts, Used Transmission Parts, Used Engine Parts, Used Body parts for used Japanese cars, Please check our used car parts catalogue. Model Variations of $post_title$ are available with us. Almost all of the parts in catalogue are OEM used parts sourced from Used Japanese cars. We source our parts directly from approved Japanese car Wrecker companies and Japanese car salvage companies. We cut the middle man cost to provide best possible second hand parts for Japanese cars. We already are providing quality service to hundreds of our loyal customers by providing USED JDM car parts and Reconditioned Japanese car parts. SHAH PARTS is Japanese car parts store, with thousands of Replacement parts for Japanese cars in our store. Custom Japanese car accessories widely available in our store. SHOP WITH US for Second-hand parts for Japanese cars. For Affordable Japanese used car parts SHAH PARTS is only solution, if you are smart businessman. Variations of $post_title$ are available with us. Contact us via Whats-App (preferred) +818050821650 or email us at info@shahparts.com",
    "We source our parts directly from Japanese car Wrecker companies. We cut the middle man cost to provide cheapest possible second hand parts for Japanese cars. Used transmissions for Japanese cars, Used suspension parts for Japanese vehicles widely available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com",
    "Model variations of $post_title$ are available with us. We source our parts directly from Japanese car Wrecker companies. We cut the middle man cost to provide cheapest possible second hand parts for Japanese cars. Used auto parts from Japan are widely available. Contact us via Whats-App (preferred) +818050821650 or email info@shahparts.com"
];

// Function to generate random SEO data for a product
export const generateSeoData = (product) => {
    const title = faker.helpers.arrayElement(seoTitles).replace('$post_title$', product.Title);
    const description = faker.helpers.arrayElement(seoDescriptions).replace('$post_title$', product.Title);

    return {
        title,
        description,
        metaTags: [
            { name: 'description', content: description },
            { name: 'keywords', content: 'Japanese car parts, used car parts, JDM parts' },
            { name: 'robots', content: 'index, follow' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: `https://www.shahparts.com/products/${product?._id}` },
            { property: 'og:image', content: product.imageUrl }
        ]
    };
};