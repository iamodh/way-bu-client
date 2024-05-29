import styled from "styled-components";
import StarAvgContainer from "./components/StarAvgContainer";
import StarContainer from "./components/StarContainer";
import { useOutletContext } from "react-router-dom";
import Review from "./components/Review";
const Wrapper = styled.div`
  width: 100%;
  padding: var(--padding-13xl);
  border: 1.5px solid var(--color-blue-light);
`;

const Header = styled.div`
  padding: var(--padding-base);
  h3 {
    font-weight: 700;
    font-size: var(--font-size-xl);
  }
  display: flex;
  gap: 10px;
  div {
    align-self: flex-end;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  padding: var(--padding-9xs) 0;
`;

const Filter = styled.div`
  border: 1px solid var(--color-gray);
  padding: var(--padding-9xs) var(--padding-5xs);
  border-radius: var(--br-3xs);
`;

const SearchContainer = styled.form`
  position: relative;
`;

const Search = styled.input`
  height: 100%;
  width: 200px;
  border: 1px solid var(--color-blue-main);
  border-radius: var(--br-8xs);
  padding: var(--padding-9xs) var(--padding-5xs);
  padding-right: 25px;
  &:focus {
    outline: none;
    border: 1px solid var(--color-blue-dark);
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  position: absolute;
  border-style: none;
  right: 2px;
  top: 6px;
`;

const OrderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--padding-5xs);
  padding: var(--padding-9xs) 0;
`;

const OrderBox = styled.div`
  display: flex;
  gap: var(--padding-9xs);
  font-size: var(--font-size-s);
`;

/* Reviews */

const ReviewBox = styled.div`
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
`;

const RateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserName = styled.h4`
  font-weight: 700;
`;

const UserRate = styled.span``;

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

export default function ProgramReviews() {
  const { program, reviews } = useOutletContext();
  return (
    <Wrapper>
      <Header>
        <h3>리뷰</h3>
        <StarAvgContainer programId={program[0].id} />
      </Header>
      <FilterContainer>
        <Filter>사진 리뷰만 보기</Filter>
        <Filter>인증된 리뷰만 보기</Filter>
        <SearchContainer>
          <Search type="text" placeholder="키워드를 입력하세요" />
          <SearchButton>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.67204 1.50471e-08C5.60802 9.06589e-05 4.55946 0.25462 3.61383 0.742353C2.6682 1.23009 1.85292 1.93688 1.23601 2.80376C0.619105 3.67065 0.218458 4.67249 0.0674994 5.7257C-0.0834596 6.7789 0.019646 7.85294 0.368214 8.8582C0.716782 9.86346 1.3007 10.7708 2.07127 11.5045C2.84183 12.2382 3.77668 12.777 4.79783 13.0759C5.81898 13.3749 6.89682 13.4253 7.94141 13.223C8.98601 13.0206 9.96708 12.5715 10.8028 11.9129L13.6696 14.7796C13.8177 14.9226 14.016 15.0018 14.2218 15C14.4276 14.9982 14.6245 14.9156 14.7701 14.7701C14.9156 14.6245 14.9982 14.4277 15 14.2218C15.0018 14.016 14.9226 13.8177 14.7796 13.6697L11.9128 10.8029C12.6884 9.81904 13.1713 8.63669 13.3062 7.39118C13.4412 6.14567 13.2228 4.88732 12.676 3.76014C12.1292 2.63296 11.276 1.6825 10.2142 1.01752C9.15245 0.352541 7.92489 -8.41056e-05 6.67204 1.50471e-08ZM1.56946 6.67235C1.56946 5.31911 2.10705 4.0213 3.06397 3.06442C4.02089 2.10754 5.31875 1.56996 6.67204 1.56996C8.02532 1.56996 9.32318 2.10754 10.2801 3.06442C11.237 4.0213 11.7746 5.31911 11.7746 6.67235C11.7746 8.02559 11.237 9.3234 10.2801 10.2803C9.32318 11.2372 8.02532 11.7747 6.67204 11.7747C5.31875 11.7747 4.02089 11.2372 3.06397 10.2803C2.10705 9.3234 1.56946 8.02559 1.56946 6.67235Z"
                fill="#3592F0"
              />
            </svg>
          </SearchButton>
        </SearchContainer>
      </FilterContainer>
      <OrderContainer>
        <OrderBox>
          <span>리뷰 높은순</span>
          <span>
            <svg
              width="10"
              height="8"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.385653 0.272727H11.2947L5.8402 9.54545L0.385653 0.272727Z"
                fill="black"
              />
            </svg>
          </span>
        </OrderBox>
        <OrderBox>
          <span>최신순</span>
          <span>
            <svg
              width="10"
              height="18"
              viewBox="0 0 12 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.385653 0.272727H11.2947L5.8402 9.54545L0.385653 0.272727Z"
                fill="black"
              />
            </svg>
          </span>
        </OrderBox>
      </OrderContainer>
      {reviews.map((review) => (
        <Review key={"review" + review.id} review={review} />
      ))}
    </Wrapper>
  );
}
