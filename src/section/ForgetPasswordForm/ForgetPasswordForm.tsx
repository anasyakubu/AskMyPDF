import "./ForgetPasswordForm.scss";
import Image from "../../assets/Forgot password-cuate.svg";
import { FormEvent, useState } from "react";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you can add logic to handle the form submission
    console.log("Reset password for email:", email);
  };

  return (
    <div className="ForgetPasswordForm">
      <div className="p-32 py-5">
        <div className="p-10 space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
          {/* Form */}
          <div>
            <h2 className="text-4xl font-bold">Forget Password</h2>
            <p className="text-sm mt-4">
              Enter your email address to receive a reset code in your email
            </p>
            {/* FORM */}
            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="text-sm">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full mt-2 p-3 border border-black outline-none text-sm rounded-md"
                    placeholder="Eg. example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="p-3 w-full bg-green-600 text-white text-md rounded-md"
                    style={{ letterSpacing: "1px" }}
                  >
                    Reset Password
                  </button>
                </div>
                <div className="mt-5">
                  <p className="text-sm">
                    Enter the 4-digit code sent to your email address
                  </p>
                  <p className="text-sm mt-3 text-center">
                    Didn`t get the code?{" "}
                    <button
                      type="button"
                      onClick={() => console.log("Resend code")}
                      className="text-blue-500 underline"
                    >
                      Resend
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
          {/* Image */}
          <div className="flex justify-center text-center">
            <img
              src={Image}
              alt="Forgot password illustration"
              className="w-96 regImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
