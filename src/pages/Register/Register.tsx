// import React from "react";
import { Helmet } from "react-helmet";
import Nav from "../../ui/Nav";
import Footer from "../../section/Footer/Footer";
import RegisterForm from "../../section/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className="Register bg-gray-50">
      <Helmet>
        <title>Register ~ AskMyPDF</title>
      </Helmet>
      <Nav />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Register;
