import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../src/assets/AskMyPDF-Logo.png";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userID = localStorage.getItem("userID");

        if (!token || !userID) {
          throw new Error("Token or User ID not found");
        }

        const headersList = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `https://api-ask-my-pdf.vercel.app/auth/get/${userID}`,
          {
            headers: headersList,
          }
        );

        console.log(response.data[0].verified);
        setVerified(response.data[0].verified);
      } catch (error) {
        console.error("Error:", error);
        setVerified(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading && !verified) {
      navigate("/VerifyEmail");
    }
  }, [isLoading, verified, navigate]);

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

export default VerifyEmail;
