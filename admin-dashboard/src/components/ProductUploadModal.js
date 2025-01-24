import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const PRODUCT_CATEGORIES = [
  'Electronics', 
  'Audio Devices', 
  'Accessories', 
  'Headphones', 
  'Speakers'
];

const PRICING_TYPES = [
  { value: 'fixed', label: 'Fixed Price' },
  { value: 'tiered', label: 'Tiered Pricing' },
  { value: 'dynamic', label: 'Dynamic Pricing' }
];

const DISCOUNT_TYPES = [
  { value: 'percentage', label: 'Percentage Discount' },
  { value: 'fixed', label: 'Fixed Amount Discount' }
];

function ProductUploadModal({ open, onClose, onUpload }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    basePrice: '',
    category: '',
    images: [],
    
    // Advanced Pricing Options
    pricingType: 'fixed',
    tierPricing: [{ minQuantity: 1, price: '' }],
    
    // Discount Options
    enableDiscount: false,
    discountType: 'percentage',
    discountValue: '',
    discountStartDate: '',
    discountEndDate: '',
    
    // Inventory Management
    stockQuantity: '',
    lowStockThreshold: '',
    
    // Variant Options
    enableVariants: false,
    variants: [{ 
      name: '', 
      additionalPrice: 0, 
      stockQuantity: '' 
    }]
  });

  const fileInputRef = useRef(null);

  const handleInputChange = (e, section = null, index = null) => {
    const { name, value } = e.target;
    
    // Handle nested state updates
    if (section === 'tierPricing') {
      const updatedTierPricing = [...productData.tierPricing];
      updatedTierPricing[index][name] = value;
      setProductData(prev => ({
        ...prev,
        tierPricing: updatedTierPricing
      }));
    } else if (section === 'variants') {
      const updatedVariants = [...productData.variants];
      updatedVariants[index][name] = value;
      setProductData(prev => ({
        ...prev,
        variants: updatedVariants
      }));
    } else {
      setProductData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setProductData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleRemoveImage = (index) => {
    setProductData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addTierPricing = () => {
    setProductData(prev => ({
      ...prev,
      tierPricing: [
        ...prev.tierPricing, 
        { minQuantity: '', price: '' }
      ]
    }));
  };

  const addVariant = () => {
    setProductData(prev => ({
      ...prev,
      variants: [
        ...prev.variants, 
        { name: '', additionalPrice: 0, stockQuantity: '' }
      ]
    }));
  };

  const handleSubmit = () => {
    // Validate form data
    if (!productData.name || !productData.basePrice || !productData.category) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare form data for upload
    const formData = new FormData();
    
    // Basic Product Info
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('basePrice', productData.basePrice);
    formData.append('category', productData.category);
    
    // Pricing Details
    formData.append('pricingType', productData.pricingType);
    formData.append('tierPricing', JSON.stringify(productData.tierPricing));
    
    // Discount Details
    if (productData.enableDiscount) {
      formData.append('discountType', productData.discountType);
      formData.append('discountValue', productData.discountValue);
      formData.append('discountStartDate', productData.discountStartDate);
      formData.append('discountEndDate', productData.discountEndDate);
    }
    
    // Inventory Management
    formData.append('stockQuantity', productData.stockQuantity);
    formData.append('lowStockThreshold', productData.lowStockThreshold);
    
    // Variants
    if (productData.enableVariants) {
      formData.append('variants', JSON.stringify(productData.variants));
    }
    
    // Append images
    productData.images.forEach((img, index) => {
      formData.append(`images`, img.file);
    });

    // Call upload function
    onUpload(formData);

    // Reset form
    setProductData({
      name: '',
      description: '',
      basePrice: '',
      category: '',
      images: [],
      pricingType: 'fixed',
      tierPricing: [{ minQuantity: 1, price: '' }],
      enableDiscount: false,
      discountType: 'percentage',
      discountValue: '',
      discountStartDate: '',
      discountEndDate: '',
      stockQuantity: '',
      lowStockThreshold: '',
      enableVariants: false,
      variants: [{ 
        name: '', 
        additionalPrice: 0, 
        stockQuantity: '' 
      }]
    });

    // Close modal
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Upload New Product
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Left Column: Basic Product Info */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              margin="normal"
            />
            
            <TextField
              fullWidth
              label="Base Price"
              name="basePrice"
              type="number"
              value={productData.basePrice}
              onChange={handleInputChange}
              required
              margin="normal"
              InputProps={{
                startAdornment: '$'
              }}
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={productData.category}
                label="Category"
                onChange={handleInputChange}
                required
              >
                {PRODUCT_CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Right Column: Advanced Options */}
          <Grid item xs={12} md={6}>
            {/* Pricing Type */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Pricing Type</InputLabel>
              <Select
                name="pricingType"
                value={productData.pricingType}
                label="Pricing Type"
                onChange={handleInputChange}
              >
                {PRICING_TYPES.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Tiered Pricing */}
            {productData.pricingType === 'tiered' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1">
                  Tier Pricing 
                  <Tooltip title="Set different prices based on quantity">
                    <InfoIcon fontSize="small" sx={{ ml: 1 }} />
                  </Tooltip>
                </Typography>
                {productData.tierPricing.map((tier, index) => (
                  <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Min Quantity"
                        name="minQuantity"
                        type="number"
                        value={tier.minQuantity}
                        onChange={(e) => handleInputChange(e, 'tierPricing', index)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Price"
                        name="price"
                        type="number"
                        value={tier.price}
                        onChange={(e) => handleInputChange(e, 'tierPricing', index)}
                        InputProps={{
                          startAdornment: '$'
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={addTierPricing}
                  sx={{ mt: 1 }}
                >
                  Add Tier
                </Button>
              </Box>
            )}

            {/* Discount Options */}
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Discount Options</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productData.enableDiscount}
                      onChange={(e) => setProductData(prev => ({
                        ...prev,
                        enableDiscount: e.target.checked
                      }))}
                    />
                  }
                  label="Enable Discount"
                />

                {productData.enableDiscount && (
                  <>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Discount Type</InputLabel>
                      <Select
                        name="discountType"
                        value={productData.discountType}
                        label="Discount Type"
                        onChange={handleInputChange}
                      >
                        {DISCOUNT_TYPES.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      label="Discount Value"
                      name="discountValue"
                      type="number"
                      value={productData.discountValue}
                      onChange={handleInputChange}
                      margin="normal"
                      InputProps={{
                        endAdornment: productData.discountType === 'percentage' ? '%' : '$'
                      }}
                    />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Discount Start Date"
                          name="discountStartDate"
                          type="date"
                          value={productData.discountStartDate}
                          onChange={handleInputChange}
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          label="Discount End Date"
                          name="discountEndDate"
                          type="date"
                          value={productData.discountEndDate}
                          onChange={handleInputChange}
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Inventory Management */}
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Inventory Management</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  fullWidth
                  label="Total Stock Quantity"
                  name="stockQuantity"
                  type="number"
                  value={productData.stockQuantity}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Low Stock Threshold"
                  name="lowStockThreshold"
                  type="number"
                  value={productData.lowStockThreshold}
                  onChange={handleInputChange}
                  margin="normal"
                />
              </AccordionDetails>
            </Accordion>

            {/* Product Variants */}
            <Accordion sx={{ mt: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>Product Variants</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productData.enableVariants}
                      onChange={(e) => setProductData(prev => ({
                        ...prev,
                        enableVariants: e.target.checked
                      }))}
                    />
                  }
                  label="Enable Variants"
                />

                {productData.enableVariants && (
                  <>
                    {productData.variants.map((variant, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              label="Variant Name"
                              name="name"
                              value={variant.name}
                              onChange={(e) => handleInputChange(e, 'variants', index)}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              label="Additional Price"
                              name="additionalPrice"
                              type="number"
                              value={variant.additionalPrice}
                              onChange={(e) => handleInputChange(e, 'variants', index)}
                              InputProps={{
                                startAdornment: '$'
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              fullWidth
                              label="Stock Quantity"
                              name="stockQuantity"
                              type="number"
                              value={variant.stockQuantity}
                              onChange={(e) => handleInputChange(e, 'variants', index)}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={addVariant}
                    >
                      Add Variant
                    </Button>
                  </>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Image Upload */}
            <Box 
              sx={{ 
                border: '2px dashed', 
                borderColor: 'grey.300', 
                borderRadius: 2, 
                p: 2, 
                textAlign: 'center' 
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <Button
                variant="contained"
                startIcon={<CloudUploadIcon />}
                onClick={() => fileInputRef.current.click()}
              >
                Upload Images
              </Button>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {productData.images.length > 0 
                  ? 'Uploaded Images' 
                  : 'No images uploaded'}
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1, 
                  justifyContent: 'center', 
                  mt: 2 
                }}
              >
                {productData.images.map((image, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      position: 'relative', 
                      width: 100, 
                      height: 100 
                    }}
                  >
                    <img 
                      src={image.preview} 
                      alt={`Product ${index + 1}`} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: 8 
                      }} 
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        bgcolor: 'error.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'error.dark'
                        }
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button 
          onClick={onClose} 
          color="secondary"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary"
          variant="contained"
          disabled={!productData.name || !productData.basePrice || !productData.category}
        >
          Upload Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductUploadModal;
