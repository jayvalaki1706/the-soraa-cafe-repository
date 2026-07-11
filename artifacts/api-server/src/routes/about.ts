import { Router, type IRouter } from "express";

const router: IRouter = Router();

// GET /about — static cafe info
router.get("/about", (_req, res): void => {
  res.json({
    name: "The Soraa Cafe",
    tagline: "Where every cup tells a story",
    description:
      "Nestled in the heart of Nikol, Ahmedabad, The Soraa Cafe is your neighborhood sanctuary for great food, handcrafted beverages, and warm conversations. Founded in 2019, we have been serving the community with love, using fresh local ingredients and time-honored recipes. Whether you are starting your morning with our signature chai or unwinding with a cold coffee in the evening, every visit feels like coming home.",
    address: "Shop No. 5, Near Nikol Cross Roads, Nikol, Ahmedabad, Gujarat 382350",
    phone: "+91 98765 43210",
    email: "hello@soraacafe.in",
    openingHours: [
      { day: "Monday – Friday", hours: "7:00 AM – 10:00 PM" },
      { day: "Saturday", hours: "7:00 AM – 11:00 PM" },
      { day: "Sunday", hours: "8:00 AM – 10:00 PM" },
    ],
  });
});

export default router;
