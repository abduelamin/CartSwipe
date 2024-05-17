// Add validation reacthook form

import "./SignupPage.css";
import user from "../../assets/user.webp";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../../services/userServices.JS";

const SignupPage = () => {
  const [pic, setPic] = useState(null);
  const [formError, setFormError] = useState("");

  const schema = z
    .object({
      name: z.string().min(4),
      email: z
        .string()
        .email({ message: "Please write a valid email address" }),
      password: z
        .string()
        .min(8, { message: "Must contain a minimum of 8 characters" }),
    })
    .refine((data) => data.password !== data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // Come back to this because error handling is not working well
  const submitForm = async (formData) => {
    try {
      await signUp(formData, pic);
    } catch (err) {
      if (err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  const { register, formState, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(submitForm)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={pic ? URL.createObjectURL(pic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            {...register("profileImage")}
            type="file"
            id="file-ip-1"
            className="image_input"
            onChange={(e) => setPic(e.target.files[0])}
          />
        </div>

        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              {...register("name")}
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              {...register("email")}
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              {...register("password")}
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
            />
            {formState.errors.password ? (
              <em>{formState.errors.password.message}</em>
            ) : null}
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              {...register("confirmPassword")}
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
            />
            {formState.errors.confirmPassword ? (
              <em>{formState.errors.confirmPassword.message}</em>
            ) : null}
          </div>

          <div className="signup_textares_section">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              {...register("deliveryAddress")}
              id="address"
              className="input_textarea"
              placeholder="Enter delivery address"
            />
          </div>
          {formError && <em className="form_error">{formError}</em>}
        </div>

        <button
          className="search_button form_submit"
          type="submit"
          onSubmit={handleSubmit(submitForm)}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;
