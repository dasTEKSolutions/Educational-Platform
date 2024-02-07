import Fotter from "./components/Fotter";
import HOMEWORKHELP from "./pages/HomeWorkHelp";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Chatbot from "./pages/Chatbot";
import GeneralChatbot from "./pages/GeneralChatbot";
import Threads from "./pages/Threads";
import IndividualThread from "./pages/IndividualThread";
import { UserAuthContextProvider } from "./UserAuth";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/threads" element={<Threads />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <HOMEWORKHELP />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/gen-chatbot" element={<GeneralChatbot />} />
          <Route path="/threads/:threadId" element={<IndividualThread />} />
        </Routes>
        {/* <Fotter /> */}
      </UserAuthContextProvider>
    </>
  );
}
