import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useUserAuth } from "../UserAuth";
import Navbar from "../components/Navbar";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, user } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  return (
    <>
      <Navbar />
      <div className="my-10 justify-center items-center grid ">
        <h1 className="font-bold text-3xl h-10">Get started for free </h1>
        <br />
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <div className="gap-2">
            <span className="font-semibold my-2">Email</span>
            <br />
            <input
              id="email"
              className="my-2 w-80 border border-gray-500 p-1 rounded-lg"
              placeholder="   Enter email address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="gap-2">
            <span className="font-semibold my-2">Password</span>
            <br />
            <input
              id="password"
              className="my-2 w-80 border border-gray-500 p-1 rounded-lg"
              placeholder="  Enter your password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="uppercase text-white bg-black rounded-lg w-80 p-3 my-7"
          >
            Sign UP
          </button>
          <p>
            Already have an account?{" "}
            <Link className="underline font-semibold" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
