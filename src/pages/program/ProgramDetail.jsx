import { useParams } from "react-router-dom";
import { client } from "../../../libs/supabase";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Main = styled.div`
  background-color: tomato;
  max-width: 720px;
  height: 100vh;
  margin: 0 auto;
`;

/* Header: 프로그램명, nav */
const Header = styled.div`
  height: 159px;
  background-color: teal;
`;

const Title = styled.div`
  height: 103px;
  display: flex;
  align-items: center;
  padding-left: 32px;
  gap: 16px;
`;

const ProgramName = styled.h1`
  font-size: var(--font-size-xxl);
  font-weight: 700;
`;

const Tags = styled.div`
  gap: 8px;
`;

const Nav = styled.nav`
  height: 56px;
  display: flex;
`;

const NavItem = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-l);
  font-weight: 500;
  border: 1px solid var(--color-blue-light);
  background-color: var(--color-skyblue-light);
`;

/* Body  */

const Body = styled.div``;

const Reviews = styled.div``;

export default function ProgramDetail() {
  const { programId } = useParams();

  const [program, setProgram] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProgram();
  }, []);
  const getProgram = async () => {
    const { data, error } = await client
      .from("PROGRAM")
      .select(`*, SPORT (title), BEACH (beach_name)`)
      .eq("id", programId);

    if (error) {
      console.log(error.message);
      return;
    }
    if (data) {
      setProgram(data);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Wrapper>
        {isLoading ? (
          "Loading..."
        ) : (
          <Main>
            <Header>
              <Title>
                <ProgramName>{program[0].program_name}</ProgramName>
                <Tags>
                  {program[0].SPORT.title}, {program[0].BEACH.beach_name}
                </Tags>
              </Title>
              <Nav>
                <NavItem>소개</NavItem>
                <NavItem>상세정보</NavItem>
                <NavItem>후기</NavItem>
              </Nav>
            </Header>
            <Body>
              <Reviews></Reviews>
            </Body>
          </Main>
        )}
      </Wrapper>
    </>
  );
}
