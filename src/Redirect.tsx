import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../src/assets/AskMyPDF-Logo.png";

const Redirect = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth");
          throw new Error("Token not found");
        }

        const headersList = {
          Authorization: `Bearer ${token}`,
        };

        const reqOptions = {
          url: "https://api-ask-my-pdf.vercel.app/auth/profile",
          method: "GET",
          headers: headersList,
        };

        const response = await axios.request(reqOptions);
        setIsAuthenticated(
          response.status === 200 && response.data.message === "Authorized"
        );
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div>
        <div className="preloader">
          <div className="preloader-logo">
            <img src={Logo} alt="Logo" width="151" height="44" />
          </div>
          <div className="preloader-body">
            <div id="loadingProgressG">
              <div className="loadingProgressG" id="loadingProgressG_1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Redirect;
