import { Route, Routes } from "react-router-dom";
/* root pages */
import Home from "./root/Home";
import Login from "./root/Login";
import Signup from "./root/Signup";

/* program pagse */
import Program from "./program/Program";

/* my pages */
import Mypage from "./mypage/Mypage";

/* layouts */
import CommonLayout from "../components/layout/CommonLayout";
import ProgramDetail from "./program/ProgramDetail";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="program" element={<Program />} />
        <Route path="program/:programId" element={<ProgramDetail />} />
      </Route>
      <Route path="/mypage">
        <Route index element={<Mypage />} />
      </Route>
    </Routes>
  );
}
