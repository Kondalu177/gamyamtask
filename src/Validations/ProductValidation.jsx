import * as Yup from "yup";
export const productValidationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  category: Yup.string().trim().required("Category is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .integer("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
});
