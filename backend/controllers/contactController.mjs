import Contact from "../models/Contact.mjs";
import rateLimit from "express-rate-limit";

// Rate limit: mỗi IP chỉ được 10 request / phút cho contact
export const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 10,
  message: {
    status: 429,
    message: "Too many requests, chill a bit."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CREATE
export const createContact = async (req, res) => {
  try {
    const { name, phone, address, problem, another } = req.body;

    const newContact = new Contact({
      name,
      phone,
      address,
      problem,
      another,
    });

    const saved = await newContact.save();

    res.status(201).json({
      message: "Create contact success",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create failed",
      error: error.message,
    });
  }
};

// READ ALL
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Get all contacts success",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get all failed",
      error: error.message,
    });
  }
};

// READ ONE
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Get contact success",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get one failed",
      error: error.message,
    });
  }
};

// UPDATE
export const updateContact = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Update success",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

// DELETE
export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Delete success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
      error: error.message,
    });
  }
};