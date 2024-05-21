import styled from "styled-components";
import Button from "../../components/ButtonBlue";

const Title = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--padding-xs) 0px 0px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: var(--font-size-xl);
`;

const ItemTitle = styled.div`
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-xs) 0px 0px;
  box-sizing: border-box;
  font-weight: bold;
`;
const InputText = styled.input`
  border: 1px solid var(--color-gray);
  outline: none;
  align-self: stretch;
  height: 40px;
  position: relative;
  border-radius: var(--br-8xs);
  box-sizing: border-box;
  min-width: 178px;
  padding: var(--padding-5xs);
  font-size: inherit;
`;
const InputBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-sizing: border-box;
  min-width: 200px;
`;
const Div = styled.div`
  position: relative;
  font-size: var(--font-size-ml);
  line-height: 20px;
  color: inherit;
  text-align: center;
  display: inline-block;
  min-width: 32px;
`;
const BtnConfirm = styled.button`
  cursor: pointer;
  border: 1px solid var(--color-blue-main);
  padding: var(--padding-xs);
  background-color: transparent;
  min-width: 50px;
  border-radius: var(--br-xl);
  box-sizing: border-box;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--color-blue-main);
  &:hover {
    background-color: var(--color-skyblue-background);
  }
  &:active {
    background-color: var(--color-blue-main);
    color: var(--color-white);
  }
`;
const Item = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-base);
  text-align: left;
  font-size: var(--font-size-ml);
  color: var(--black);
  font-family: inherit;
`;

const ItemBox = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: var(--gap-base);
  text-align: left;
  font-size: var(--font-size-ml);
  color: var(--black);
  font-family: inherit;
  padding: 0px var(--padding-45xl);
`;

const MypageUpdateWarpper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--gap-21xl);
  text-align: left;
  font-size: var(--font-size-ml);
  color: var(--black);
  font-family: inherit;
`;

const MypageUpdate = () => {
  return (
    <MypageUpdateWarpper>
      <Title>개인정보 수정하기</Title>
      <ItemBox>
        <Item>
          <ItemTitle>이름</ItemTitle>
          <InputBox>
            <InputText type="text" />
          </InputBox>
        </Item>
        <Item>
          <ItemTitle>생년월일</ItemTitle>
          <InputBox>
            <InputText type="text" />
          </InputBox>
        </Item>
        <Item>
          <ItemTitle>이메일</ItemTitle>
          <InputBox>
            <InputText type="text" />
          </InputBox>
        </Item>
        <Item>
          <ItemTitle>비밀번호 변경</ItemTitle>
          <InputBox>
            <InputText type="text" />
          </InputBox>
        </Item>
        <Item>
          <ItemTitle>전화번호</ItemTitle>
          <InputBox>
            <InputText type="text" />
          </InputBox>
          <BtnConfirm>
            <Div>인증</Div>
          </BtnConfirm>
        </Item>
      </ItemBox>
      <Button text={"저장하기"} size={"l"} />
    </MypageUpdateWarpper>
  );
};

export default MypageUpdate;
