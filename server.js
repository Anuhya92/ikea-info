const http = require("http");
const fs = require("fs");
const pathModule = require("path");
const furniture = require("./data/furniture");

const PORT = 3001;

// Header function
function header() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>IKEA Furniture Info</title>
    </head>
    <body>
  
    <header>
        <h1>🛋️ IKEA Furniture Info </h1>
        <nav>
            <a href="/"> Home 🏡 </a> | 
            <a href="/furniture"> Furniture 🪑 </a> | 
            <a href="/products"> Products 📦 </a> | 
            <a href="/about"> About ℹ</a> | 
            <a href="/contact"> Contact 📧</a> | 
            <a href="/review"> Review ⭐</a> | 
            <a href="/info"> Info 📄</a> |
            <a href="/product?id=1"> Product Details 📁</a>
        </nav>
    </header>
    `;
}

// Footer function
function footer() {
  return `
    <footer>
        <p>© 2026 IKEA Info Site | Made with ❤️</p>
    </footer>
    </body>
    </html>
    `;
}
// Create HTTP server
const server = http.createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);// Parse the URL
  const path = myURL.pathname;
  const query = Object.fromEntries(myURL.searchParams);// Get query parameters

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  // --------- Home Page ---------
  if (path === "/") {
    res.write(header());
    res.write("<h2>👋 Welcome to IKEA Furniture Info</h2>");
    res.write("<p><strong> Available Routes:</strong></p>");
    res.write("<ul>");
    res.write("<li> View all furniture categories - <a href='/furniture'>/furniture</a></li>");
    res.write("<li> View all products - <a href='/products'>/products</a></li>");
    res.write("<li> View product details by ID - <a href='/product?id=1'>/product?id=1</a></li>");
    res.write("<li> View products by category - <a href='/product?category=table'>/product?category=table</a></li>");
    res.write("<li> Learn more about us - <a href='/about'>/about</a></li>");
    res.write("<li> Contact us - <a href='/contact'>/contact</a></li>");
    res.write("<li> Read customer reviews - <a href='/review'>/review</a></li>");
    res.write("<li> Additional information - <a href='/info'>/info</a></li>");
    res.write("</ul>");
    
    res.write("<h3>🚀 Get Started</h3>");
    res.write(
      '<p> Start by exploring our <a href="/furniture">furniture collection</a> or checking out all our <a href="/products">products</a>.</p>',
    );
    res.write(
      '<p> For specific product details, use the <a href="/product?id=1">product page</a> with the desired ID or category.</p>',
    );
    res.write(
      '<p> Need more information about us? Visit our <a href="/about">About</a> page or <a href="/contact">Contact</a> us directly.</p>',
    );
    res.write(
      '<p> Don\'t forget to read our <a href="/review">customer reviews</a> to see what others think!</p>',
    );
    res.write(
      '<p> For additional resources, check out our <a href="/info">Info</a> page.</p>',
    );
    
    res.write("<h3>😊 Happy Browsing!</h3>");
    res.write(
      "<p> We hope you find the perfect IKEA furniture for your needs.</p>",
    );
    res.write("<p> Use the navigation links above to explore more.</p>");

    res.write(
      "<p><em> Your one-stop source for IKEA furniture information!</em></p>",
    );
    res.write(
      "<p> Discover a wide range of IKEA furniture, from stylish beds to functional tables, all in one place.</p>",
    );
    res.write(footer("Home Page"));
    res.end();
  }

  // --------- Furniture Page  ---------
  else if (path === "/furniture") {   
    res.write(header());
    res.write("<h2> Our Furniture Collection</h2>");
    res.write("<p> We have beds, chairs, tables, and shelves.</p>");
    res.write("<ul>");
    res.write("<li> Beds - Comfortable sleeping solutions</li>");
    res.write("<li> Chairs - Stylish seating options</li>");
    res.write("<li> Tables - Functional dining and work surfaces</li>");
    res.write("<li> Shelves - Storage and display solutions</li>");
    res.write("</ul>");
    res.write(
      '<p> Explore our <a href="/products">products</a> page to see all available items.</p>',
    );
    res.write(
      '<p> Use the <a href="/product?id=1">product details</a> page to get more information about specific items.</p>',
    );
    res.write(
      '<p> Need more information? Visit our <a href="/info">Info</a> page.</p>',
    );
    res.write(
      "<p> Details about each furniture type can be found on the products page.</p>",
    );
    res.write(
      "<p> Find specific items using the product details page with the item's ID.</p>",
    );
    res.write(
      "<p> For additional resources and information, check out our Info page.</p>",
    );
    res.write(footer());
    res.end();
  }

    // --------- Products Page (List all products) ---------
  else if (path === "/products") {
    res.write(header());

    let content = "<h2>📦 All Products</h2>";
    content += `<p> Browse our complete collection of ${furniture.length} IKEA furniture items!</p>`;
   // Generate product listings
    furniture.forEach((p) => {
      content += `
            <p style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;">
                <strong> ${p.name}</strong><br>
                 Category: ${p.category}<br>
                 Price: $${p.price}<br>
                 Model: ${p.model}<br>
                 Material: ${p.material}<br>
                 Description: ${p.description}
                <p> Click <a href="/product?id=${p.id}">here</a> to view full details.</p>
            </p>
        `;
    });

    res.write(content);
    res.write(footer());
    res.end();
  }

  else if (path === "/product") {
    res.write(header());
    if (query.id) {
      const product = furniture.find((p) => p.id == query.id);
      if (product) {
        res.write(`<h2> ${product.name}</h2>`);
        res.write(`<p> <strong>Category:</strong> ${product.category}</p>`);
        res.write(`<p> <strong>Price:</strong> $${product.price}</p>`);
        res.write(`<p> <strong>Model:</strong> ${product.model}</p>`);
        res.write(`<p> <strong>Material:</strong> ${product.material}</p>`);
        res.write(`<p> <strong>Description:</strong> ${product.description}</p>`);
        res.write(`<p>⬅️ <a href="/products">Back to all products</a></p>`);
      } else {
        res.write("<p> Product not found.</p>");
        res.write("<p>🔙 <a href='/products'>Return to products page</a></p>");
      }
    } else if (query.category) {
      const filtered = furniture.filter(
        (p) => p.category.toLowerCase() === query.category.toLowerCase(),
      );
      if (filtered.length > 0) {
        res.write(`<h2> Products in category: ${query.category}</h2>`);
        res.write(`<p> Found ${filtered.length} product(s)</p>`);
        res.write("<ul>");
        filtered.forEach((p) =>
          res.write(
            `<li> ${p.name} - $${p.price} - ${p.model} - ${p.material} - ${p.description} 
            <a href="/product?id=${p.id}"> Details</a></li>`,
          ),
        );
        res.write("</ul>");
      } else {
        res.write("<p> No products found in this category.</p>");
        res.write("<p>🔙 <a href='/furniture'>View all categories</a></p>");
      }
    } else {
      res.write("<h2> Product Search</h2>");
      res.write("<p> Please provide a valid query:</p>");
      res.write("<ul>");
      res.write("<li> Search by ID: <code>?id=1</code></li>");
      res.write("<li> Search by category: <code>?category=table</code></li>");
      res.write("</ul>");
      res.write("<p> <a href='/products'>View all products</a></p>");
    }
    res.write(footer());
    res.end();
  }
// --------- Static Pages (About, Contact, Review, Info) ---------
  else if (["/about", "/contact", "/review", "/info"].includes(path)) {
    let fileName = path.substring(1); 
    if (fileName === "info") {
      fileName = "content.txt";
    } else {
      fileName += ".html"; 
    }

    const filePath = pathModule.join(__dirname, "pages", fileName);

    fs.readFile(filePath, "utf-8", (err, data) => {
      res.write(header());
      if (err) {
        res.write("<p> Error loading page.</p>");
        res.write("<p>🔙 <a href='/'>Return to home page</a></p>");
      } else {
        if (fileName.endsWith(".txt")) {
          res.write("<h2> Information</h2>");
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
    res.write("<h2> 404 - Page not found</h2>");
    res.write("<p> Sorry, the page you're looking for doesn't exist.</p>");
    res.write("<p> <a href='/'>Go back to home page</a></p>");
    res.write(footer());
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);

});