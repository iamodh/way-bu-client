import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loggedInUserState } from "../../../atom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { client } from "../../../../libs/supabase";
import { Button, FrameWrapper, FrameParent, TitleBox, TitleText, TagGroup, Text, Group, GroupDiv,TextBox, Schedule, RequiredBox, ButtonText, GroupRoot } from "./MatchingLayout";


const ApplyBox = styled.textarea`
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

const MatchingWatch = ({ matching, sport, beach }) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [isHostUser, setIsHostUser] = useState(matching.host_userId === loggedInUser.id);
  const [isApplied, setIsApplied] = useState(false);
  const [isUserJoined, setIsUserJoined] = useState(false); // 초기값은 false로 설정합니다.
  const [isMatchingFull, setIsMatchingFull] = useState(false); // 모집 상태를 관리하는 상태

  useEffect(() => {
    // matching 객체가 변경될 때마다 isUserJoined 상태를 업데이트합니다.
    setIsUserJoined(matching.joining_users && matching.joining_users.includes(loggedInUser.id));
  }, [matching, loggedInUser.id]);

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 isHostUser 상태를 업데이트합니다.
    setIsHostUser(matching.host_userId === loggedInUser.id);
  }, [matching.host_userId, loggedInUser.id]);

  useEffect(() => {
    // 매칭 상태 업데이트
    const currentParticipants = matching.joining_users ? matching.joining_users.length : 0;
    if (currentParticipants >= matching.total_people) {
      matching.state = "모집완료";
      setIsMatchingFull(true);
    } else {
      matching.state = "모집중";
      setIsMatchingFull(false);
    }
  }, [matching]);

  const handleDeleteMatching = async () => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await client.from('MATCHING').delete().eq('id', matching.id);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting matching:', error.message);
      }
    }
  };
  

  const handleButtonClick = async () => {
    if (isHostUser) {
      return;
    } else {
      if (isUserJoined) {
        const cancel = window.confirm('매칭을 취소하시겠습니까?');
        if (cancel) {
          setIsUserJoined(false);
          try {
            const updatedJoiningUsers = Array.isArray(matching.joining_users) ? matching.joining_users.filter(userId => userId !== loggedInUser.id) : [];
            console.log('Updated join_users after cancellation:', updatedJoiningUsers);
            await client
              .from('MATCHING')
              .update({
                joining_users: updatedJoiningUsers
              })
              .eq('id', matching.id);
            window.location.reload();
          } catch (error) {
            console.error('Error cancelling application for matching:', error.message);
            setIsUserJoined(true); 
          }
        }
      } else {
        const apply = window.confirm('매칭을 신청하시겠습니까?');
        if (apply) {
          setIsUserJoined(true);
          try {
            const updatedJoiningUsers = Array.isArray(matching.joining_users) ? [...matching.joining_users, loggedInUser.id] : [loggedInUser.id];
            console.log('Updated join_users after application:', updatedJoiningUsers);
            await client
              .from('MATCHING')
              .update({
                joining_users: updatedJoiningUsers,
              })
              .eq('id', matching.id);
            window.location.reload();
          } catch (error) {
            console.error('Error applying for matching:', error.message);
            setIsUserJoined(false);
          }
        }
      }
    }
  };

  return (
    <FrameWrapper>
      <FrameParent key={matching.id}>
        <TitleBox>
          <TitleText>{matching.title}</TitleText>
        </TitleBox>
        <TagGroup>
          <Text style={{width:"110px"}}>#{sport.title}</Text>
          <Text>#{matching.difficulty}</Text>
          <Text style={{width:"150px"}}>#{beach.beach_name}</Text>
        </TagGroup>
        <Group>
          <GroupDiv>
            <TextBox>참가인원</TextBox>
            <Text>{matching.joining_users ? matching.joining_users.length : 0}/{matching.total_people}명</Text>
          </GroupDiv>
          <GroupDiv>
            <TextBox>모집상태</TextBox>
            <Text>{matching.state}</Text>
          </GroupDiv>
        </Group>
        <GroupDiv style={{paddingTop:"0px"}}>
          <TextBox>일정</TextBox>
          <Schedule>{matching.matching_date} {matching.matching_time}</Schedule>
        </GroupDiv>
        <GroupRoot>
          <RequiredBox>{matching.required}<br/><br/>
          {matching.necessity_details ? `준비물 : ${matching.necessity_details}` : '준비물이 없습니다.'}</RequiredBox>
          <ApplyBox placeholder="신청 메세지를 입력해주세요." />
          {
            isHostUser ? (
              <>
                <Link to={`/matching/update/${matching.id}`}>
                  <Button>
                    <ButtonText>수정하기</ButtonText>
                  </Button>
                </Link>
                <Button onClick={handleDeleteMatching}>
                  <ButtonText>삭제하기</ButtonText>
                </Button>
              </>
            ) : (
              <Button onClick={handleButtonClick} disabled={isMatchingFull}>
                <ButtonText>{isMatchingFull ? '신청마감' : isUserJoined ? '신청 취소하기' : '신청하기'}</ButtonText>
              </Button>
            )
          }
        </GroupRoot>
      </FrameParent>
    </FrameWrapper>
  );
};

export default MatchingWatch;
