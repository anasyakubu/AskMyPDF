// import React from "react";
import { Helmet } from "react-helmet";
import Nav from "../../Components/Nav";
import Footer from "../../Sections/Footer/Footer";
import RegisterForm from "../../Sections/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className="Register bg-gray-50">
      <Helmet>
        <title>Register ~ Daily Invoice</title>
      </Helmet>
      <Nav />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Register;
