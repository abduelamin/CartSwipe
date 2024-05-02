import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  const schema = z.object({
    email: z
      .string()
      .email({ message: "Please write a valid email address" })
      .min(20, { message: "not enough chars" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 characters or more" }),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const submitForm = (formData) => {
    console.log(formData);
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
