import categoryModel from "../models/categoryModel.js"
import slugify from "slugify"

//create  category :3
export const createCategoryController = async(req,res)=>{
    try{

        const {name} = req.body
        const {description} = req.body;
        const {state} = req.body;

        if(!name){
            return res.status(401).send({message:'name is required'})

        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'La categoria ya existe'

            })
        }

        const category = await new categoryModel({name, slug:slugify(name),description,state}).save()

        res.status(201).send({
            succes:true,
            message:'La categoria fue creada',
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in category'
        })
    }
}

//update category
export const updateCategoryController = async (req, res) => {
    try {
      const { name } = req.body;
      const { description } = req.body;
      const { state } = req.body;
      const { id } = req.params;
      const category = await categoryModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name),description,state},
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Category Updated Successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating category",
      });
    }
  };
  
  
  // get all cat
  export const categoryControlller = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "All Categories List .-.",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories",
      });
    }
  };
  
  // single category
  export const singleCategoryController = async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await categoryModel.findById(slug);
      res.status(200).send({
        success: true,
        message: "Get SIngle Category SUccessfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Category",
      });
    }
  };
  
  //delete category
  export const deleteCategoryCOntroller = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Category Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };
