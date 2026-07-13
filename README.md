<img width="1920" height="1080" alt="Screenshot (10)" src="https://github.com/user-attachments/assets/a3b8a53e-d6e4-481a-961c-9ebe2242c8e1" /># ☕ The Soraa Cafe

A full-stack cafe website for **The Soraa Cafe**, Nikol, Ahmedabad. Built with React + Vite on the frontend, Express 5 on the backend, PostgreSQL for the database, and an OpenAPI-driven contract between them.

![The Soraa Cafe](https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80)

---

## ✨ Features

- **Home** — Hero section, featured menu items, cafe highlights
- **Menu** — Full menu with categories (Hot Beverages, Cold Drinks, Snacks, Meals, Desserts, and more), prices in ₹ INR, veg/non-veg badges, and popular item highlights
- **Gallery** — Photo gallery with lightbox viewer
- **About** — Cafe story, values, and team
- **Contact** — Contact form that saves messages to the database
- Fully **responsive** — mobile, tablet, and desktop
- Smooth **animations** via Framer Motion
- Earthy **terracotta / cream / espresso** design palette
- **Playfair Display** headings + **Lato** body text

---

## 🗂️ Project Structure

This is a **pnpm monorepo** with the following packages:

```
.
├── artifacts/
│   ├── soraa-cafe/          # React + Vite frontend
│   └── api-server/          # Express 5 REST API backend
├── lib/
│   ├── api-spec/            # OpenAPI 3.1 specification (source of truth)
│   ├── api-client-react/    # Auto-generated React Query hooks (from OpenAPI)
│   ├── api-zod/             # Auto-generated Zod validation schemas (from OpenAPI)
│   └── db/                  # Drizzle ORM schema + PostgreSQL client
└── pnpm-workspace.yaml
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 7, TypeScript |
| Routing | Wouter |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| UI Components | Radix UI primitives |
| Data Fetching | TanStack React Query v5 |
| Backend | Express 5, TypeScript |
| Database | PostgreSQL + Drizzle ORM |
| Validation | Zod 3 |
| API Contract | OpenAPI 3.1 → Orval codegen |
| Package Manager | pnpm (workspaces) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **pnpm** v9 or higher — install with `npm install -g pnpm`
- **PostgreSQL** database (local or hosted, e.g. Neon, Supabase, Railway)

### 1. Clone the repository

```bash
git clone https://github.com/jayvalaki1706/the-soraa-cafe-repository.git
cd the-soraa-cafe-repository
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
SESSION_SECRET=your_random_secret_string_here
```

Replace the `DATABASE_URL` with your PostgreSQL connection string.

### 4. Push the database schema

This creates all the required tables in your database:

```bash
pnpm --filter @workspace/db run push
```

### 5. Start the development servers

Open **two terminals** and run each command in its own terminal:

**Terminal 1 — API server (backend):**
```bash
pnpm --filter @workspace/api-server run dev
```
The API starts on `http://localhost:3001/api`

**Terminal 2 — Frontend:**
```bash
pnpm --filter @workspace/soraa-cafe run dev
```
The frontend starts on `http://localhost:5173`

Open `http://localhost:5173` in your browser to see the site.

---

## 🌱 Seeding the Database

The database starts empty. To populate it with the full menu (43 items across 6 categories) and 12 gallery photos, run the seed SQL against your database.

You can use any PostgreSQL client (`psql`, TablePlus, DBeaver, etc.) or run it via the `psql` CLI:

```bash
psql $DATABASE_URL
```

**Seed menu categories:**
```sql
INSERT INTO menu_categories (name, slug, description) VALUES
  ('Hot Beverages', 'hot-beverages', 'Warm drinks to comfort your soul'),
  ('Cold Drinks', 'cold-drinks', 'Refreshing chilled beverages'),
  ('Snacks', 'snacks', 'Light bites and starters'),
  ('Meals', 'meals', 'Hearty main course dishes'),
  ('Desserts', 'desserts', 'Sweet treats to end your meal'),
  ('Sandwiches & Wraps', 'sandwiches-wraps', 'Freshly made sandwiches and wraps');
```

**Seed menu items (sample — add all 43 as needed):**
```sql
INSERT INTO menu_items (name, description, price, category_id, is_veg, is_popular) VALUES
  ('Masala Chai',     'Signature spiced tea with ginger, cardamom & milk',          40,  1, true,  true),
  ('Filter Coffee',   'South Indian decoction coffee',                               50,  1, true,  true),
  ('Cold Coffee',     'Chilled blended coffee with ice cream',                       80,  2, true,  true),
  ('Veg Sandwich',    'Freshly toasted sandwich with veggies & cheese',              60,  6, true,  false),
  ('Paneer Wrap',     'Spiced paneer tikka rolled in a soft tortilla',               90,  6, true,  true),
  ('Gulab Jamun',     'Soft milk-solid dumplings soaked in rose syrup',              50,  5, true,  true);
-- ... add remaining items from your database
```

