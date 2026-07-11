import { Router, type IRouter } from "express";
import { db, menuCategoriesTable, menuItemsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";

const router: IRouter = Router();

// GET /menu/categories
router.get("/menu/categories", async (req, res): Promise<void> => {
  const categories = await db
    .select({
      id: menuCategoriesTable.id,
      name: menuCategoriesTable.name,
      slug: menuCategoriesTable.slug,
      description: menuCategoriesTable.description,
      itemCount: sql<number>`cast(count(${menuItemsTable.id}) as int)`,
    })
    .from(menuCategoriesTable)
    .leftJoin(menuItemsTable, eq(menuItemsTable.categoryId, menuCategoriesTable.id))
    .groupBy(menuCategoriesTable.id);

  res.json(categories);
});

// GET /menu/items
router.get("/menu/items", async (req, res): Promise<void> => {
  const categorySlug = typeof req.query.category === "string" ? req.query.category : undefined;

  const baseQuery = db
    .select({
      id: menuItemsTable.id,
      name: menuItemsTable.name,
      description: menuItemsTable.description,
      price: menuItemsTable.price,
      categoryId: menuItemsTable.categoryId,
      categoryName: menuCategoriesTable.name,
      isVeg: menuItemsTable.isVeg,
      isPopular: menuItemsTable.isPopular,
      imageUrl: menuItemsTable.imageUrl,
    })
    .from(menuItemsTable)
    .innerJoin(menuCategoriesTable, eq(menuItemsTable.categoryId, menuCategoriesTable.id));

  const items = categorySlug
    ? await baseQuery.where(eq(menuCategoriesTable.slug, categorySlug))
    : await baseQuery;

  res.json(items.map((item) => ({ ...item, price: parseFloat(item.price) })));
});

// GET /menu/featured
router.get("/menu/featured", async (req, res): Promise<void> => {
  const items = await db
    .select({
      id: menuItemsTable.id,
      name: menuItemsTable.name,
      description: menuItemsTable.description,
      price: menuItemsTable.price,
      categoryId: menuItemsTable.categoryId,
      categoryName: menuCategoriesTable.name,
      isVeg: menuItemsTable.isVeg,
      isPopular: menuItemsTable.isPopular,
      imageUrl: menuItemsTable.imageUrl,
    })
    .from(menuItemsTable)
    .innerJoin(menuCategoriesTable, eq(menuItemsTable.categoryId, menuCategoriesTable.id))
    .where(eq(menuItemsTable.isPopular, true))
    .limit(8);

  res.json(items.map((item) => ({ ...item, price: parseFloat(item.price) })));
});

// GET /menu/items/:id
router.get("/menu/items/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);

  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [item] = await db
    .select({
      id: menuItemsTable.id,
      name: menuItemsTable.name,
      description: menuItemsTable.description,
      price: menuItemsTable.price,
      categoryId: menuItemsTable.categoryId,
      categoryName: menuCategoriesTable.name,
      isVeg: menuItemsTable.isVeg,
      isPopular: menuItemsTable.isPopular,
      imageUrl: menuItemsTable.imageUrl,
    })
    .from(menuItemsTable)
    .innerJoin(menuCategoriesTable, eq(menuItemsTable.categoryId, menuCategoriesTable.id))
    .where(eq(menuItemsTable.id, id));

  if (!item) {
    res.status(404).json({ error: "Menu item not found" });
    return;
  }

  res.json({ ...item, price: parseFloat(item.price) });
});

export default router;
