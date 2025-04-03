import * as yup from "yup";

// Validation schema for registration form
export const handleRegValidation = yup.object({
  name: yup.string().required("Enter full name").min(4).max(50),
  email: yup.string().email("Invalid email").required("Email required"),
  phno: yup.string().required("Phone number required"),
  password: yup.string().required("Enter password").min(8).max(20),
  address: yup.object({
    street: yup.string().required("Street required"),
    city: yup.string().required("City required"),
    state: yup.string().required("State required"),
    zip: yup.string().required("ZIP code required")
  }).required("Address required")
});

// Validation schema for login form
export const handleLoginValidation = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

// Validation schema for cab request form
export const handleCabValidation = yup.object().shape({
  pickupLocation: yup.string()
    .required('Pickup Location is required'),
  date: yup.date()
    .required('Date is required')
    .typeError('Invalid date format'),
  startTime: yup.string()
    .required('Start Time is required'),
  endTime: yup.string()
    .nullable(), // Assuming endTime can be empty
  reason: yup.string()
    .required('Reason is required'),
  cabType: yup.string()
    .required('Cab Type is required'),
  frequency: yup.string()
    .required('Frequency is required'),
  projectCode: yup.string()
    .required('Project Code is required'),
  approver: yup.string()
    .required('Approver is required')
});
