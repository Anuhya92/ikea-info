const http = require("http");
const fs = require("fs");
const pathModule = require("path");
const furniture = require("./data/furniture");

const PORT = 3000;

// Header function
function header() {
  return `
    <header>
        <h1>IKEA Furniture Info</h1>
        <nav>
            <a href="/">Home</a> | 
            <a href="/furniture">Furniture</a> | 
            <a href="/products">Products</a> | 
            <a href="/about">About</a> | 
            <a href="/contact">Contact</a> | 
            <a href="/review">Review</a> | 
            <a href="/info">Info</a>
        </nav>
    </header>
    `;
}

// Footer function
function footer() {
  return `
    <footer>
        <p>&copy; 2026 IKEA Info Site</p>
    </footer>
    `;
}

const server = http.createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const path = myURL.pathname;
  const query = Object.fromEntries(myURL.searchParams);

  res.writeHead(200, { "Content-Type": "text/html" });

  // --------- Home Page ---------
  if (path === "/") {
    res.write(header("Welcome to IKEA Furniture Info"));
    res.write("<h2>Welcome to IKEA Furniture Info</h2>");
    res.write("<p>Check our pages and queries:</p>");
    res.write("<p>Available Routes:</p>");
    res.write("<ul>");
    res.write("<li> View all furniture categories - /furniture </li>");
    res.write("<li> View all products - /products</li>");
    res.write("<li> View product details by ID - /product?id=1</li>");
    res.write("<li> View products by category - /product?category=table</li>");
    res.write("<li> Learn more about us - /about</li>");
    res.write("<li>Contact us - /contact</li>");
    res.write("<li> Read customer reviews - /review</li>");
    res.write("<li> Additional information - /info</li>");
    res.write("</ul>");
    res.write("<h3>Get Started</h3>");
    res.write(
      '<p>Start by exploring our <a href="/furniture">furniture collection</a> or checking out all our <a href="/products">products</a>.</p>',
    );
    res.write(
      '<p>For specific product details, use the <a href="/product?id=1">product page</a> with the desired ID or category.</p>',
    );
    res.write(
      '<p>Need more information about us? Visit our <a href="/about">About</a> page or <a href="/contact">Contact</a> us directly.</p>',
    );
    res.write(
      '<p>Don\'t forget to read our <a href="/review">customer reviews</a> to see what others think!</p>',
    );
    res.write(
      '<p>For additional resources, check out our <a href="/info">Info</a> page.</p>',
    );
    res.write("<h3>Happy Browsing!</h3>");
    res.write(
      "<p>We hope you find the perfect IKEA furniture for your needs.</p>",
    );
    res.write("<p>Use the navigation links above to explore more.</p>");

    res.write(
      "<p><em>Your one-stop source for IKEA furniture information!</em></p>",
    );
    res.write(
      "<p>Discover a wide range of IKEA furniture, from stylish beds to functional tables, all in one place.</p>",
    );
    res.write(footer("Home Page"));
    res.end();
  }

  // --------- Furniture Page (HTML in JS) ---------
  else if (path === "/furniture") {
    res.write(header());
    res.write("<h2>Our Furniture Collection</h2>");
    res.write("<p>We have beds, chairs, tables, and shelves.</p>");
    res.write("<ul>");
    res.write("<li>Beds</li>");
    res.write("<li>Chairs</li>");
    res.write("<li>Tables</li>");
    res.write("<li>Shelves</li>");
    res.write("</ul>");
    res.write(
      '<p>Explore our <a href="/products">products</a> page to see all available items.</p>',
    );
    res.write(
      '<p>Use the <a href="/product?id=1">product details</a> page to get more information about specific items.</p>',
    );
    res.write(
      '<p>Need more information? Visit our <a href="/info">Info</a> page.</p>',
    );
    res.write(
      "<p>Details about each furniture type can be found on the products page.</p>",
    );
    res.write(
      "<p>Find specific items using the product details page with the item's ID.</p>",
    );
    res.write(
      "<p>For additional resources and information, check out our Info page.</p>",
    );
    res.write(footer());
    res.end();
  }

    // --------- Products Page (List all products) ---------
  else if (path === "/products") {
    res.write(header());

    let content = "<h2>All Products</h2>";

    furniture.forEach((p) => {
      content += `
            <p>
                <strong>${p.name}</strong><br>
                Category: ${p.category}<br>
                Price: $${p.price}<br>
                Model: ${p.model}<br>
                Material: ${p.material}<br>
                Description: ${p.description}
                <p>Click <a href="/product?id=${p.id}">here</a> to view details.</p>
            </p>
        `;
    });

    res.write(content);
    res.write(footer());
    res.end();
  }

  // --------- Product Details Page (Query: id or category) ---------
  else if (path === "/product") {
    res.write(header());
    if (query.id) {
      const product = furniture.find((p) => p.id == query.id);
      if (product) {
        res.write(`<h2>${product.name}</h2>`);
        res.write(`<p>Category: ${product.category}</p>`);
        res.write(`<p>Price: $${product.price}</p>`);
        res.write(`<p>Model: ${product.model}</p>`);
        res.write(`<p>Material: ${product.material}</p>`);
        res.write(`<p>Description: ${product.description}</p>`);
      } else {
        res.write("<p>Product not found.</p>");
      }
    } else if (query.category) {
      const filtered = furniture.filter(
        (p) => p.category.toLowerCase() === query.category.toLowerCase(),
      );
      if (filtered.length > 0) {
        res.write(`<h2>Products in category: ${query.category}</h2><ul>`);
        filtered.forEach((p) =>
          res.write(
            `<li>${p.name} - $${p.price} - ${p.model} - ${p.material} - ${p.description}</li>`,
          ),
        );
        res.write("</ul>");
      } else {
        res.write("<p>No products found in this category.</p>");
      }
    } else {
      res.write("<p>Please provide a valid query: ?id= or ?category=</p>");
    }
    res.write(footer());
    res.end();
  }

  else if (["/about", "/contact", "/review", "/info"].includes(path)) {
    let fileName = path.substring(1); // remove leading '/'

    if (fileName === "info") {
      fileName = "content.txt"; // TXT file
    } else {
      fileName += ".html"; // append .html for other pages
    }

    const filePath = pathModule.join(__dirname, "pages", fileName);

    fs.readFile(filePath, "utf-8", (err, data) => {
      res.write(header());
      if (err) {
        res.write("<p>Error loading page.</p>");
      } else {
        if (fileName.endsWith(".txt")) {
          res.write(`<pre>${data}</pre>`);
        } else {
          res.write(data);
        }
      }
      res.write(footer());
      res.end();
    });
  }

  else {
    res.write(header("error"));
    res.write("<h2>404 - Page not found</h2>");
    res.write(footer());
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
