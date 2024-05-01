import styled from "styled-components";

const EditIcon = styled.img`
  width: 48px;
  height: 48px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
`;
const Div = styled.div`
  position: relative;
  line-height: 19.33px;
  display: inline-block;
  min-width: 32px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0px var(--padding-4xs) 0px var(--padding-6xs);
`;
const EditParentRoot = styled.div`
  border-radius: var(--br-xl);
  background-color: var(--background-skyblue);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: var(--padding-2xs-5) var(--padding-5xl);
  gap: var(--gap-5xs);
  text-align: left;
  font-size: var(--m-size);
  color: var(--black);
  font-family: var(--l-bold);
`;

const FrameComponent1 = ({ edit, prop }) => {
  return (
    <EditParentRoot>
      <EditIcon loading="lazy" alt="" src={edit} />
      <Wrapper>
        <Div>{prop}</Div>
      </Wrapper>
    </EditParentRoot>
  );
};

export default FrameComponent1;
