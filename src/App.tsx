import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PdfChat from "./pages/PdfChat/PdfChat";
import Chat from "./pages/Chat/Chat";
import Voice from "./pages/Voice/Voice";
import Quiz from "./pages/Quiz/Quiz";
import TextImage from "./pages/TextImage/TextImage";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import ComingSoon from "./ComingSoon/ComingSoon";
// import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="App font-nunito-eb">
        {/* <Toaster position="top-center" toastOptions={{ duration: 2000 }} /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/Voice" element={<Voice />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
            <Route path="/TextImage" element={<TextImage />}></Route>
            <Route path="/pdfChat" element={<PdfChat />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/coming-soon" element={<ComingSoon />}></Route>
            {/* auth routes */}
            <Route path="/auth" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
