import React, { useEffect, useState } from "react";
import {
  alpha,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddProduct from "./AddProduct";
import axios from "axios";
import { ToastContainer } from "react-toastify";
// Pop up Form fro add the product
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: "20px",
  },
  "& .MuiDialogActions-root": {
    padding: "15px",
  },
}));
function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isListView, setIsListView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = React.useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  // open close button for popup
  const handleClickOpen = () => {
    setEditProduct(null);
    setOpen(true);
  };
  const handleEditClick = (product) => {
    setEditProduct(product);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const itemsPerPage = 9;
  console.log(products);

  // Fetching the Product data
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Toggle button handling
  const handleToggle = () => {
    setIsListView((prev) => !prev);
  };
  // Filter products by Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);
  // Filtered products based on debounced term
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      ?.toLowerCase()
      .includes(debouncedTerm.toLowerCase());

    // const tagsMatch = product.tags?.some((tag) =>
    //   tag.toLowerCase().includes(debouncedTerm.toLowerCase())
    // ); || tagsMatch;

    return nameMatch;
  });

  // Calculate visible products for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Grid
        className=" flex items-center justify-center my-8 mx-[70px]"
        container
        spacing={2}
      >
        <Grid item>
          <TextField
            sx={{ width: 900 }}
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item md={2}>
          <Box
            onClick={handleToggle}
            sx={{
              border: "0.5px solid #b8b9bb",
              borderRadius: "3px",
              padding: "5px",
              cursor: "pointer",
            }}
          >
            {isListView ? <ViewModuleIcon /> : <FormatListBulletedIcon />}
          </Box>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleClickOpen}
          >
            + Add Product
          </Button>
        </Grid>
      </Grid>
      {isListView ? (
        <Grid className="items-center justify-center" container spacing={5}>
          {paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  width: 350,
                  display: "flex",
                  height: 160,
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography
                    className="!font-bold"
                    gutterBottom
                    component="div"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontWeight: "550" }}
                  >
                    {product.category}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {product.description}
                  </Typography>
                </CardContent>
                <Box className="flex mx-3 mb-3 justify-between">
                  <Typography className="!font-bold">
                    ₹ {product.price}
                  </Typography>
                  <Box className="flex ">
                    <Typography className="!font-bold">
                      {product.stock}
                    </Typography>
                    <EditIcon
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                      onClick={() => handleEditClick(product)}
                    />
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid className="items-center justify-center m-8" container spacing={5}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="!font-bold">Name</TableCell>
                  <TableCell align="center" className="!font-bold">
                    Description
                  </TableCell>
                  <TableCell className="!font-bold" align="center">
                    Category
                  </TableCell>
                  <TableCell className="!font-bold" align="center">
                    Price
                  </TableCell>
                  <TableCell className="!font-bold" align="center">
                    Stock
                  </TableCell>
                  <TableCell className="!font-bold" align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="left" width={250}>
                      {product.description}
                    </TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                    <TableCell align="center">{product.stock}</TableCell>
                    <TableCell align="center">
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEditClick(product)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4} mb={4}>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)} // total pages
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Pop up box  for product add */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {editProduct ? "Update Product" : "Add Product"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <AddProduct
            initialValues={editProduct}
            mode={editProduct ? "update" : "add"}
            handleClose={handleClose}
            setProducts={setProducts}
          />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}

export default Home;
