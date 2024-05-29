import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { client } from "../../../../libs/supabase";
import StarAvgContainer from "./StarAvgContainer";
import { addCommaintoMoney } from "../../../../libs/formatter";

const Wrapper = styled.div`
  border: 1px solid var(--color-gray);
  border-radius: var(--br-mini);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: rgb(241 245 249);
  }
  transition: all 0.2s ease-in-out;
  h3 {
    font-size: var(--font-size-l);
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;

    @media only screen and (max-width: 376px) {
      font-size: var(--font-size-ml);
      white-space: wrap;
    }
  }
  a {
    padding-top: 20px;
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 376px) {
      flex-direction: row;
      padding: 20px;
      padding-bottom: 0px;
    }
    gap: 10px;
  }
`;

const Thumbnail = styled.div`
  align-self: center;
  width: 180px;
  height: 180px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.$imageUrl});
  margin-bottom: 20px;
  @media only screen and (max-width: 376px) {
    width: 50%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: calc(100% - 40px);
  @media only screen and (max-width: 376px) {
    width: 50%;
  }
  span {
    font-size: var(--font-size-s);
  }
`;

const Button = styled.button`
  width: calc(100% - 40px);
  margin: 10px 0 20px 0;
  font-size: var(--font-size-m);
  color: white;
  height: 40px;
  background-color: var(--color-blue-main);
  &:hover {
    background-color: #1758b9;
  }
  transition: all 0.2s ease-in-out;
  border-radius: var(--br-3xs);
  border: none;
  cursor: pointer;
`;

