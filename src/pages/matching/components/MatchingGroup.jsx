import styled from "styled-components";
import { useState, useEffect } from "react";
import { client } from "../../../../libs/supabase";
import SportTag from "../../../components/SportTag";

const MatchingIcon = styled.img`
  height: 100px;
  width: 100px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  margin-left: 15px;
  min-height: 100px;
  @media screen and (max-width: 450px) {
    flex: 1;
  }
`;
const Div = styled.div`
  position: relative;
  font-size: var(--m-size);
  letter-spacing: 0.01em;
  font-family: var(--font-noto-sans-kr);
  color: var(--color-darkblue);
  text-align: left;
  display: inline-block;
  min-width: 30px;
`;
const People = styled.button`
  cursor: pointer;
  border: none;
  padding: var(--padding-9xs) var(--padding-5xs);
  background-color: var(--color-thistle-100);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-thistle-200);
  }
`;
const Div1 = styled.div`
  position: relative;
  font-size: var(--m-size);
  letter-spacing: 0.01em;
  font-family: var(--font-noto-sans-kr);
  color: var(--color-darkblue);
  text-align: left;
  display: inline-block;
  min-width: 45px;
`;
const Place = styled.button`
  cursor: pointer;
  border: none;
  padding: var(--padding-9xs) var(--padding-5xs);
  background-color: var(--color-lavender);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-lightsteelblue-200);
  }
`;
const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: var(--padding-9xs) var(--padding-5xs);
  background-color: var(--color-pink-100);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-pink-200);
  }
`;
const MatchingTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  gap: var(--gap-9xs);
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--gap-13xl);
  box-sizing: border-box;
  padding: 0 20%;

  @media screen and (max-width: 850px) {
    grid-template-columns: 1fr;
    padding: 0 10%;
  }

  @media screen and (max-width: 450px) {
    padding: 0 5%;
  }
`;

// const MatchingGroupRoot = styled.div`
//   box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
//   min-width: 277px;
//   max-width: 100%;
//   text-align: left;
//   @media screen and (max-width: 450px) {
//     flex-wrap: wrap;
//   }
// `;

const MatchingContainer = styled.div`
  max-width: 500px;
  min-width: 400px;
  height: 150px;
  padding: var(--padding-8xl) var(--padding-13xl);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  border: none;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 1px 1px 1px 1px gainsboro;
  gap: var(--gap-base);
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: var(--color-skyblue-main);
  }
`;

const ContainerDetails = styled.div`
  font-size: var(--font-size-m);
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 15px;
  @media screen and (max-width: 450px) {
    flex-wrap: wrap;
  }
`;

const H = styled.div`
  position: relative;
  font-size: var(--font-size-xl);
  font-weight: bold;
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-l);
  }
`;

const P = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  font-size: var(--font-size-m);
  font-weight: bold;
  gap: var(--gap-5xs);
`;


const MatchingGroup = () => {
  const [matchings, setMatchings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMatchings();
  }, []);

  async function getMatchings() {
    const { data, error } = await client
      .from("MATCHING")
      .select(`title, matching_time, difficulty, location`);
    setMatchings(data);
    setIsLoading(false);
    if (error) {
      console.log(error.message);
      return;
    }
  }
  return (
    <Wrapper >
      {isLoading ? (
        "Loading..."
      ) : (
        matchings.map((m) => (
          <MatchingContainer key={m.id}>
            <MatchingIcon
              loading="lazy"
              alt=""
              src="../img/matchingSurfing.png"
            />
              <ContainerDetails>
                <Title>
                  <H>{m.title}</H>
                  <MatchingTag>
                    <People>
                      <Div>
                        <SportTag prop = "서핑" />
                      </Div>
                    </People>
                    <Place>
                      <Div1>
                        <SportTag prop = "서핑" />
                      </Div1>
                    </Place>
                      <Div>
                        <SportTag prop = "서핑" />
                      </Div>
                  </MatchingTag>
                </Title>
                <P>상세 위치 : <div style={{fontWeight:"normal"}}>{m.location}</div></P>
                <P>시간 : <div style={{fontWeight:"normal"}}>{m.matching_time}</div></P>
                <P>난이도 : <div style={{fontWeight:"normal"}}>{m.difficulty}</div></P>
              </ContainerDetails>
            </MatchingContainer>
        ))
      )}
    </Wrapper>
  );
};

export default MatchingGroup;
