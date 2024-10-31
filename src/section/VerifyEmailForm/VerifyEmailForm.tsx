import { useState, ChangeEvent, FormEvent } from "react";
import "./VerifyEmailForm.scss";
import Image from "../../assets/Authentication-pana.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

interface VerifyData {
  opt: string;
}

const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<VerifyData>({ opt: "" });
  const [borderColor, setBorderColor] = useState<string>("border-black");

  // handle verification
  const handleVerification = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (data.opt === "") {
      toast.error("Please enter all input fields");
      setBorderColor("border-red-500");
      setLoading(false);
    } else {
      setBorderColor("border-green-500");
      try {
        const response = await axios.post(
          "https://api-ask-my-pdf.vercel.app/auth/verifyOPT",
          {
            userID: localStorage.getItem("userID"),
            opt: data.opt,
          }
        );

        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setData({ opt: "" });
          toast.success("Verification Successful");
          navigate("/Dashboard");
        }
      } catch (error: any) {
        console.error(error);
        toast.error("Verification failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post(
        "https://api-ask-my-pdf.vercel.app/auth/resendOPT",
        {
          userID: localStorage.getItem("userID"),
          email: localStorage.getItem("userEmail"),
        }
      );

      toast.success("Code has been resent to your email address");
      window.location.reload();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("Error in setting up the request.");
      }
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="VerifyEmailForm">
      <div className="p-32 py-5">
        <div className="p-10 space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
          {/* Form */}
          <div>
            <h2 className="text-4xl font-bold">Verify Email</h2>
            <p className="text-sm mt-4">
              Enter your email address and verify your email address
            </p>
            <div className="mt-8">
              <form onSubmit={handleVerification}>
                <div>
                  <label htmlFor="opt" className="text-sm">
                    Verification Code <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="opt"
                    className={`w-full mt-2 p-3 border ${borderColor} outline-none text-sm rounded-md`}
                    placeholder="Eg. ****"
                    value={data.opt}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="p-3 w-full bg-green-600 text-white text-md rounded-md"
                    style={{ letterSpacing: "1px" }}
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
                <div className="mt-5">
                  <p className="text-sm">
                    Enter the 4-digit code sent to your email address
                  </p>
                  <p className="text-sm mt-3 text-center">
                    Didn`t get the code?{" "}
                    <button
                      onClick={handleResend}
                      className="text-blue-500 underline"
                      type="button"
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
              alt="Email verification illustration"
              className="w-96 regImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
