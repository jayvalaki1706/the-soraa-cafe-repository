import { Router, type IRouter } from "express";
import { db, galleryPhotosTable } from "@workspace/db";

const router: IRouter = Router();

// GET /gallery
router.get("/gallery", async (_req, res): Promise<void> => {
  const photos = await db.select().from(galleryPhotosTable);
  res.json(photos);
});

export default router;
