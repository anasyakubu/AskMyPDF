import { useState, FormEvent, useEffect } from "react";
import "./LoginForm.scss";
import Image from "../../assets/Mobile login-bro.svg";
// import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

interface LoginData {
  email: string;
  password: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [borderColor, setBorderColor] = useState("border-black");

  const handleGoogleSignIn = async (response: any) => {
    try {
      // First decode the credential to get user information
      const decodedToken = JSON.parse(atob(response.credential.split(".")[1]));

      // Prepare the data in the format your backend expects
      const googleUserData = {
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        google_id: decodedToken.sub,
        id_token: response.credential, // Include the original token if needed
      };

      // Make request to your login endpoint
      const result = await axios.post(
        "https://api-ask-my-pdf.vercel.app/auth/login",
        {
          ...googleUserData,
        }
      );

      if (result.data) {
        const { token, userID, name, email, username, userImage } = result.data;

        // Store user data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID);
        localStorage.setItem("name", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("username", username);
        localStorage.setItem("userImage", userImage || decodedToken.picture);

        toast.success("Successfully signed in with Google!");
        navigate("/chat");
      }
    } catch (error: any) {
      console.error("Error signing in with Google:", error);

      // More specific error handling
      if (error.response?.status === 404) {
        toast.error("Authentication service is currently unavailable");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to sign in with Google. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google?.accounts) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleGoogleSignIn,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          {
            theme: "outline",
            size: "large",
            type: "standard",
            shape: "rectangular",
            text: "continue_with",
            width:
              document.getElementById("googleSignInButton")?.offsetWidth || 350,
          }
        );

        // Also display the One Tap dialog
        window.google.accounts.id.prompt();
      }
    };

    // Load the Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGoogleSignIn;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      const scriptElement = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]'
      );
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  // handle Regular Login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = data;

    if (email === "" || password === "") {
      toast.error("Please enter all input required");
      setBorderColor("border-red-500");
      setLoading(false);
      return;
    }

    setBorderColor("border-green-500");

    try {
      const response = await axios.post(
        "https://api-ask-my-pdf.vercel.app/auth/login",
        {
          email,
          password,
        }
      );

      const {
        token,
        userID,
        name,
        email: userEmail,
        username,
        userImage,
      } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID);
      localStorage.setItem("name", name);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("username", username);
      localStorage.setItem("userImage", userImage);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message);
        navigate("/chat");
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("Error in setting up the request.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginForm">
      <div className="p-32 py-5">
        <div className="p-10 space-y-2 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:space-y-0">
          {/* Form */}
          <div className="">
            <div className="">
              <h2 className="text-4xl font-bold">Log in</h2>
              <p className="text-sm mt-4">
                By creating a Daily Invoice account, you agree to our <br />{" "}
                <span className="underline text-blue-500">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="underline text-blue-500">Privacy Policy.</span>
              </p>
              {/* FORM */}
              <div className="mt-8">
                <form onSubmit={handleLogin}>
                  <div className="">
                    <div className="">
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
                      <p className="text-sm">
                        <Link
                          to={`/ForgetPassword`}
                          className="text-blue-500 underline"
                        >
                          Forget Password
                        </Link>
                      </p>
                    </div>
                    <div className="mt-3">
                      <button
                        className="p-3 w-full bg-green-600 text-white text-md rounded-md"
                        style={{ letterSpacing: "1px" }}
                      >
                        {loading ? "Processing..." : "Login"}
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-center">
                        Don`t have an account?{" "}
                        <span className="underline text-blue-500">
                          <Link to="/register">Register</Link>
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
                    <div
                      id="googleSignInButton"
                      className="flex justify-center"
                    ></div>
                  </div>
                  <div className="mt-3">
                    {/* <button className="flex gap-3 border border-gray-900 p-2 text-sm px-16 lg:px-32 text-center rounded-md">
                      <span className="py-1">
                        <FaGithub />
                      </span>
                      <span>Use Github account</span>
                    </button> */}
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

export default LoginForm;
