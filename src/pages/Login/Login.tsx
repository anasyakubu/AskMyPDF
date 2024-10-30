// import React from 'react'
// import { Helmet } from "react-helmet";
import Nav from "../../ui/Nav";
import Footer from "../../section/Footer/Footer";
import LoginForm from "../../section/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="Login bg-gray-50">
      {/* <Helmet>
        <title>Login ~ AskMyPDF</title>
      </Helmet> */}
      <Nav />
      <div className="pt-16"></div>
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
