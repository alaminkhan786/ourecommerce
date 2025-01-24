import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import * as ProductService from '../services/productService';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: ''
  });

  useEffect(() => {
    // Load products from localStorage on component mount
    const loadedProducts = ProductService.getProducts();
    setProducts(loadedProducts);
  }, []);

  const handleAddProduct = () => {
    // Validate inputs
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Add product using service
    const addedProduct = ProductService.addProduct({
      ...newProduct,
      price: parseFloat(newProduct.price),
      imageUrl: newProduct.imageUrl || 'https://via.placeholder.com/150'
    });

    // Update local state
    setProducts([...products, addedProduct]);
    
    // Reset form and close dialog
    setNewProduct({ name: '', price: '', description: '', imageUrl: '' });
    setOpenDialog(false);
  };

  const handleDeleteProduct = (productId) => {
    // Delete product using service
    ProductService.deleteProduct(productId);

    // Update local state
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Product Management
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ mb: 2 }}
          >
            Add New Product
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl || 'https://via.placeholder.com/150'}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Chip 
                      label={`$${product.price.toFixed(2)}`} 
                      color="primary" 
                      variant="outlined" 
                      sx={{ mt: 1 }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="secondary" 
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
                InputProps={{
                  startAdornment: '$'
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL (Optional)"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                placeholder="https://example.com/product-image.jpg"
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={handleAddProduct}
              >
                Add Product
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default ProductManagement;
