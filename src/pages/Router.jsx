/*

/ -> 인덱스
/login -> 로그인
/signup -> 회원가입

*/

import { Route, Routes } from "react-router-dom";
/* root pages */
import CommonLayout from "../../components/layout/CommonLayout";
import Home from "./root/Home";
import Login from "./root/Login";
import Signup from "./root/Signup";
import Program from "./program/Program";
import UpdateInfo from "./mypage/MypageUpdate";

export default function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="program" element={<Program />} />
      </Route>
      <Route path="/mypage">
        <Route index element={<UpdateInfo />} />
      </Route>
    </Routes>
  );
}
