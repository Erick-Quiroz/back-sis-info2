import express from "express";
import {
  createProductLGController,
  updateProduct,
  updateProductLGController,
  updateOfferLGController,
  deleteOfferLGCOntroller,
  ProductLGControlller,
  singleProductLGController,
  deleteProductLGCOntroller,
  filterCategoryProductLGController,
  filterOfferPriceProductLGController,
} from "../controllers/productLGController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post("/create-productLG", createProductLGController);

//get products
router.get("/get-productLG", ProductLGControlller);

//single product
router.get("/get-productLG/:slug", singleProductLGController);

//delete rproduct
router.delete("/productLG/:pid", deleteProductLGCOntroller);

//update
router.put("/update-productLG/:pid", updateProductLGController);
router.put("/update-product/:pid", updateProduct);

//routes
//offer
router.put("/update-offerLG/:pid", updateOfferLGController);
//delete rproduct
router.delete("/offerDproductLG/:pid", deleteOfferLGCOntroller);

//filter product category
router.get(
  "/filter-Category-productLG/:cate",
  filterCategoryProductLGController
);

//filtro product categoria por oferta y precio
router.get(
  "/filter-Offer-Category-productLG/:radio/:checked/:categoria",
  filterOfferPriceProductLGController
);

//get photo
//router.get("/product-photo/:pid", productPhotoController);

export default router;
