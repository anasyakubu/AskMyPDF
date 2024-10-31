// import React from 'react'
// import { Helmet } from "react-helmet";
import Nav from "../../ui/Nav";
// import Redirect from "../../Redirect";
import Footer from "../../section/Footer/Footer";
import VerifyEmailForm from "../../section/VerifyEmailForm/VerifyEmailForm";

const VerifyEmail = () => {
  return (
    <div className="VerifyEmail">
      {/* <Helmet>
        <title>Verify Email ~ Daily Invoice</title>
      </Helmet> */}
      {/* <Redirect /> */}
      <Nav />
      <div className="mt-16"></div>
      <VerifyEmailForm />
      <Footer />
    </div>
  );
};

export default VerifyEmail;
