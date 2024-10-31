// import React from "react";
// import { Helmet } from "react-helmet";
import Nav from "../../ui/Nav";
import Footer from "../../section/Footer/Footer";
import ForgetPasswordForm from "../../section/ForgetPasswordForm/ForgetPasswordForm";

const ForgetPassword = () => {
  return (
    <div className="ForgetPassword bg-gray-50">
      {/* <Helmet>
        <title>Forget Password ~ Daily Invoice</title>
      </Helmet> */}
      <Nav />
      <ForgetPasswordForm />
      <Footer />
    </div>
  );
};

export default ForgetPassword;
