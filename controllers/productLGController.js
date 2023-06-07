import productLGModel from "../models/productLGModel.js";

import slugify from "slugify";

//createProductLGController,updateProductLGController, ProductLGControlller,singleProductLGController,deleteProductLGCOntroller

export const createProductLGController = async (req, res) => {
  try {
    const {
      name,
      description,
      state,
      category,
      price,
      imageUrl,
      porcentage,
      supplier,
    } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "name is required" });
    }
    if (!description) {
      return res.send({ message: "description is required" });
    }
    if (!state) {
      return res.send({ message: "state error is required" });
    }
    if (!category) {
      return res.send({ error: "category is required" });
    }
    if (!price) {
      return res.send({ error: "price is required" });
    }
    if (!imageUrl) {
      return res.send({ error: "name is required" });
    }
    if (!supplier) {
      return res.send({ error: "supplier is required" });
    }

    //check user

    const existingUser = await productLGModel.findOne({ name });
    console.log(existingUser);

    //existing user

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "already register",
      });
    }
    //save
    const product = await new productLGModel({
      name,
      slug: slugify(name),
      description,
      state,
      category,
      price,
      imageUrl,
      supplier,
    }).save();

    res.status(201).send({
      success: true,
      message: "product register successfully",
      product,
    }).save;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in registration",
      error,
    });
  }
};
//update offer
export const updateOfferLGController = async (req, res) => {
  try {
    const { porcentage } = req.body;
    const { pid } = req.params;
    const product = await productLGModel.findByIdAndUpdate(
      pid,
      {
        porcentage,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Offer Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Offer",
    });
  }
};
//update product
export const updateProductLGController = async (req, res) => {
  try {
    const { name } = req.body;
    const { description } = req.body;
    const { state } = req.body;
    const { category } = req.body;
    const { price } = req.body;
    const { pid } = req.params;
    const { imageUrl } = req.body;
    const { supplier } = req.body;
    const product = await productLGModel.findByIdAndUpdate(
      pid,
      {
        name,
        slug: slugify(name),
        description,
        state,
        category,
        price,
        imageUrl,
        supplier,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating product",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    const { existence } = req.body;

    await ProductLG.findByIdAndUpdate(productId, { existence });

    res.status(200).json({
      success: true,
      message: "Cantidad de existencia actualizada correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar la cantidad de existencia del producto",
    });
  }
};

// get all products
export const ProductLGControlller = async (req, res) => {
  try {
    const product = await productLGModel.find({});
    res.status(200).send({
      success: true,
      message: "All products List",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all products",
    });
  }
};

// single product
export const singleProductLGController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productLGModel.findById(slug);
    res.status(200).send({
      success: true,
      message: "Get SIngle product SUccessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single product error",
    });
  }
};

//delete product
export const deleteProductLGCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await productLGModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting product",
      error,
    });
  }
};

//deleteoffer

export const deleteOfferLGCOntroller = async (req, res) => {
  try {
    const { pid } = req.params;
    await productLGModel.findByIdAndUpdate(req.params.pid, {
      $set: { porcentage: 0 },
    });

    res.status(200).send({
      success: true,
      message: "Product Porcentage Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product porcentage",
      error,
    });
  }
};

// filter Category product
export const filterCategoryProductLGController = async (req, res) => {
  try {
    const { cate } = req.params;
    const product = await productLGModel.find({ category: cate });
    res.status(200).send({
      success: true,
      message: "Ge SIngle product SUccessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single product error",
    });
  }
};

// filtro product por oferta y precio
export const filterOfferPriceProductLGController = async (req, res) => {
  try {
    const { radio, checked, categoria } = req.params;
    //Precio Oferta   Categoria
    const args = {}; //Oferta
    let arg = {};
    if (checked !== "0") {
      args.$ne = 0;
    } else {
      args.$ne = undefined;
    }
    if (radio > 0) {
      if (radio === "1") {
        arg = { price: parseInt(1) }; //De menor a mayor
      }
      if (radio === "2") {
        arg = { price: parseInt(-1) }; //De mayor a menor
      }
    }
    const products = await productLGModel
      .find({ category: categoria, porcentage: args })
      .sort(arg);
    console.log(products);
    res.status(200).send({
      success: true,
      message: "Ge SIngle product SUccessfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single product error",
    });
  }
};
