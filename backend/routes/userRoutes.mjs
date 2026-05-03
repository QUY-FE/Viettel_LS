import express from "express";
import rateLimit from "express-rate-limit";
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from "../controllers/userController.mjs";

const router = express.Router();

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút." },
    standardHeaders: true,
    legacyHeaders: false,
});

const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { message: "Tạo tài khoản quá nhiều lần. Vui lòng thử lại sau 1 giờ." }
});

router.use(generalLimiter);

router.post("/", createAccountLimiter, createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;