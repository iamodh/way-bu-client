/*

/ -> 인덱스
/login -> 로그인
/signup -> 회원가입

*/

import { Route, Routes } from "react-router-dom";
/* root pages */
import Home from "./root/Home";
import Login from "./root/Login";
import Signup from "./root/Signup";
import Program from "./program/Program";
import Mypage from "./mypage/Mypage";
import CommonLayout from "../components/layout/CommonLayout";
import Matching from "./matching/Matching";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="program" element={<Program />} />
      </Route>
      <Route path="/mypage">
        <Route index element={<Mypage />} />
      </Route>
      <Route path="/matching">
        <Route index element={<Matching />} />
      </Route>
    </Routes>
  );
}
