# ikea-info
# IKEA Furniture Info Server 🛋️

A Node.js server that shows IKEA furniture information. Users can view products, furniture categories, and dynamic customer reviews, along with static pages like About, Contact, and Info.

---

## Features ✨

- Home page with navigation links.
- Furniture page showing categories (beds, chairs, tables, shelves).
- Products page listing all products dynamically.
- Product details page with query support (`?id=` or `?category=`).
- Dynamic customer reviews page (`/review`) with optional product filtering (`?productId=`).
- Static pages: About, Contact, Info.
- 404 page for unknown routes.

---

## How It Works ⚙️

1. **Server Setup:**  
   - Built with Node.js `http` module.  
   - Run `node server.js` to start the server on port `3000`.

2. **Request Handling:**  
   - Server checks the URL path (e.g., `/products`, `/product`) and query parameters (`?id=1`, `?category=table`, `?productId=2`).  
   - Sends back HTML content dynamically or reads static files.

3. **Dynamic Pages:**  
   - **Home Page:** Navigation and instructions.  
   - **Furniture Page:** Lists categories.  
   - **Products Page:** Loops through `data/furniture.js` and displays all products.  
   - **Product Details Page:**  
     - `?id=<number>` → Shows a single product.  
     - `?category=<name>` → Shows products by category.  
   - **Reviews Page:**  
     - Loops through `data/reviews.js`.  
     - Displays reviewer name, rating, comment, and related product name.  
     - Optional: `?productId=<number>` to filter reviews for a specific product.

4. **Static Pages:**  
   - About, Contact, and Info pages are read from `pages/` folder.  
   - Info is a `.txt` file, others are `.html`.

5. **Header & Footer:**  
   - Every page includes a consistent header and footer.

6. **404 Handling:**  
   - Unknown routes show a friendly 404 page.

---
## Setup Node Server 🖥️

Follow these steps to set up and run the Node.js server:

1. **Install Node.js**  
   - Download and install Node.js from [https://nodejs.org](https://nodejs.org).  
   - Verify installation in your terminal:

```bash
node -v
Start the Server:
node server.js

Open your web browser and go to:

http://localhost:3000


⚠️ The server runs on port 3000 by default. You can change the port by editing the PORT variable in server.js.

