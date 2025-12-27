const express = require('express');
const { isAdmin, AuthenticatorJWT } = require('../middlewares/authenticator');
const { getProductById, updateProduct, deleteProduct, getRelatedProducts, uploadProduct, getAllAdminProducts, getLimitedProducts, getFeaturedProducts, searchProducts, autocompleteProducts, uploadBulkProducts, getAllProductsMakes, getAllProductsParts, getAllProductsModelsByMake, getAllProductsPartsByModel, getAllProductsPartAccessorriesByPart, addProductReview, removeProductReview, getProductIdsChunk, getProductsByIds } = require('../controllers/productController');

const router = express.Router();

router.get('/get/related/:id', getRelatedProducts);
router.get('/get/product-ids/', getProductIdsChunk);
router.get('/get/featured', getFeaturedProducts);
router.get('/admin/get/:id', getAllAdminProducts);
router.get('/product/:id', getProductById);
router.get('/parts', getAllProductsParts);
router.get('/makes', getAllProductsMakes);
router.post('/get/related', getRelatedProducts);
router.post('/models/make', getAllProductsModelsByMake);
router.post('/parts/model', getAllProductsPartsByModel);
router.post('/partaccessories/part', getAllProductsPartAccessorriesByPart);
router.post('/get', getLimitedProducts);
router.post('/search', searchProducts);
router.get('/autocomplete', autocompleteProducts);
router.post('/create', AuthenticatorJWT, isAdmin, uploadProduct);
router.post('/bulk-upload', AuthenticatorJWT, isAdmin, uploadBulkProducts);
router.put('/update/:id', AuthenticatorJWT, isAdmin, updateProduct);
router.put('/add-review/:id', AuthenticatorJWT, addProductReview);
router.put('/remove-review/:id', AuthenticatorJWT, removeProductReview);
router.delete('/delete/:id', AuthenticatorJWT, isAdmin, deleteProduct);
router.post('/by-ids', getProductsByIds);

module.exports = router;