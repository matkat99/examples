import { Router } from "express";
import userRoutes from "./userRoutes.mts";

const router:Router = Router();

// The home page route
router.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});

router.use("/users", userRoutes);

export default router;