import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  contactLimiter,
} from "../controllers/contact.controller.mjs";

const router = express.Router();

router.post("/create", contactLimiter, createContact);
router.get("/all", getAllContacts);
router.get("/view/:id", getContactById);
router.put("/edit/:id", updateContact);
router.delete("/delete/:id", deleteContact);

export default router;