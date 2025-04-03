/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userAction";
import hcltechLogo from '../../assets/hcltech.png';
import { handleLoginValidation } from "../validations";

export interface User{  
  id: number,
  name: string
}

const Login: React.FC = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { isDataLoaded, error } = useSelector((state: any) => state.user);
 const logIntoUser = (values: any) => {
   dispatch(loginUser(values));
 };
 useEffect(() => {
   if (isDataLoaded && !error) {
     toast.success("Login successful!", {
       autoClose: 3000,
       position: "top-center",
     });
     alert("Login successfull!")
     navigate("/cab");
   } else if (error) {
     toast.error("Invalid credentials", {
       autoClose: 2000,
       position: "top-center",
     });
   }
 }, [isDataLoaded, error, navigate]);
 return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
<div className="flex w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
<div className="w-1/2 flex items-center justify-center p-5 border-r">
<img src={hcltechLogo} alt="HCLTech Logo" className="h-8 w-auto text-white fill-current" /></div>
<div className="w-1/2 p-8">
<h2 className="text-xl font-bold text-center mb-6">Login</h2>
<Formik
           initialValues={{ email: "", password: "" }}
           validationSchema={handleLoginValidation}
           onSubmit={logIntoUser}
>
           {({ isSubmitting }) => (
<Form className="space-y-6">
<div>
<label className="block text-sm font-medium mb-1">Email<span className="text-red-500">*</span></label>
<Field
                   type="email"
                   name="email"
                   className="w-full p-3 rounded bg-gray-100 border border-gray-300"
                 />
<ErrorMessage
                   name="email"
                   component="div"
                   className="text-red-500 text-sm mt-1"
                 />
</div>
<div>
<label className="block text-sm font-medium mb-1">Password<span className="text-red-500">*</span></label>
<Field
                   type="password"
                   name="password"
                   className="w-full p-3 rounded bg-gray-100 border border-gray-300"
                 />
<ErrorMessage
                   name="password"
                   component="div"
                   className="text-red-500 text-sm mt-1"
                 />
</div>
<button
                 type="submit"
                 disabled={isSubmitting}
                 className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-500"
>
                 Log In
</button>
<ToastContainer />
<p className="text-center text-sm mt-4">
                 Not an existing user?{" "}
<button
                   type="button"
                   onClick={() => navigate("/Register")}
                   className="underline text-blue-600 hover:text-blue-800"
>
                   Register
</button>
</p>
</Form>
           )}
</Formik>
</div>
</div>
</div>
 );
};
export default Login;