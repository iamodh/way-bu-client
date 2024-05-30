import styled from "styled-components";
import UserPostItem from "./components/UserPostItem";
import UserCommentItem from "./components/UserCommentItem";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../atom";
import { Link } from "react-router-dom";

const MypageCommunityWrapper = styled.form`
  width: 80%;
  max-width: 800px;
  margin: var(--padding-base) auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--gap-21xl);
  text-align: left;
  font-size: var(--font-size-m);
  @media screen and (max-width: 768px) {
    gap: var(--gap-xl);
    font-size: var(--font-size-s);
  }
`;
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: var(--font-size-xl);
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-l);
  }
`;
const OptionList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--padding-5xs);
  width: 100%;
`;
const Label = styled.label`
  display: flex;
  font-size: var(--font-size-m);
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  border: 1px solid var(--color-gray);
  color: var(--color-gray);
  padding: var(--padding-9xs) var(--padding-5xs);
  background-color: var(--color-white);
  border-radius: var(--br-8xs);
  overflow: hidden;
  &:hover {
    border: 1px solid var(--color-blue-main);
    color: var(--color-blue-main);
  }
  @media screen and (max-width: 768px) {
    padding: var(--padding-9xs);
    font-size: var(--font-size-s);
  }
`;

const Option = styled.input`
  display: none;
  &:checked + label {
    background-color: var(--color-skyblue-light);
    color: var(--color-blue-main);
    border: 1px solid var(--color-blue-main);
  }
`;

const UserPostList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--padding-5xs);
  padding-bottom: var(--padding-5xs);
  margin-bottom: var(--padding-xs);
  border-bottom: 1px solid var(--color-gray);
`;

export default function MypageCommunity() {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  const { userPosts, userComments } = useOutletContext();
  const [selectedOption, setSelectedOption] = useState("myPosts");
  const [filteredPosts, setFilteredPosts] = useState(
    userPosts.filter((p) => p.user_id === loggedInUser.id)
  );
  const [filteredComments, setFilteredComments] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // 라디오 버튼이 선택됨에 따라 selectedOption 변화시킴
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  // selectedOption에 따라 filteredPosts 설정
  useEffect(() => {
    let newFilteredPosts = [];
    let newFilteredComments = [];

    // 내가 쓴 게시글
    if (selectedOption === "myPosts") {
      newFilteredPosts = userPosts.filter((p) => p.user_id === loggedInUser.id);
    }

    // 내가 쓴 댓글
    else if (selectedOption === "myComments") {
      newFilteredComments = userComments.filter(
        (c) => c.user_id === loggedInUser.id
      );
      newFilteredPosts = newFilteredComments.map(
        (c) => userPosts.filter((p) => c.post_id === p.post_id)[0]
      );
    }

    // 좋아요한 게시글
    else if (selectedOption === "likedPosts") {
      newFilteredPosts = userPosts.filter((p) =>
        p.user_recommend.includes(loggedInUser.id)
      );
    }
    setFilteredComments(newFilteredComments);
    setFilteredPosts(newFilteredPosts);
  }, [selectedOption, userPosts, userComments]);

  return (
    <MypageCommunityWrapper>
      <Title>커뮤니티</Title>
      <OptionList>
        <Option
          type="radio"
          value="myPosts"
          name="typeitem"
          checked={selectedOption === "myPosts"}
          id="myPosts"
          onChange={handleOptionChange}
        />
        <Label htmlFor={"myPosts"}>내가 쓴 게시글</Label>
        <Option
          type="radio"
          value="myComments"
          name="typeitem"
          id="myComments"
          onChange={handleOptionChange}
        />
        <Label htmlFor={"myComments"}>내가 쓴 댓글</Label>
        <Option
          type="radio"
          value="likedPosts"
          name="typeitem"
          id="likedPosts"
          onChange={handleOptionChange}
        />
        <Label htmlFor={"likedPosts"}>좋아요한 게시글</Label>
      </OptionList>
      <UserPostList>
        {filteredPosts.map((post, i) => {
          return (
            <Link to={"/community/" + post.post_id} key={"post" + post.post_id}>
              <UserPostItem key={"post" + post.post_id} post={post} />
              {selectedOption === "myComments" && filteredComments ? (
                <UserCommentItem
                  comment={filteredComments[i]}
                ></UserCommentItem>
              ) : (
                ""
              )}
            </Link>
          );
        })}
      </UserPostList>
    </MypageCommunityWrapper>
  );
}
