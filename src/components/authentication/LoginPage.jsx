import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login } from "../../services/loginService";

const LoginPage = () => {
  const [loginError, setLoginError] = useState("");

  const schema = z.object({
    email: z.string().email({ message: "Please write a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters or more" }),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  // Login() is a service function I made that controls the post request. This was doen to keep the code clean.
  const submitForm = async (formData) => {
    try {
      const response = await Login(formData);
      localStorage.setItem("token", response.data.token);
      setLoginError(false); // This is to remove the error message once the user corrects its. Otherwise it will stay there forever.
      window.location = "/"; // This takes the user to homepage once successful login occurs. This method does a re-render as opposed to useNavigate which just sends the user to the page. Here you can do many things i.e. welcome page etc..
    } catch (error) {
      if (error.response.status === 400)
        setLoginError(error.response.data.message);
    }
  };

  return (
    <section className="align_center form_page">
      <form
        action="POST"
        className="authentication_form"
        onSubmit={handleSubmit(submitForm)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form_text_input"
              placeholder="Enter Email Address"
              id="email"
              {...register("email")}
            />
            {formState.errors.email && (
              <em className="form_error">{formState.errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form_text_input"
              placeholder="Enter Your Password"
              id="password"
              {...register("password")}
            />
            {formState.errors.password && (
              <em className="form_error">
                {formState.errors.password.message}
              </em>
            )}
            {loginError && <em className="form_error">{loginError}</em>}
          </div>

          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
