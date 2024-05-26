import { Route, Routes } from "react-router-dom";
/* root pages */
import Home from "./root/Home";
import Login from "./root/Login";
import Signup from "./root/Signup";
import Coummunity from "./community/Community";
import Post from "./community/Post";

/* program pagse */
import Program from "./program/Program";
import CommonLayout from "../components/layout/CommonLayout";
import MypageLayout from "../components/layout/MypageLayout";
import MypageUpdate from "./mypage/MypageUpdate";
import MypageReview from "./mypage/MypageReview";
import MypageMatching from "./mypage/MypageMatching";
import MypageCommunity from "./mypage/MypageCommunity";
import MypageSetting from "./mypage/MypageSetting";
import ProgramIntro from "./program/ProgramIntro";
import ProgramReviews from "./program/ProgramReviews";
import ProgramLayout from "./program/ProgramLayout";
import ProgramDetail from "./program/ProgramDetail";
import FindId from "./root/FindId";
import FindPwd from "./root/FindPwd";
import ChangePwd from "./root/ChangePwd";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="find-id" element={<FindId />} />
        <Route path="find-pwd" element={<FindPwd />} />
        <Route path="change-pwd" element={<ChangePwd />} />
        <Route path="signup" element={<Signup />} />
        <Route path="program" element={<Program />} />
        {/* Program detail */}
        <Route path="program/:programId" element={<ProgramLayout />}>
          <Route index element={<ProgramIntro />} />
          <Route path="detail" element={<ProgramDetail />} />
          <Route path="reviews" element={<ProgramReviews />} />
        </Route>
        <Route path="community" element={<Coummunity />} />
        <Route path="community/:id" element={<Post />} />
        {/* My page */}

        <Route path="/mypage" element={<MypageLayout />}>
          <Route index element={<MypageUpdate />} />
          <Route path="review" element={<MypageReview />} />
          <Route path="community" element={<MypageCommunity />} />
          <Route path="matching" element={<MypageMatching />} />
          <Route path="setting" element={<MypageSetting />} />
        </Route>
      </Route>
    </Routes>
  );
}
