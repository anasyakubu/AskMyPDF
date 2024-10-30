// import React from 'react'
import { Helmet } from "react-helmet";
import Nav from "../../Components/Nav";
import Footer from "../../Sections/Footer/Footer";
import LoginForm from "../../Sections/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="Login bg-gray-50">
      <Helmet>
        <title>Login ~ Daily Invoice</title>
      </Helmet>
      <Nav />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
