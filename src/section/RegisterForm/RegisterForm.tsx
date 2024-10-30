import { useState, FormEvent } from "react";
import "./RegisterForm.scss";
import Image from "../../assets/Secure login-bro.png";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [borderColor, setBorderColor] = useState("border-black");

  // handle registration
  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, password } = data;

    if (data.name === "" || data.email === "" || data.password === "") {
      toast.error("Please enter all input required");
      setBorderColor("border-red-500");
    } else {
      setBorderColor("border-green-500");
    }

    try {
      const { data } = await axios.post(
        "https://api-daily-invoice.vercel.app/auth/user/register",
        {
          name,
          email,
          password,
        }
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ name: "", email: "", password: "" });
        toast.success("Account Created Successfully");
        navigate("/Login");
      }
    } catch (error: any) {
      if (error.response) {
        // Request made and server responded
        toast.error(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("Error in setting up the request.");
      }
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <div className="RegisterForm">
      <div className="p-32 py-5">
        <div className="p-10 space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
          {/* Form */}
          <div className="">
            <div className="">
              <h2 className="text-4xl font-bold">Create Free Account</h2>
              <p className="text-sm mt-4 ">
                By creating a Daily Invoice account, you agree to our <br />{" "}
                <span className="underline text-blue-500">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline text-blue-500">Privacy Policy.</span>
              </p>
              {/* FORM */}
              <div className="mt-8">
                <form action="" onSubmit={handleRegistration}>
                  <div className="">
                    <div className="">
                      <label htmlFor="" className="text-sm">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        className={`w-full mt-2 p-3 border ${borderColor} outline-none text-sm rounded-md`}
                        placeholder="Eg. Anas Yakubu"
                        value={data.name}
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="" className="text-sm">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        className={`w-full mt-2 p-3 border ${borderColor} outline-none text-sm rounded-md`}
                        placeholder="Eg. example@gmail.com"
                        value={data.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="" className="text-sm">
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="password"
                        className={`w-full mt-2 p-3 border ${borderColor} outline-none text-sm rounded-md`}
                        placeholder="Eg. ******"
                        value={data.password}
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-sm ">
                        You will receive the confirmation email after submitting
                        this form.
                      </p>
                    </div>
                    <div className="mt-3">
                      <button
                        className="p-3 w-full bg-green-600 text-white text-md rounded-md"
                        style={{ letterSpacing: "1px" }}
                      >
                        {loading ? "Signing Up..." : "Sign Up"}
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-center">
                        We`ll occasionally send you account related emails.
                      </p>
                      <p className="text-sm text-center mt-1">
                        Already have an account?{" "}
                        <span className="underline text-blue-500">
                          <Link to="/Login">Login</Link>
                        </span>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* Image */}
          <div className="flex justify-center text-center">
            <div className="">
              <div className="">
                <img src={Image} alt="" className="w-96 regImage" />
              </div>
              <div className="flex justify-center text-center">
                <div className="">
                  <div className="my-5">
                    <h6 className="text-center">OR</h6>
                  </div>
                  <div className="">
                    <button className="flex gap-3 border border-gray-900 p-2 text-sm px-16 lg:px-32 text-center rounded-md">
                      <span className="py-1">
                        <FcGoogle />
                      </span>
                      <span>Use Google account</span>
                    </button>
                  </div>
                  <div className="mt-3">
                    <button className="flex gap-3 border border-gray-900 p-2 text-sm px-16 lg:px-32 text-center rounded-md">
                      <span className="py-1">
                        <FaGithub />
                      </span>
                      <span>Use Github account</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
