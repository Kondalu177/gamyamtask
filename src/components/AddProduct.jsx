import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { productValidationSchema } from "../Validations/ProductValidation";
import { toast } from "react-toastify";
import axios from "axios";
import { useLocation } from "react-router-dom";

function AddProduct({ initialValues, setProducts, handleClose, mode = "add" }) {
  const location = useLocation();
  const product = location.state; // get product data
  console.log(initialValues);
  console.log("Editing Product:", product);
  const formik = useFormik({
    initialValues: {
      name: initialValues?.name || "",
      price: initialValues?.price || "",
      category: initialValues?.category || "",
      stock: initialValues?.stock || "",
      description: initialValues?.description || "",
    },
    enableReinitialize: true,
    validationSchema: productValidationSchema,

    onSubmit: (values, { resetForm }) => {
      const productData = {
        ...values,
        createdAt: new Date().toISOString(),
        isActive: true,
      };
      //   console.log(initialValues.id);
      if (mode === "update" && initialValues?.id) {
        // UPDATE existing product
        axios
          .put(
            `http://localhost:5000/products/${initialValues.id}`,
            productData
          )
          .then((res) => {
            console.log("Product updated:", res.data);
            setProducts((prev) =>
              prev.map((p) => (p.id === res.data.id ? res.data : p))
            );

            toast.success("Product Updated Successfully");
            resetForm();
            handleClose();
          })
          .catch((error) => {
            console.error("Error updating product:", error);
          });
      } else {
        // ADD new product
        console.log("hello");
        axios
          .post("http://localhost:5000/products", productData)
          .then((res) => {
            console.log("Product added:", res.data);
            setProducts((prev) => [...prev, res.data]);
            toast.success("Product Added Successfully");
            resetForm();
            handleClose();
          })
          .catch((error) => {
            console.error("Error adding product:", error);
          });
      }
    },
  });
  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          sx={{ my: 1 }}
          name="name"
          size="small"
          id="standard-basic"
          label="Name"
          variant="standard"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          sx={{ my: 1 }}
          size="small"
          name="price"
          id="standard-basic"
          label="Price"
          variant="standard"
          type="number"
          inputProps={{ min: 0 }}
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
          fullWidth
          sx={{ my: 1 }}
          size="small"
          name="category"
          id="standard-basic"
          label="Category"
          variant="standard"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          helperText={formik.touched.category && formik.errors.category}
        />
        <TextField
          fullWidth
          sx={{ my: 1 }}
          size="small"
          name="stock"
          id="standard-basic"
          label="Stock"
          variant="standard"
          type="number"
          inputProps={{ min: 0 }}
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
        />
        <TextField
          fullWidth
          sx={{ my: 1 }}
          size="small"
          id="standard-basic"
          name="description"
          label="Description"
          variant="standard"
          multiline
          rows={2}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: "10px" }}>
          <Button
            variant="contained"
            type="submit"
            sx={{ textTransform: "none" }}
          >
            {mode === "add" ? "Add Product" : "Update Product"}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AddProduct;