export default function ProgramItem({ program, onBtnClicked }) {
  /* Review 별 불러오기 */
  const [reviews, setReviews] = useState();
  const [reviewLoading, setReviewLoading] = useState(true);

  // PROGRAM_REVIEW 에서 program_id가 program.id와 같은 데이터 받음
  const getReviews = async () => {
    const { data, error } = await client
      .from("PROGRAM_REVIEW")
      .select()
      .eq("program_id", program.id);
    if (error) {
      console.log(error);
      return;
    }
    setReviews(data);
    setReviewLoading(false);
  };

  // 컴포넌트 마운트 시 getReviews 실행
  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Wrapper>
      <Link to={`/program/${program.id}`}>
        <Thumbnail $imageUrl={program.thumbnail} />
        <Content>
          <h3>{program.program_name}</h3>
          <StarAvgContainer programId={program.id}>
            {reviewLoading
              ? "Loading..."
              : reviews.length === 0
              ? // reviews가 존재하지 않으면 빈 별 5개 출력
                [...Array(5)].map((_, i) => (
                  <svg
                    key={"empty" + i}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7777 6.78426L12.0295 10.1448L13.1747 15.1687C13.205 15.2978 13.1978 15.4334 13.154 15.5582C13.1102 15.6831 13.0318 15.7916 12.9286 15.8701C12.8255 15.9486 12.7023 15.9936 12.5746 15.9994C12.4469 16.0051 12.3204 15.9714 12.2111 15.9024L7.9996 13.2092L3.78807 15.9016C3.6788 15.9706 3.55232 16.0043 3.42461 15.9986C3.2969 15.9928 3.17369 15.9478 3.07057 15.8693C2.96744 15.7908 2.88902 15.6823 2.84522 15.5574C2.80141 15.4326 2.79419 15.297 2.82447 15.1679L3.96971 10.144L0.221509 6.78346C0.125943 6.69623 0.0570432 6.58181 0.0233152 6.45433C-0.0104127 6.32685 -0.00749197 6.1919 0.0317169 6.06612C0.0709257 5.94035 0.144706 5.82927 0.243949 5.74659C0.343192 5.66391 0.463553 5.61326 0.590172 5.60088L5.50901 5.18482L7.40389 0.416108C7.4522 0.29308 7.53466 0.187798 7.64076 0.113688C7.74685 0.0395787 7.87178 0 7.9996 0C8.12743 0 8.25235 0.0395787 8.35845 0.113688C8.46455 0.187798 8.54701 0.29308 8.59531 0.416108L10.4902 5.18482L15.409 5.60088C15.5358 5.61311 15.6564 5.66372 15.7558 5.74645C15.8552 5.82918 15.9291 5.94039 15.9683 6.06633C16.0076 6.19226 16.0104 6.32739 15.9765 6.455C15.9426 6.5826 15.8735 6.69708 15.7777 6.78426Z"
                      fill="#B9B9B9"
                    />
                  </svg>
                ))
              : // reviews가 존재하면 score 평균을 반올림한 만큼 파란 별 출력
                [
                  ...Array(
                    Math.round(
                      reviews.reduce((acc, cur) => acc + cur.score, 0) /
                        reviews.length
                    )
                  ),
                ].map((_, i) => (
                  <svg
                    key={"full" + i}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7777 6.78426L12.0295 10.1448L13.1747 15.1687C13.205 15.2978 13.1978 15.4334 13.154 15.5582C13.1102 15.6831 13.0318 15.7916 12.9286 15.8701C12.8255 15.9486 12.7023 15.9936 12.5746 15.9994C12.4469 16.0051 12.3204 15.9714 12.2111 15.9024L7.9996 13.2092L3.78807 15.9016C3.6788 15.9706 3.55232 16.0043 3.42461 15.9986C3.2969 15.9928 3.17369 15.9478 3.07057 15.8693C2.96744 15.7908 2.88902 15.6823 2.84522 15.5574C2.80141 15.4326 2.79419 15.297 2.82447 15.1679L3.96971 10.144L0.221509 6.78346C0.125943 6.69623 0.0570432 6.58181 0.0233152 6.45433C-0.0104127 6.32685 -0.00749197 6.1919 0.0317169 6.06612C0.0709257 5.94035 0.144706 5.82927 0.243949 5.74659C0.343192 5.66391 0.463553 5.61326 0.590172 5.60088L5.50901 5.18482L7.40389 0.416108C7.4522 0.29308 7.53466 0.187798 7.64076 0.113688C7.74685 0.0395787 7.87178 0 7.9996 0C8.12743 0 8.25235 0.0395787 8.35845 0.113688C8.46455 0.187798 8.54701 0.29308 8.59531 0.416108L10.4902 5.18482L15.409 5.60088C15.5358 5.61311 15.6564 5.66372 15.7558 5.74645C15.8552 5.82918 15.9291 5.94039 15.9683 6.06633C16.0076 6.19226 16.0104 6.32739 15.9765 6.455C15.9426 6.5826 15.8735 6.69708 15.7777 6.78426Z"
                      fill="#3592F0"
                    />
                  </svg>
                ))}
            {reviewLoading
              ? null
              : reviews.length === 0
              ? null
              : // 5에서 파란 별 개수 뺀 만큼 빈 별 출력
                [
                  ...Array(
                    5 -
                      Math.round(
                        reviews.reduce((acc, cur) => acc + cur.score, 0) /
                          reviews.length
                      )
                  ),
                ].map((_, i) => (
                  <svg
                    key={"empry" + i}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7777 6.78426L12.0295 10.1448L13.1747 15.1687C13.205 15.2978 13.1978 15.4334 13.154 15.5582C13.1102 15.6831 13.0318 15.7916 12.9286 15.8701C12.8255 15.9486 12.7023 15.9936 12.5746 15.9994C12.4469 16.0051 12.3204 15.9714 12.2111 15.9024L7.9996 13.2092L3.78807 15.9016C3.6788 15.9706 3.55232 16.0043 3.42461 15.9986C3.2969 15.9928 3.17369 15.9478 3.07057 15.8693C2.96744 15.7908 2.88902 15.6823 2.84522 15.5574C2.80141 15.4326 2.79419 15.297 2.82447 15.1679L3.96971 10.144L0.221509 6.78346C0.125943 6.69623 0.0570432 6.58181 0.0233152 6.45433C-0.0104127 6.32685 -0.00749197 6.1919 0.0317169 6.06612C0.0709257 5.94035 0.144706 5.82927 0.243949 5.74659C0.343192 5.66391 0.463553 5.61326 0.590172 5.60088L5.50901 5.18482L7.40389 0.416108C7.4522 0.29308 7.53466 0.187798 7.64076 0.113688C7.74685 0.0395787 7.87178 0 7.9996 0C8.12743 0 8.25235 0.0395787 8.35845 0.113688C8.46455 0.187798 8.54701 0.29308 8.59531 0.416108L10.4902 5.18482L15.409 5.60088C15.5358 5.61311 15.6564 5.66372 15.7558 5.74645C15.8552 5.82918 15.9291 5.94039 15.9683 6.06633C16.0076 6.19226 16.0104 6.32739 15.9765 6.455C15.9426 6.5826 15.8735 6.69708 15.7777 6.78426Z"
                      fill="#B9B9B9"
                    />
                  </svg>
                ))}

            <span>
              {
                // reviews가 비어있으면 (0) 출력, 아니면 reviews 개수 출력
                reviewLoading
                  ? null
                  : reviews.length === 0
                  ? "(0)"
                  : `(${reviews.length})`
              }
            </span>
          </StarAvgContainer>
          <span>{addCommaintoMoney(program.price)}원</span>
          <div>
            <span>{program.open_time.substring(0, 5)}</span>
            <span> ~ </span>
            <span>{program.close_time.substring(0, 5)}</span>
          </div>
        </Content>
      </Link>
      <Button
        onClick={() => {
          onBtnClicked(program);
        }}
      >
        비교하기
      </Button>
    </Wrapper>
  );
}
