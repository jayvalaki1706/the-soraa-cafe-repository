import { Router, type IRouter } from "express";
import { db, contactMessagesTable } from "@workspace/db";
import { z } from "zod";

const router: IRouter = Router();

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

// POST /contact
router.post("/contact", async (req, res): Promise<void> => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  const { name, email, phone, message } = result.data;

  const [inserted] = await db
    .insert(contactMessagesTable)
    .values({ name, email, phone: phone ?? null, message })
    .returning();

  res.status(201).json({
    ...inserted,
    createdAt: inserted.createdAt.toISOString(),
  });
});

export default router;
