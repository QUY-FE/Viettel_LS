import Product from '../models/product.model.mjs';

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    return res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).lean();
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      req.body,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ slug }).lean();

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};