import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../../atom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    height: 160px;
  }
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  padding: var(--padding-13xl) var(--padding-5xs);
  height: 100%;
  margin: 0 var(--padding-9xs);

  background: var(--color-skyblue-background, #edf4f7);
  border-radius: var(--br-mini);
  @media screen and (max-width: 768px) {
    border-radius: var(--br-8xs);
    padding: var(--padding-base) var(--padding-5xs);
  }
`;
const ProgramName = styled.div`
  font-size: var(--font-size-l);
  font-weight: bold;
  padding: var(--padding-9xs);
  text-align: center;
  @media screen and (max-width: 768px) {
    padding: 0;
    font-size: var(--font-size-m);
  }
`;
const Business = styled.div`
  font-size: var(--font-size-s);
  margin-bottom: var(--padding-xl);
  text-align: center;

  @media screen and (max-width: 768px) {
    margin-bottom: var(--padding-xs);
  }
`;

const Button = styled.div`
  cursor: pointer;
  border: none;
  width: 120px;
  font-size: var(--font-size-m);
  padding: var(--padding-5xs) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-blue-dark);
    box-sizing: border-box;
  }
  @media screen and (max-width: 768px) {
    padding: var(--padding-5xs);
    width: 60px;
    font-size: var(--font-size-s);
  }
`;

export default function UserProgramItem({ program }) {
  /* 회원정보 불러오기 */
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [loggedInUserProfile, setLoggedInUserProfile] = useRecoilState(
    loggedInUserProfileState
  );

  /* 후기작성 페이지 이동 및 파싱 */
  const navigate = useNavigate();
  const handleButton = ({ program }) => {
    navigate("/mypage/" + loggedInUserProfile.id + "/review-write", {
      state: { ...program },
    });
  };

  return (
    <Wrapper>
      <Item>
        <Link to={"/program/" + program.id}>
          <ProgramName>{program.program_name}</ProgramName>
        </Link>
        <Business>{program.BUSINESS.business_name}</Business>
        <Button onClick={() => handleButton({ program })}>후기쓰기</Button>
      </Item>
    </Wrapper>
  );
}
