import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PdfChat from "./pages/PdfChat/PdfChat";
import Chat from "./pages/Chat/Chat";
import Voice from "./pages/Voice/Voice";
import Quiz from "./pages/Quiz/Quiz";
import TextImage from "./pages/TextImage/TextImage";
import Landing from "./pages/Landing/Landing";
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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
