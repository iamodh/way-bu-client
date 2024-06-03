import styled from "styled-components";
import StarContainer from "./StarContainer";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid var(--color-blue-light);
  display: flex;
  flex-direction: column;
  padding: var(--padding-base);
  gap: 10px;
`;

const ReviewMeta = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  gap: 16px;
  position: relative;
`;

const ProfileImage = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #d7d7d7;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.$imageUrl});
  cursor: pointer;
`;

const RateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const UserName = styled.h4`
  font-weight: 700;
`;

const ReviewDate = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  font-size: var(--font-size-s);
  color: var(--color-gray);
`;

const ReviewContent = styled.div`
  width: 100%;
`;

const ReviewImages = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const ReviewImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: #d9d9d9;
`;

export default function Review({ review }) {
  const navigate = useNavigate();
  return (
    <Wrapper id={review.id}>
      <ReviewMeta>
        <ProfileImage
          onClick={() => navigate(`/mypage/13`)}
          $imageUrl={review.USER_PROFILE.avatar_url}
        />
        <RateBox>
          <UserName>{review.USER_PROFILE.user_nickname}</UserName>
          <StarContainer review={review} width={"16"} />
        </RateBox>
        <ReviewDate>{review.created_at.substring(0, 10)}</ReviewDate>
      </ReviewMeta>
      <ReviewContent>
        <p>{review.content}</p>
      </ReviewContent>
      <ReviewImages>
        <ReviewImage />
        <ReviewImage />
      </ReviewImages>
    </Wrapper>
  );
}
