import { Route, Routes } from "react-router-dom";
/* root pages */
import Home from "./root/Home";
import Login from "./root/Login";
import Signup from "./root/Signup";
import Program from "./program/Program";
import Mypage from "./mypage/Mypage";
import CommonLayout from "../components/layout/CommonLayout";
import FindId from "./root/FindId";
import FindPwd from "./root/FindPwd";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="find-id" element={<FindId />} />
        <Route path="find-pwd" element={<FindPwd />} />
        <Route path="signup" element={<Signup />} />
        <Route path="program" element={<Program />} />
      </Route>
      <Route path="/mypage">
        <Route index element={<Mypage />} />
      </Route>
    </Routes>
  );
}
