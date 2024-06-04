import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { client } from "../../../libs/supabase";
import StarAvgContainer from "./components/StarAvgContainer";
import { addCommaintoMoney } from "../../../libs/formatter";
import StarContainer from "./components/StarContainer";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--padding-13xl);
  border: 1.5px solid var(--color-blue-light);
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  @media only screen and (max-width: 376px) {
    flex-direction: column;
  }
`;

/* Image slide */

const ImageContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Image = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.$imageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Slides = styled.div`
  height: 114px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Slide = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: inline-block;
  position: relative;
  &:first-child {
    margin-left: 10px;
  }
  &:last-child {
    margin-right: 10px;
  }

  background-image: url(${(props) => props.$url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const SlideCover = styled.div`
  width: 80px;
  height: 80px;
  background-color: var(--color-black);
  position: absolute;
  opacity: 0.4;
`;

/* Intro */

const IntroContainer = styled.div`
  width: 324px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Intro = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid var(--color-blue-main);
  border-radius: var(--br-8xs);
`;

const IntroRow = styled.div`
  width: 100%;
  display: flex;
`;

const IntroCol = styled.div`
  font-size: var(--font-size-m);

  &:first-child {
    width: 80px;
    font-weight: 700;
  }
  &:last-child {
    flex: 1;
  }
  select {
    width: 100%;
    border: none;
    height: 100%;
  }
`;

const PriceBox = styled(Intro)`
  background-color: var(--color-skyblue-light);
  align-items: center;
  h2 {
    font-size: var(--padding-xl);
    font-weight: 700;
    color: var(--color-blue-main);
  }
`;

const Button = styled.button`
  width: 160px;
  font-size: var(--font-size-m);
  color: var(--color-white);
  height: 50px;
  background-color: var(--color-blue-main);
  &:hover {
    background-color: var(--color-blue-dark);
  }
  transition: all 0.2s ease-in-out;
  border-radius: var(--br-3xs);
  border: none;
  cursor: pointer;
  align-self: center;
`;

/* Reviews */

const ReviewsTitle = styled.h3`
  font-size: var(--font-size-l);
  font-weight: 700;
  margin-bottom: var(--padding-base);
`;

const Reviews = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  flex-direction: column;

  gap: 16px;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: lightgray;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-blue-bright);
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Review = styled.div`
  width: 200px;
  height: 180px;
  flex-shrink: 0;
  border: 1px solid var(--color-blue-main);
  border-radius: var(--br-xl);
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const ReviewContent = styled.span`
  width: 80%;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-align: center;
`;

export default function ProgramIntro() {
  const { program, reviews } = useOutletContext();

  const [currentImage, setCurrentImage] = useState({
    index: 0,
    imgUrl: program[0].thumbnail,
  });
  const [options, setOptions] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({
    opt1: "",
    opt2: "",
  });

  useEffect(() => {
    getOptions();
  }, [program]);

  const getOptions = async () => {
    const { data, error } = await client
      .from("PROGRAM_OPTION")
      .select()
      .eq("program_id", program[0].id);
    if (error) {
      return;
    }
    if (data) {
      setOptions(data);
    }
    setIsLoading(false);
  };

  const onOption1Selected = (event) => {
    // 기본값 선택했을 경우 초기화
    if (!event.target.value) {
      setSelectedOptions((prev) => {
        return { ...prev, opt1: "" };
      });
    } else {
      setSelectedOptions((prev) => {
        return { ...prev, opt1: event.target.value };
      });
    }
  };
  const onOption2Selected = (event) => {
    if (!event.target.value) {
      setSelectedOptions((prev) => {
        return { ...prev, opt2: "" };
      });
    } else {
      setSelectedOptions((prev) => {
        return { ...prev, opt2: event.target.value };
      });
    }
  };

  {
    !isLoading
      ? console.log(
          selectedOptions.opt1
            ? options[
                options.findIndex(
                  (option) => option.id === Number(selectedOptions.opt1)
                )
              ].option_price
            : null
        )
      : null;
  }
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Main>
        <ImageContainer>
          <Image
            $imageUrl={
              program[0].images ? currentImage.imgUrl : program[0].thumbnail
            }
          />
          <Slides>
            {/* 여러개일 때 클릭 추가, 하나일 때는 슬라이드만 */}
            {program[0].images ? (
              program[0].images.map((image, index) => (
                <Slide
                  onClick={() => {
                    setCurrentImage({ index, imgUrl: image });
                  }}
                  key={"image" + index}
                  $url={image}
                >
                  {/* Todo : slide cover 전환 구현 */}
                  {index === currentImage.index ? null : <SlideCover />}
                </Slide>
              ))
            ) : (
              <Slide $url={program[0].thumbnail}></Slide>
            )}
          </Slides>
        </ImageContainer>
        <IntroContainer>
          <Intro>
            <IntroRow>
              <IntroCol>별점</IntroCol>
              <IntroCol>
                <div>
                  <StarAvgContainer programId={program[0].id} />
                </div>
              </IntroCol>
            </IntroRow>
            <IntroRow>
              <IntroCol>커리큘럼</IntroCol>
              <IntroCol className="curri">
                {program[0].curriculum
                  ? program[0].curriculum
                  : "제공되지 않음"}
              </IntroCol>
            </IntroRow>
            <IntroRow>
              <IntroCol>난이도</IntroCol>
              <IntroCol>{program[0].difficulty}</IntroCol>
            </IntroRow>
          </Intro>
          <Intro>
            <IntroRow>
              <IntroCol>운영시간</IntroCol>
              <IntroCol>
                {program[0].open_time.substring(0, 5)} ~{" "}
                {program[0].close_time.substring(0, 5)}
              </IntroCol>
            </IntroRow>
            <IntroRow>
              <IntroCol>운영기간</IntroCol>
              <IntroCol>
                {program[0].open_month}월 ~ {program[0].close_month}월
              </IntroCol>
            </IntroRow>
          </Intro>
          <Intro>
            <IntroRow>
              <IntroCol>홈페이지</IntroCol>
              <IntroCol>
                <a
                  href={program[0].booking_page}
                  style={{ marginRight: "8px" }}
                  target="_blank"
                >
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.3399 8.22759L9.79305 0.68462L9.28719 0.17876C9.17193 0.0642613 9.01606 0 8.8536 0C8.69113 0 8.53526 0.0642613 8.42 0.17876L0.367268 8.22759C0.249165 8.34523 0.155826 8.48534 0.0927609 8.63965C0.0296957 8.79396 -0.00181763 8.95934 8.09564e-05 9.12603C0.00789346 9.81353 0.580159 10.3624 1.26766 10.3624H2.09774V16.7237H15.6095V10.3624H16.4571C16.7911 10.3624 17.1055 10.2315 17.3419 9.99517C17.4582 9.87917 17.5504 9.74125 17.6131 9.58938C17.6758 9.4375 17.7078 9.2747 17.7071 9.1104C17.7071 8.77837 17.5763 8.46392 17.3399 8.22759ZM9.94735 15.3174H7.75985V11.3331H9.94735V15.3174ZM14.2032 8.9561V15.3174H11.1973V10.8643C11.1973 10.4327 10.8477 10.0831 10.4161 10.0831H7.2911C6.85946 10.0831 6.50985 10.4327 6.50985 10.8643V15.3174H3.50399V8.9561H1.62899L8.85555 1.7354L9.30672 2.18657L16.0802 8.9561H14.2032Z"
                      fill="#3592F0"
                    />
                    <path
                      d="M14.2032 8.9561V15.3174H11.1973V10.8643C11.1973 10.4327 10.8477 10.0831 10.4161 10.0831H7.2911C6.85946 10.0831 6.50985 10.4327 6.50985 10.8643V15.3174H3.50399V8.9561H1.62899L8.85555 1.7354L9.30672 2.18657L16.0802 8.9561H14.2032Z"
                      fill="#F4FCFF"
                    />
                  </svg>
                </a>
                <a href={"#"} target="_blank">
                  <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.54036 0H12.5404C15.207 0 17.3737 2.16667 17.3737 4.83333V11.8333C17.3737 13.1152 16.8645 14.3446 15.958 15.251C15.0516 16.1574 13.8222 16.6667 12.5404 16.6667H5.54036C2.8737 16.6667 0.707031 14.5 0.707031 11.8333V4.83333C0.707031 3.55145 1.21626 2.32208 2.12268 1.41565C3.02911 0.509225 4.25848 0 5.54036 0ZM5.3737 1.66667C4.57805 1.66667 3.81499 1.98274 3.25238 2.54535C2.68977 3.10796 2.3737 3.87102 2.3737 4.66667V12C2.3737 13.6583 3.71536 15 5.3737 15H12.707C13.5027 15 14.2657 14.6839 14.8284 14.1213C15.391 13.5587 15.707 12.7956 15.707 12V4.66667C15.707 3.00833 14.3654 1.66667 12.707 1.66667H5.3737ZM13.4154 2.91667C13.6916 2.91667 13.9566 3.02641 14.1519 3.22176C14.3473 3.41711 14.457 3.68207 14.457 3.95833C14.457 4.2346 14.3473 4.49955 14.1519 4.6949C13.9566 4.89025 13.6916 5 13.4154 5C13.1391 5 12.8741 4.89025 12.6788 4.6949C12.4834 4.49955 12.3737 4.2346 12.3737 3.95833C12.3737 3.68207 12.4834 3.41711 12.6788 3.22176C12.8741 3.02641 13.1391 2.91667 13.4154 2.91667ZM9.04036 4.16667C10.1454 4.16667 11.2052 4.60565 11.9866 5.38705C12.768 6.16846 13.207 7.22826 13.207 8.33333C13.207 9.4384 12.768 10.4982 11.9866 11.2796C11.2052 12.061 10.1454 12.5 9.04036 12.5C7.9353 12.5 6.87549 12.061 6.09409 11.2796C5.31268 10.4982 4.8737 9.4384 4.8737 8.33333C4.8737 7.22826 5.31268 6.16846 6.09409 5.38705C6.87549 4.60565 7.9353 4.16667 9.04036 4.16667ZM9.04036 5.83333C8.37732 5.83333 7.74144 6.09672 7.2726 6.56557C6.80376 7.03441 6.54036 7.67029 6.54036 8.33333C6.54036 8.99637 6.80376 9.63226 7.2726 10.1011C7.74144 10.5699 8.37732 10.8333 9.04036 10.8333C9.70341 10.8333 10.3393 10.5699 10.8081 10.1011C11.277 9.63226 11.5404 8.99637 11.5404 8.33333C11.5404 7.67029 11.277 7.03441 10.8081 6.56557C10.3393 6.09672 9.70341 5.83333 9.04036 5.83333Z"
                      fill="#3592F0"
                    />
                  </svg>
                </a>
              </IntroCol>
            </IntroRow>
            <IntroRow>
              <IntroCol>전화번호</IntroCol>
              <IntroCol>{program[0].BUSINESS.business_contact}</IntroCol>
            </IntroRow>
            <IntroRow>
              <IntroCol>위치</IntroCol>
              <IntroCol>{program[0].BUSINESS.business_address}</IntroCol>
            </IntroRow>
          </Intro>
          <PriceBox>
            <h2>
              {addCommaintoMoney(
                program[0].price +
                  Number(
                    selectedOptions.opt1
                      ? options[
                          options.findIndex(
                            (option) =>
                              option.id === Number(selectedOptions.opt1)
                          )
                        ].option_price
                      : ""
                  ) +
                  Number(
                    selectedOptions.opt2
                      ? options[
                          options.findIndex(
                            (option) =>
                              option.id === Number(selectedOptions.opt2)
                          )
                        ].option_price
                      : ""
                  )
              ) + "원"}
            </h2>

            <IntroRow>
              <IntroCol>옵션 1</IntroCol>
              <IntroCol>
                <select onChange={onOption1Selected}>
                  <option value="">선택</option>
                  {isLoading
                    ? "null"
                    : options.map((option) => (
                        <option key={"option1" + option.id} value={option.id}>
                          {option.option_name} : {option.option_price}원
                        </option>
                      ))}
                </select>
              </IntroCol>
            </IntroRow>
            <IntroRow>
              <IntroCol>옵션 2</IntroCol>
              <IntroCol>
                <select
                  disabled={selectedOptions.opt1 ? false : true}
                  onChange={onOption2Selected}
                >
                  <option value="">선택</option>
                  {isLoading
                    ? "null"
                    : options.map((option) => (
                        <option key={"option2" + option.id} value={option.id}>
                          {option.option_name} : {option.option_price}원
                        </option>
                      ))}
                </select>
              </IntroCol>
            </IntroRow>
          </PriceBox>
          <Button
            onClick={() =>
              navigate("booking", {
                state: {
                  opt1: `${
                    selectedOptions.opt1
                      ? options[
                          options.findIndex(
                            (option) =>
                              option.id === Number(selectedOptions.opt1)
                          )
                        ].option_name
                      : ""
                  }`,
                  opt2: `${
                    selectedOptions.opt2
                      ? options[
                          options.findIndex(
                            (option) =>
                              option.id === Number(selectedOptions.opt2)
                          )
                        ].option_name
                      : ""
                  }`,
                },
              })
            }
          >
            예약하기
          </Button>
        </IntroContainer>
      </Main>
      <ReviewsTitle>후기 ({reviews.length})</ReviewsTitle>
      <Reviews>
        <ReviewContainer>
          {reviews.length === 0
            ? "작성된 리뷰가 없습니다."
            : reviews.map((review) => (
                <Link to={"reviews"}>
                  <Review key={"review" + review.id} id={review.id}>
                    <StarContainer review={review}>
                      {[...Array(review.score)].map((_, i) => (
                        <svg
                          key={"full" + i}
                          width="20"
                          height="20"
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
                      {[...Array(5 - review.score)].map((_, i) => (
                        <svg
                          key={"empty" + i}
                          width="20"
                          height="20"
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
                    </StarContainer>
                    <ReviewContent>{review.content}</ReviewContent>
                  </Review>
                </Link>
              ))}
        </ReviewContainer>
      </Reviews>
    </Wrapper>
  );
}
