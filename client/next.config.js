/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    output: "export",
    images: {
        unoptimized: true,
        domains: ['res.cloudinary.com', 'localhost', 'picsum.photos'] // <== Domain name
    }
}

module.exports = nextConfig
