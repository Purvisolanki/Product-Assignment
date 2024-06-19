import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ProductContext } from '../context/ProductContext';
import MenuItem from '@mui/material/MenuItem';

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  price: Yup.number()
    .integer('Price must be an integer')
    .required('Price is required')
    .positive('Price must be positive'),
  category: Yup.string()
    .min(3, 'Category must be at least 3 characters')
    .required('Category is required'),
  description: Yup.string()
    .min(3, 'Description must be at least 3 characters')
    .required('Description is required'),
  image: Yup.string().required('Image is required'),
});

const ProductFormDialog = ({ open, handleClose, product, onSubmit }) => {
  const { categories, deleteProduct } = useContext(ProductContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      category: '',
      description: '',
      image: ''
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      onSubmit(values);
      handleClose();
    },
  });

  useEffect(() => {
    if (product) {
      formik.setValues(product);
    } else {
      formik.resetForm();
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formik.values.image) {
      formik.setFieldTouched('image', true);
      formik.validateField('image');
    }
    formik.handleSubmit();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(product.id);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{product ? 'Update Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            {...formik.getFieldProps('title')}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            {...formik.getFieldProps('price')}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            select
            fullWidth
            {...formik.getFieldProps('category')}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            {...formik.getFieldProps('description')}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Choose Picture
            </Button>
          </label>
          {formik.touched.image && formik.errors.image && (
            <div style={{ color: 'red', marginTop: '10px' }}>{formik.errors.image}</div>
          )}
          {formik.values.image && (
            <img
              src={formik.values.image}
              alt="Preview"
              style={{ width: '100%', marginTop: '10px' }}
            />
          )}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="button" onClick={handleSubmit}>{product ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
