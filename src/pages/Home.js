import React, { useContext, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ProductContext } from '../context/ProductContext';
import ProductFormDialog from '../components/ProductFormDialog';
import Divider from '@mui/material/Divider';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#000',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Item1 = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    searchQuery,
    setSearchQuery
  } = useContext(ProductContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortOrder, setSortOrder] = useState('none');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, selectedPriceRange, sortOrder, products, searchQuery]);

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedPriceRange === 'under10') {
      filtered = filtered.filter(product => product.price < 10);
    } else if (selectedPriceRange === '10to50') {
      filtered = filtered.filter(product => product.price >= 10 && product.price <= 50);
    } else if (selectedPriceRange === 'above50') {
      filtered = filtered.filter(product => product.price > 50);
    }

    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddProductClick = () => {
    setCurrentProduct(null);
    setDialogOpen(true);
  };

  const handleUpdateProductClick = (product) => {
    setCurrentProduct(product);
    setDialogOpen(true);
  };

  const handleDeleteProductClick = (productId) => {
    deleteProduct(productId);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogSubmit = (product) => {
    if (currentProduct) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
    setDialogOpen(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, paddingTop: '5%' }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={16}>
            <Item sx={{ color: 'white' }}>😎 TAKE THE BEST AND LEAVE THE REST, AND WE PROVIDE ONLY THE BEST 😎</Item>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, padding: '4%', backgroundColor: '#EDEDED' }}>
        <Typography>FILTERS</Typography>
        <Grid container spacing={2} >
          <Grid item xs={6} md={4}>
            <Item1>
              <Typography>FILTER BY CATEGORY</Typography>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                fullWidth
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </Item1>

            <Item1>
              <Divider variant="middle"  sx={{ padding: "5px" }} />
              <Typography>FILTER BY PRICE</Typography>
              <Select
                value={selectedPriceRange}
                onChange={handlePriceRangeChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                fullWidth
              >
                <MenuItem value="all">All Prices</MenuItem>
                <MenuItem value="under10">Under $10</MenuItem>
                <MenuItem value="10to50">$10 - $50</MenuItem>
                <MenuItem value="above50">Above $50</MenuItem>
              </Select>
            </Item1>

            <Item1>
              <Divider variant="middle"  sx={{ padding: "5px" }} />
              <Typography>FILTER BY BUDGET</Typography>
              <RadioGroup
                aria-label="budget"
                name="budget"
                value={sortOrder}
                onChange={handleSortOrderChange}
                defaultValue='lowToHigh'
              >
                <FormControlLabel value="lowToHigh" control={<Radio />} label="Low to High" />
                <FormControlLabel value="highToLow" control={<Radio />} label="High to Low" />
                <FormControlLabel value="none" control={<Radio />} label="None" />
              </RadioGroup>
            </Item1>

            <Item1>
              <Divider variant="middle"  sx={{ padding: "5px" }} />
              <Typography>SEARCH PRODUCTS</Typography>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                fullWidth
              />
            </Item1>

          </Grid>

          <Grid item xs={6} md={8}>
            <Card sx={{ maxWidth: 345, padding: '2%', marginLeft: "18px" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Add Product
                </Typography>
                <Button variant="contained" onClick={handleAddProductClick}>
                  Add Product
                </Button>
              </CardContent>
            </Card>
            <Grid container spacing={2} sx={{ padding: '2%' }}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <CardMedia
                      sx={{ paddingTop: '56.25%', objectFit: 'cover', objectPosition: "center" }}
                      image={product.image}
                      title={product.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{product.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleUpdateProductClick(product)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDeleteProductClick(product.id)}
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
      </Box>
      <ProductFormDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        product={currentProduct}
        onSubmit={handleDialogSubmit}
      />
    </>
  );
};

export default Home;
