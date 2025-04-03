import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { createNewUser } from "../redux/actions/userAction";
import { IUser, IField } from "../interface";
import { handleRegValidation } from "../validations";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
 const dispatch = useDispatch();
 const handleSubmit = (values: IUser) => {
   console.log(values);
   dispatch(createNewUser(values));
  navigate("/Login")
 };
 return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
<div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
<h2 className="text-2xl font-bold text-center mb-6">Register</h2>
<Formik
         initialValues={{
           name: "",
           email: "",
           phno: "",
           password: "",
           address: {
             street: "",
             city: "",
             state: "",
             zip: ""
           },
           role: ""
         }}
         onSubmit={(values: IUser) => {
           handleSubmit(values);
         }}
         validationSchema={handleRegValidation}
>
<Form className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<FieldBlock name="name" type="text" label="Full Name" />
<FieldBlock name="email" type="email" label="Email" />
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<FieldBlock name="phno" type="tel" label="Phone No." />
<FieldBlock name="password" type="password" label="Password" />
<FieldBlock name="role" type="role" label="Role" />
<FieldBlock name="empsapid" type="text" label="Emp SAPID" />
<FieldBlock name="rmsapid" type="text" label="RM SAPID" />
</div>
<fieldset className="space-y-4 p-4 border border-gray-300 rounded">
<legend className="font-bold text-lg">Address</legend>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<FieldBlock name="address.street" type="text" label="Street" />
<FieldBlock name="address.city" type="text" label="City" />
<FieldBlock name="address.state" type="text" label="State" />
<FieldBlock name="address.zip" type="text" label="ZIP Code" />
</div>
</fieldset>
<button
             type="submit"
             className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-500"
>
             Submit
</button>
<ToastContainer />
</Form>
</Formik>
</div>
</div>
 );
};
const FieldBlock = ({ name, type, label }: IField) => (
<div>
<label className="block mb-1">{label}<span className="text-red-500">*</span></label>
<Field
     name={name}
     type={type}
     className="w-full p-3 rounded bg-gray-100"
   />
<ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
</div>
);
export default Register;