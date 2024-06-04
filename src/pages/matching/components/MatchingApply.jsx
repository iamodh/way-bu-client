import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../../atom";
import { useState, useEffect } from "react";

const FrameWrapperRoot = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  height: 100%;
  gap: var(--gap-base);
  margin: auto;
  @media screen and (max-width: 376px) {
    width: 310px;
    height: 560px;
  }
`;

const Div = styled.div`
  width: 274px;
  position: relative;
  font-size: var(--m-size);
  font-family: var(--l-bold);
  color: var(--gray);
  text-align: center;
  display: inline-block;
  font-weight: bold;
`;

const Title = styled.div`
  margin: 10px;
  box-sizing: border-box;
  max-width: 100%;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  height: 50px;
  width: 95%;
  line-height: 50px;
  text-align: center;
  background-color: aliceblue;
`;

const FrameGroup = styled.nav`
  margin: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--gap-9xs);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;
const FrameGroup1 = styled.nav`
  margin: 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: var(--gap-9xs);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 376px) {
  
  }
`;

const Schedulebox = styled.div`
  font-weight: bold;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  height: 40px;
  line-height: 40px;
  flex: 1;
  border-radius: var(--br-8xs);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 374px;
  max-width: 100%;
 @media screen and (max-width: 376px) {
    min-width: 210px;
    height: 30px;
    line-height: 30px;
    font-size: var(--font-size-s);
  }
`;

const FrameDiv = styled.div`
  width: 767px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  box-sizing: border-box;
  max-width: 100%;
  padding: 5px 10px;
`;
const FrameParent1 = styled.div`
  margin-top: 10px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 200px;
`;
const Divbox = styled.div`
  padding: 5px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 40px;
  line-height: 30px;
  background-color: var(--color-blue-vivid);
  width: 80px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 376px) {
    width: 70px;
    height: 30px;
    line-height: 20px;
    font-size: var(--font-size-s);
  }
`
const Textbox = styled.div`
  font-weight: bold;
  height: 200px;
  width: 100%;
  padding: 20px;
  text-align: left;
  box-sizing: border-box;
  font-size: var(--font-size-m);
  background-color: aliceblue;
  border-radius: 15px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 376px) {
    width: 300px;
    height: 130px;
  }
`;

const Textbox1 = styled.textarea`
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: none;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  font-size: var(--font-size-m);
  color: var(--color-navy);
  padding: 10px;
  resize: none;
  outline: none;
  @media screen and (max-width: 376px) {
    width: 300px;
    height: 70px;
    font-size: var(--font-size-s);
  }
`;

const Button = styled.button`
  border: none;
  width: 150px;
  padding: var(--padding-base) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? 'gray' : 'var(--color-navy)')};
    box-sizing: border-box;
  }
`;
const DivRoot = styled.div`
  margin: 0px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  gap: var(--gap-base);
  @media screen and (max-width: 675px) {
    gap: var(--gap-base);
    box-sizing: border-box;
  }
`;
const Div2 = styled.div`
  position: relative;
  font-size: var(--font-size-m);
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
  
`;
const Divbox1 = styled.div`
  padding: 10px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 40px;
  line-height: 20px;
  width: 90px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 376px) {
    width: 70px;
    height: 30px;
    line-height: 10px;
    font-size: var(--font-size-s);
  }
`
const CommentWrapper = styled.div`
  padding: 10px;
  border: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 150px;
  line-height: 20px;
  width: 550px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 376px) {
    width: 70px;
    height: 30px;
    line-height: 10px;
    font-size: var(--font-size-s);
  }
`

const CommentBox = styled.input`
  
`


const MatchingApply = ({ matching, sport, beach }) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [isHostUser, setIsHostUser] = useState(matching.host_userId === loggedInUser.id);
  const [isApplied, setIsApplied] = useState(false);
  const [allMatchingComments, setAllMatchingComments] = useState([]);

  const getMatchingComments = async () => {
    let { data: matchings, error } = await client
      .from("MATCHING_COMMENT")
      .select(
        "comment, user_id"
      );
    setAllMatchingComments(matchingcomments);
  };

  const handleButtonClick = () => {
    if (isHostUser) {
      return;
    } else {
      if (isApplied) {
        const cancel = window.confirm('매칭을 취소하시겠습니까?');
        if (cancel) {
          setIsApplied(false);
        }
      } else {
        const apply = window.confirm('매칭을 신청하시겠습니까?');
        if (apply) {
          setIsApplied(true);
        }
      }
    }
  };
  

  return (
    <FrameWrapperRoot>
      <FrameParent1 key={matching.id}>
        <Title>
          <Div>{matching.title}</Div>
        </Title>
        <FrameGroup>
          <Divbox1 style={{width:"110px"}}>#{sport.title}</Divbox1>
          <Divbox1>#{matching.difficulty}</Divbox1>
          <Divbox1 style={{width:"150px"}}>#{beach.beach_name}</Divbox1>
        </FrameGroup>
        <FrameGroup1>
          <FrameDiv>
            <Divbox>참가인원</Divbox>
            <Divbox1>{matching.joining_user}/{matching.total_people}명</Divbox1>
          </FrameDiv>
          <FrameDiv>
            <Divbox>모집상태</Divbox>
            <Divbox1>{matching.state}</Divbox1>
          </FrameDiv>
        </FrameGroup1>
        <FrameDiv style={{paddingTop:"0px"}}>
          <Divbox>일정</Divbox>
          <Schedulebox>{matching.matching_date} {matching.matching_time}</Schedulebox>
        </FrameDiv>
        <FrameDiv style={{paddingTop:"0px"}}>
          <Divbox>멤버</Divbox>
          <Schedulebox></Schedulebox>
        </FrameDiv>
        <DivRoot>
          <Textbox>{matching.required}</Textbox>
          <CommentWrapper>
            <CommentBox type="text"></CommentBox>
            <Button></Button>
          </CommentWrapper>
          <Button onClick={handleButtonClick}>
            <Div2>신청 취소하기</Div2>
          </Button>
        </DivRoot>
      </FrameParent1>
    </FrameWrapperRoot>
  );
};

export default MatchingApply;

