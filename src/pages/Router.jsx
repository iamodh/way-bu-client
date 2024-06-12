import { Route, Routes } from "react-router-dom";
/* root pages */
import Home from "./root/Home";
import Login from "./root/Login";
import Signup from "./root/Signup";
import Community from "./community/Community";
import Post from "./community/Post";

/* program pagse */
import Program from "./program/Program";
import CommonLayout from "../components/layout/CommonLayout";
import MypageLayout from "../components/layout/MypageLayout";
import MypageUpdate from "./mypage/MypageUpdate";
import MypageReview from "./mypage/MypageReview";
import MypageReviewWrite from "./mypage/MypageReviewWrite";
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
import Matching from "./matching/Matching";
import MatchingUpdate from "./matching/components/MatchingUpdate";
import MatchingApply from "./matching/components/MatchingApply";
import ProgramBooking from "./program/ProgramBooking";
import PostWrite from "./community/PostWrite";
import ComparePrograms from "./program/ComparePrograms";
import Sports from "./sports/Sports";
import PostEdit from "./community/PostEdit";
import SportsInfo from "./sports/SportsInfo";
import Animation from "../components/layout/Animation";

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

        {/* Compare Programs */}
        <Route path="program/compare" element={<ComparePrograms />} />

        {/* Program detail */}
        <Route path="program/:programId" element={<ProgramLayout />}>
          <Route index element={<ProgramIntro />} />
          <Route path="detail" element={<ProgramDetail />} />
          <Route path="reviews" element={<ProgramReviews />} />
          <Route path="booking" element={<ProgramBooking />} />
        </Route>

        {/* Community */}
        <Route path="community" element={<Community />} />
        <Route path="community/write" element={<PostWrite />} />
        <Route path="community/:id" element={<Post />} />
        <Route path="community/:id/edit" element={<PostEdit />} />

        {/* Sports */}
        <Route path="sports" element={<Sports />} />

        {/* Matching */}
        <Route path="matching" element={<Matching />} />
        <Route path="matching/update/:id" element={<MatchingUpdate />} />
        <Route path="matching/apply/:id" element={<MatchingApply />} />

        {/* My page */}
        <Route path="/mypage/:id" element={<MypageLayout />}>
          <Route index element={<MypageUpdate />} />
          <Route path="review" element={<MypageReview />} />
          <Route path="review-write" element={<MypageReviewWrite />} />
          <Route path="community" element={<MypageCommunity />} />
          <Route path="matching" element={<MypageMatching />} />
          <Route path="setting" element={<MypageSetting />} />
        </Route>
      </Route>

      <Route path="/animation">
        <Route index element={<Animation />} />
      </Route>
    </Routes>
  );
}
