import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../assests/signup.png";
import { useUserAuth } from "../UserAuth";
import axios from "axios";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [standard, setStandard] = useState("");
  const [acceptTnC, setAcceptTnC] = useState(false);
  const [institute, setInstitute] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setcnfPassword] = useState("");

  const [errors, setErrors] = useState({});

  const { user, signUp } = useUserAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const validateF1Fields = () => {
    let newErrors = { ...errors }; // Start with current errors

    // Validation for First Name
    if (!firstName) {
      newErrors.firstName = "First Name is required";
    } else {
      delete newErrors.firstName;
    }

    // Validation for Last Name
    if (!lastName) {
      newErrors.lastName = "Last Name is required";
    } else {
      delete newErrors.lastName;
    }

    // Basic Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    } else {
      delete newErrors.email;
    }

    // Basic Username Validation
    if (!userName) {
      newErrors.userName = "Username is required";
    } else if (userName.length < 4) {
      newErrors.userName = "Username must be at least 4 characters long";
    } else {
      delete newErrors.userName;
    }

    // Password Length Validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    } else {
      delete newErrors.password;
    }

    // Password Confirmation Validation
    if (cnfPassword !== password) {
      newErrors.cnfPassword = "Passwords do not match";
    } else {
      delete newErrors.cnfPassword;
    }

    setErrors(newErrors); // Update the state with the new or updated errors
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const validateF2Fields = () => {
    let newErrors = { ...errors }; // Start with current errors

    // Validation for Gender
    if (!gender) {
      newErrors.gender = "Gender selection is required";
    } else {
      delete newErrors.gender;
    }

    // Validation for Standard
    if (!standard) {
      newErrors.standard = "Academic standard is required";
    } else {
      delete newErrors.standard;
    }

    // Validation for Institute
    if (!institute) {
      newErrors.institute = "Institute name is required";
    } else {
      delete newErrors.institute;
    }

    // Validation for Accepting Terms and Conditions
    if (!acceptTnC) {
      newErrors.acceptTnC = "You must agree to the terms and conditions";
    } else {
      delete newErrors.acceptTnC;
    }

    setErrors(newErrors); // Update the state with the new or updated errors

    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (step == 1 && validateF1Fields()) {
      nextStep();
    } else if (step == 2 && validateF2Fields()) {
      try {
        await signUp(email, password);
        navigate("/dashboard");
        const data_obj = {
          uid: user.uid,
          username: userName,
          email: email,
          firstname: firstName,
          lastname: lastName,
          gender: gender,
          standard: standard,
          institute: institute,
        };

        const resp = await axios.post("http://localhost:5000/users", data_obj);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="h-20"></div> {/* Use standard spacing units */}
      <div className="flex items-center justify-end w-full max-w-4xl mx-auto rounded-xl pe-5 pb-2">
        {/* Display error messages here if any */}
        {Object.keys(errors).length > 0 && (
          <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-xl">
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-center pb-10">
        <div className="flex min-h-[60vh] border-[2.5px] shadow-2xl w-full max-w-4xl mx-auto border-black rounded-xl">
          <section className="w-1/2 border-r-[2.5px] border-black">
            {/* slider component will go here */}
            <img
              src={signupImg}
              alt=""
              className="object-cover w-full h-full"
            />
          </section>
          <section className="w-1/2 p-8">
            {step === 1 && (
              // Step 1 form inputs
              <div>
                <h2 className="text-3xl font-semibold text-center mb-8">
                  <span role="img" aria-label="party popper">
                    🎉
                  </span>
                  <span className="border-b-2 border-gray-  00">
                    Create Your Account Now
                  </span>
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    className="border w-full p-2 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="border w-full p-2 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter password"
                      className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm password"
                      className="border p-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      onChange={(e) => setcnfPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      to="/login"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Already have an account? Login
                    </Link>
                    <button
                      type="submit"
                      className="bg-black font-medium rounded-full text-sm px-5 py-2 text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            )}
            {step === 2 && (
              <div>
                <form onSubmit={handleSubmit}>
                  <h2 className="text-3xl font-semibold text-center mb-8">
                    <span role="img" aria-label="party popper">
                      🎉
                    </span>
                    <span className="border-b-2 border-gray-  00">
                      You are One step to go{" "}
                    </span>
                  </h2>
                  <label className="font-bold "> What is your Gender :</label>
                  <div className="flex justify-around my-2  ">
                    <div
                      className={`${
                        gender === "male" ? "bg-gray-300" : ""
                      }  rounded-full border-2  p-3`}
                      onClick={() => {
                        setGender("male");
                      }}
                    >
                      Male
                    </div>
                    <div
                      className={`${
                        gender === "female" ? "bg-gray-300" : ""
                      } rounded-full  border-2  p-3`}
                      onClick={() => {
                        setGender("female");
                      }}
                    >
                      Female
                    </div>
                    <div
                      className={`${
                        gender === "denied" ? "bg-gray-300" : ""
                      } rounded-full border-2 p-3`}
                      onClick={() => {
                        setGender("denied");
                      }}
                    >
                      Not Say
                    </div>
                  </div>
                  <label className="font-bold ">
                    {" "}
                    What is your current academic standard :
                  </label>
                  <div className="flex justify-around my-2  ">
                    <div
                      className={`${
                        standard === "10th" ? "bg-gray-300" : ""
                      }  rounded-full  border-2  p-3`}
                      onClick={() => {
                        setStandard("10th");
                      }}
                    >
                      10 th
                    </div>
                    <div
                      className={`${
                        standard === "ug" ? "bg-gray-300" : ""
                      } rounded-full  border-2  p-3`}
                      onClick={() => {
                        setStandard("ug");
                      }}
                    >
                      UG
                    </div>
                    <div
                      className={`${
                        standard === "grad" ? "bg-gray-300" : ""
                      } rounded-full  border-2  p-3`}
                      onClick={() => {
                        setStandard("grad");
                      }}
                    >
                      Graduate
                    </div>
                  </div>

                  <label className="font-bold mt-2 ">
                    {" "}
                    Where are you currently studying at :
                  </label>
                  <input
                    type="text"
                    id="insName"
                    placeholder="Enter Institute name"
                    className="border w-full p-2 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => setInstitute(e.target.value)}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="termsAndConditions"
                        className="mx-2"
                        name="checkbox"
                        value={acceptTnC}
                        onClick={() => setAcceptTnC(!acceptTnC)}
                      />
                      <label htmlFor="termsAndConditions">
                        Agree to our terms and conditions
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-around">
                    <button
                      type="button"
                      className="bg-black font-medium rounded-full text-sm px-5 py-2 text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      onClick={previousStep}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-black font-medium rounded-full text-sm px-5 py-2 text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
