import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { StarIcon } from '@heroicons/react/20/solid';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  Select,
  MenuItem,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import { 
  Add as AddIcon, 
  Close as CloseIcon 
} from '@mui/icons-material';
import ProductUploadModal from '../admin-dashboard/src/components/ProductUploadModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openProductUpload, setOpenProductUpload] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('ecommerce_products') || '[]');
    setProducts(storedProducts);
  }, []);

  const handleProductUpload = (newProduct) => {
    const updatedProducts = [...products, {
      ...newProduct,
      id: Date.now().toString(), // Generate unique ID
      imageUrl: newProduct.imageUrl || 'https://via.placeholder.com/300'
    }];
    
    setProducts(updatedProducts);
    localStorage.setItem('ecommerce_products', JSON.stringify(updatedProducts));
    setOpenProductUpload(false);
  };

  const categories = [...new Set(products.map(product => product.category || 'Electronics'))];

  const filteredProducts = products.filter(product => 
    (!selectedCategory || product.category === selectedCategory) &&
    (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => {
    switch(sortBy) {
      case 'priceAsc': return a.price - b.price;
      case 'priceDesc': return b.price - a.price;
      default: return 0;
    }
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 3 
      }}>
        <TextField
          label="Search Products"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '40%' }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            displayEmpty
            sx={{ width: '150px' }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            displayEmpty
            sx={{ width: '150px' }}
          >
            <MenuItem value="">Sort By</MenuItem>
            <MenuItem value="priceAsc">Price: Low to High</MenuItem>
            <MenuItem value="priceDesc">Price: High to Low</MenuItem>
          </Select>

          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setOpenProductUpload(true)}
            sx={{ 
              textTransform: 'none',
              borderRadius: 2 
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="250"
                image={product.imageUrl || 'https://via.placeholder.com/300'}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
                <Link to={`/product/${product.id}`}>
                  <Button size="small" color="secondary">
                    View Details
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Product Upload Modal */}
      <ProductUploadModal
        open={openProductUpload}
        onClose={() => setOpenProductUpload(false)}
        onUpload={handleProductUpload}
      />
    </Box>
  );
};

export default ProductList;
