import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Voice from "./pages/Voice/Voice";
import Quiz from "./pages/Quiz/Quiz";
// import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="App font-nunito-eb">
        {/* <Toaster position="top-center" toastOptions={{ duration: 2000 }} /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chat />}></Route>
            <Route path="/Voice" element={<Voice />}></Route>
            <Route path="/Quiz" element={<Quiz />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
