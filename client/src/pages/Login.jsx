import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, registerUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        await loginUser(form.email, form.password);
      } else {
        await registerUser(form.name, form.email, form.password);
      }
      navigate("/board");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <input name="name" placeholder="Name" onChange={handleChange} />
        )}
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">{isLoginMode ? "Login" : "Register"}</button>
        <p onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode
            ? "New here? Register"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default Login;
