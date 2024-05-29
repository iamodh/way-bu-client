import { Link, Outlet, useMatch, useParams } from "react-router-dom";
import { client } from "../../../libs/supabase";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SportsTag from "./components/SportsTag";

const Wrapper = styled.div``;

const Main = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

/* Header: 프로그램명, nav */
const Header = styled.div``;

const Title = styled.div`
  padding: 50px 0;
  display: flex;
  align-items: center;
  padding-left: 32px;
  gap: 16px;
  border-bottom: 1px solid var(--color-blue-main);
  @media only screen and (max-width: 376px) {
    flex-direction: column;
    padding-left: 0;
    margin-top: 20px;
    padding: 30px 0;
  }
`;

const ProgramName = styled.h1`
  font-size: var(--font-size-xxl);
  font-weight: 700;

  @media only screen and (max-width: 376px) {
    font-size: var(--font-size-xl);
  }
`;

const Tags = styled.div`
  gap: 8px;
  display: flex;
`;

const Nav = styled.nav`
  height: 56px;
  display: flex;
  border-right: 1px solid var(--color-blue-main);
  border-left: 1px solid var(--color-blue-main);
  a {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size-l);
    font-weight: 500;
    border: 1px solid var(--color-blue-light);
    background-color: var(--color-skyblue-light);

    @media only screen and (max-width: 376px) {
      font-size: var(--font-size-m);
    }
    &:hover {
      background-color: var(--color-blue-vivid);
    }
    transition: all 0.1s ease-in;
  }
`;

export default function ProgramLayout() {
  const { programId } = useParams();

  /* Get each program */
  const [program, setProgram] = useState([]);
  const [programLoading, setProgramLoading] = useState(true);

  const getProgram = async () => {
    const { data, error } = await client
      .from("PROGRAM")
      .select(
        `*, SPORT (title, id, theme_color), BEACH (beach_name, id, theme_color), BUSINESS (business_address, business_contact)`
      )
      .eq("id", programId);
    if (error) {
      return;
    }
    if (data) {
      setProgram(data);
    }
    setProgramLoading(false);
  };

  /* Get each program's all reviews */
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const getReviews = async () => {
    const { data, error } = await client
      .from("PROGRAM_REVIEW")
      .select(`*, USER_PROFILE (id, user_nickname, avatar_url)`)
      .eq("program_id", programId);
    if (error) {
      return;
    }
    if (data) {
      setReviews(data);
    }
    setReviewsLoading(false);
  };

  useEffect(() => {
    getProgram();
    getReviews();
  }, []);

  const matchBookingPage = useMatch("program/:id/booking");

  return (
    <>
      <Wrapper>
        {/* <Main>
          <Header>
            <Title>
              <ProgramName>프로그램명</ProgramName>
              <Tags>
                <SportsTag themeColor={"green"} key={1} text={"수영"} />
                <SportsTag themeColor={"red"} key={2} text={"해운대해수욕장"} />
              </Tags>
            </Title>
            <Nav>
              <Link to={`/program/${programId}`}>소개</Link>
              <Link to="detail">상세정보</Link>
              <Link to="reviews">후기</Link>
            </Nav>
          </Header>
          <Outlet context={{ program }} />
        </Main> */}
        {programLoading ? (
          "Loading..."
        ) : (
          <Main>
            <Header>
              <Title>
                <ProgramName>{program[0].program_name}</ProgramName>
                <Tags>
                  <SportsTag
                    themeColor={program[0].SPORT.theme_color}
                    key={program[0].SPORT.id}
                    text={program[0].SPORT.title}
                  />
                  <SportsTag
                    themeColor={program[0].BEACH.theme_color}
                    key={program[0].BEACH.id}
                    text={program[0].BEACH.beach_name}
                  />
                </Tags>
              </Title>
              {matchBookingPage ? null : (
                <Nav>
                  <Link to={`/program/${programId}`}>소개</Link>
                  <Link to="detail">상세정보</Link>
                  <Link to="reviews">후기</Link>
                </Nav>
              )}
            </Header>
            <Outlet
              context={{
                program,
                reviews,
              }}
            />
          </Main>
        )}
      </Wrapper>
    </>
  );
}
