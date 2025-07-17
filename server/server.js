// Importing express module
const express = require('express');
const cors = require('cors'); // Import the CORS package
const app = express();
 
// Set the port for the server to run
const PORT = 3001;
 
// Use the CORS middleware to allow requests from any site
app.use(cors());
 
// Use express's built-in middleware to parse JSON request bodies
app.use(express.json());
 
// Dummy products stored in memory
let products = [
  { id: 1, name: 'T-Shirt', price: 400, description: 'Men Solid Mandarin Collar Cotton Blend Black T-Shirt', imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/y/u/1/s-tblhn-dp1-d144-tripr-original-imahcyscfswuhrk9.jpeg?q=70&crop=false' },
  { id: 2, name: 'Formal Shirt', price: 500, description: 'Men Regular Fit Solid Spread Collar', imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/shirt/j/f/y/xl-jypt-dhaduk-original-imah7u6ayzwmzxpe.jpeg?q=70&crop=false' },
  { id: 3, name: 'Jeans', price: 800, description: 'Men Slim Mid Rise Blue Jeans', imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/jean/t/a/8/-original-imaggyeuf7ykkhgz.jpeg?q=70&crop=false' },
  { id: 4, name: 'Formal Trousers', price: 400, description: 'Men Regular Fit Light Blue Viscose Rayon Trousers', imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/trouser/k/w/7/30-kctr-myn-frml-99-pcbl-fubar-original-imagxkrhrgfbts7r.jpeg?q=70&crop=false' },
  { id: 5, name: 'Suits', price: 3500, description: 'Men Single Breasted Solid Suit', imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/suit/x/o/8/44-black-collection-humjoli-original-imah45jvsmkpp8tk.jpeg?q=70&crop=false' },
  { id: 5, name: 'Kurta', price: 1000, description: 'Men Jacquard Kurta Set', imageUrl: 'https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/o/x/k/s-jacquard-kurta-pajama-set-valaki-original-imah2yawgmvtbgfv.jpeg?q=70&crop=false' }
 ];
// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});
 
// Get a product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.json(product);
});
 
// Add a new product
app.post('/products', (req, res) => {
  const { name, description, imageUrl, price } = req.body;
 
  // Generate a new ID for the product
  const newProduct = {
    id: products.length + 1, // In a real scenario, we'd generate IDs differently
    name,
    price,
    description,
    imageUrl
  };
 
  products.push(newProduct);
  res.status(201).json(newProduct);
});
 
// Update a product
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send('Product not found');
  }
 
  const { name, description, imageUrl } = req.body;
  product.name = name || product.name;
  product.description = description || product.description;
  product.imageUrl = imageUrl || product.imageUrl;
 
  res.json(product);
});
 
// Delete a product
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send('Product not found');
  }
 
  products.splice(index, 1);
  res.status(204).send();  // No content to return
});
 
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 