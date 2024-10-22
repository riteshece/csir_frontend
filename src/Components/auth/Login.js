import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const err = Validation(values);
    // console.log("values", values);
    setErrors(err);
    // if (err.name === "" && err.email === "" && err.password === "") {
    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if (res.data.message === "Login successful") {
          navigate("/section1");
        } else {
          alert("No record existed");
        }
      })
      .catch((err) => console.log(err));

    // }
  };

  return (
    <div
      className="flex justify-center items-center bg-secondary bg-gradient h-screen bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20211108/pngtree-abstract-blue-plain-background-with-modern-style-and-dynamic-lines-image_915412.png')",
      }}
    >
      <div className="bg-blue-00 p-16 w-[33%] border-slate-200 rounded-lg border-2">
        <h2 className="text-xl font-bold mb-3 justify-center">Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            {" "}
            {/* Increased the margin bottom to create space */}
            <label htmlFor="email" className="font-bold block mb-1">
              {" "}
              {/* Added block display */}
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-6">
            {" "}
            {/* Increased the margin bottom to create space */}
            <label htmlFor="password" className="font-bold block mb-1">
              {" "}
              {/* Added block display */}
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <div className="flex justify-center item-center">
            {" "}
            {/* Added margin bottom to create space */}
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-7 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <strong>Log in</strong>
            </button>
          </div>
          <p className="mb-6 text-center font-bold text-xl">
            {" "}
            {/* Added margin bottom and centered text */}
            You agree to our terms and policies?
          </p>
          <div className="flex justify-center">
            {" "}
            {/* Centered the link */}
            <Link
              to="/signup"
              className="btn btn-default border bg-blue-200 rounded-0 text-decoration-none inline-block hover:bg-blue-500 font-bold"
            >
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