---

## 📡 API Reference

The REST API runs at `/api` and is documented via OpenAPI. All endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/healthz` | Health check |
| `GET` | `/api/menu/categories` | All menu categories |
| `GET` | `/api/menu/items` | All menu items (filter with `?category=slug`) |
| `GET` | `/api/menu/featured` | Popular / featured items |
| `GET` | `/api/menu/items/:id` | Single menu item |
| `GET` | `/api/gallery` | All gallery photos |
| `GET` | `/api/about` | Cafe info (name, address, hours, social links) |
| `POST` | `/api/contact` | Submit a contact message |

### Example API calls

```bash
# Get all categories
curl http://localhost:3001/api/menu/categories

# Get items in "hot-beverages" category
curl "http://localhost:3001/api/menu/items?category=hot-beverages"

# Submit a contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jay","email":"jay@example.com","message":"Great coffee!"}'
```

The full OpenAPI spec is at `lib/api-spec/openapi.yaml`.

---

## 🧩 Code Generation

The frontend API client and Zod schemas are **auto-generated** from the OpenAPI spec using [Orval](https://orval.dev/). Never edit files inside `lib/api-client-react/src/generated/` or `lib/api-zod/src/generated/` directly.

To regenerate after changing `lib/api-spec/openapi.yaml`:

```bash
pnpm --filter @workspace/api-client-react run generate
pnpm --filter @workspace/api-zod run generate
```

---

## 🏗️ Building for Production

```bash
# Build everything
pnpm run build

# Or build individually
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/soraa-cafe run build
```

The frontend builds to `artifacts/soraa-cafe/dist/` and the API server compiles to `artifacts/api-server/dist/`.

---

## 📁 Key Files

```
artifacts/soraa-cafe/src/
├── pages/
│   ├── Home.tsx          # Landing page with hero + featured items
│   ├── Menu.tsx          # Full menu with category tabs
│   ├── Gallery.tsx       # Photo gallery with lightbox
│   ├── About.tsx         # Cafe story and info
│   └── Contact.tsx       # Contact form
├── components/
│   ├── Navbar.tsx        # Responsive navigation
│   └── Footer.tsx        # Site footer
└── App.tsx               # Router setup

artifacts/api-server/src/routes/
├── menu.ts               # Menu categories, items, featured
├── gallery.ts            # Gallery photos
├── contact.ts            # Contact form submission
└── about.ts              # Static cafe information

lib/db/src/schema/
├── menuCategories.ts     # menu_categories table
├── menuItems.ts          # menu_items table
├── galleryPhotos.ts      # gallery_photos table
└── contactMessages.ts    # contact_messages table
```

---

## 📍 About The Soraa Cafe

**The Soraa Cafe** is a cozy neighborhood cafe located in **Nikol, Ahmedabad, Gujarat, India**. Known for its warm ambiance, aromatic chai, and freshly prepared snacks — a place where every cup tells a story.

## UI 
<img width="1920" height="1080" alt="Screenshot (8)" src="https://github.com/user-attachments/assets/2efe24b3-ae0a-404b-87ee-6c91075c9d8d" />
<img width="1920" height="1080" alt="Screenshot (9)" src="https://github.com/user-attachments/assets/17cb72f7-d090-48ad-b66f-539dd0731463" />
<img width="1920" height="1080" alt="Screenshot (10)" src="https://github.com/user-attachments/assets/dfa94f69-fa3f-47c8-9020-a7d8edc829b5" />
<img width="1920" height="1080" alt="Screenshot (11)" src="https://github.com/user-attachments/assets/7d03535e-f47a-4115-94ec-ff754e608bfc" />
<img width="1920" height="1080" alt="Screenshot (12)" src="https://github.com/user-attachments/assets/8743f2fe-d92a-4186-a1f9-3b748c3283a5" />
<img width="1920" height="1080" alt="Screenshot (13)" src="https://github.com/user-attachments/assets/b4e13233-31be-4d08-b590-3bbe0378f22f" />
<img width="1920" height="1080" alt="Screenshot (14)" src="https://github.com/user-attachments/assets/17650e85-c342-4067-a1e4-6df113fa71fd" />
<img width="1920" height="1080" alt="Screenshot (38)" src="https://github.com/user-attachments/assets/1b682d3f-83a3-4142-ac10-526c5c8428bd" />
<img width="1920" height="1080" alt="Screenshot (39)" src="https://github.com/user-attachments/assets/b61ca54a-1a22-4462-a5d0-418b0d6552b5" />
<img width="1920" height="1080" alt="Screenshot (40)" src="https://github.com/user-attachments/assets/743e2701-d924-4f66-b6de-48d728a94b39" />


---

## 📄 License

MIT — free to use and modify.
