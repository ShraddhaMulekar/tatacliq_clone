import express from "express";
import auth from "../middleware/auth.middleware.js";
import ProductModel from "../models/product.model.js";
import isAdmin from "../middleware/admin.middleware.js";

const productRouter = express.Router();

// add product
productRouter.post("/add-products", auth, isAdmin, async (req, res) => {
  const {
    brand,
    content,
    image,
    price,
    starRating,
    numberRating,
    category,
    productType,
    department,
  } = req.body;

  try {
    let newProduct = await ProductModel({
      brand,
      content,
      image,
      price,
      starRating,
      numberRating,
      category,
      productType,
      department,
    });
    await newProduct.save();
    console.log("Product added successful!", newProduct);
    return res.json({ msg: "Product added successful!", newProduct });
  } catch (error) {
    console.log("error in adding product!", error);
    return res.json({ msg: "error in adding product!", error });
  }
});

//update product
productRouter.patch("/update/:id", auth, isAdmin, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.json({ msg: "product not available!" });
    }
    const updateProduct = await ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    console.log("Product updated successful!", updateProduct);
    return res.json({ msg: "Product updated successful!", updateProduct });
  } catch (error) {
    console.log("error in update product!", error);
    return res.json({ msg: "error in update product!", error });
  }
});

//delete product
productRouter.delete("/delete/:id", auth, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await ProductModel.findOneAndDelete(id);
    console.log("Product Delete successful!", deleteProduct);
    return res.json({ msg: "Product Delete successful!", deleteProduct });
  } catch (error) {
    console.log("error in delete product!", error);
    return res.json({ msg: "error in delete product!", error });
  }
});

// check all products
productRouter.get("/all-products", async (req, res) => {
  const queryParameter = qs.parse(req.query);
  const { search, filter, sort, page, limit } = queryParameter;

  try {
    const searchQuery = {};
    // search functionality by brand, content, category, department, productType
    if (search) {
      searchQuery.$or = [
        { brand: { $regex: search.trim(), $options: "i" } },
        { content: { $regex: search.trim(), $options: "i" } },
        { category: { $regex: search.trim(), $options: "i" } },
        { productType: { $regex: search.trim(), $options: "i" } },
        { department: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // filter by brand, category, department, productType
    if (filter) {
      try {
        const filterData = JSON.parse(filter);
        if (filterData.brand) {
          searchQuery.brand = filterData.brand;
        }
        if (filterData.category) {
          searchQuery.category = filterData.category;
        }
        if (filterData.department) {
          searchQuery.department = filterData.department;
        }
        if (filterData.productType) {
          searchQuery.productType = filterData.productType;
        }
      } catch (error) {
        return res.json({ msg: "error in filter functionality.", error });
      }
    }

    // sort by price
    const sortQuery = {};
    if (sort) {
      // sort = /all-products?sort=price:asc
      let [feild, order] = sort.split(":"); //feild=price    order=asc/desc
      if (feild && (order === "asc" || order === "desc")) {
        return (sortQuery[feild] = order === "asc" ? 1 : -1); // 1=asc; -1=desc
      } else {
        return res.json({
          msg: "Invalid sort format. Expected 'field:asc|desc'",
        });
      }
    }

    //pagination
    if (page && limit) {
      //all-products?page=1&limit=5
      const pageNo = +page || 1; // +page=string to number ; default=1
      const limits = +limit || 5;
      const skip = (pageNo - 1) * limits; // (2-1)*5=5
      const totalPage = await ProductModel.countDocuments(searchQuery);
      const fetchProduct = await ProductModel.find(searchQuery)
        .sort(sortQuery)
        .skip(skip)
        .limit(limits);
      return res.json({
        msg: "product fetch successful!",
        fetchProduct,
        pagination: {
          total: totalPage,
          currentPage: page,
          totalPage: Math.ceil(totalPage / limit),
        },
      });
    } else {
      let fetchProduct = await ProductModel.find(searchQuery);
      return res.json({ msg: "all products fetch successfull!", fetchProduct });
    }

  } catch (error) {
    return res.json({ msg: "error in getting product!", error });
  }
});

export default productRouter;
