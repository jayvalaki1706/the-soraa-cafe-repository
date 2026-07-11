import { Router, type IRouter } from "express";
import healthRouter from "./health";
import menuRouter from "./menu";
import galleryRouter from "./gallery";
import contactRouter from "./contact";
import aboutRouter from "./about";

const router: IRouter = Router();

router.use(healthRouter);
router.use(menuRouter);
router.use(galleryRouter);
router.use(contactRouter);
router.use(aboutRouter);

export default router;
