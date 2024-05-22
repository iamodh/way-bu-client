import { NavLink } from "react-router-dom";
import styled from "styled-components";

const EditIcon = styled.img`
  width: 48px;
  height: 48px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  @media screen and (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;
const Text = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  font-size: var(--font-size-m);
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-s);
  }
`;
const Box = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
    gap: var(--gap-9xs);
  }
`;

const IndexButton = ({ edit, text }) => {
  return (
    <Box>
      <EditIcon loading="lazy" alt={text} src={edit} />
      <Text>{text}</Text>
    </Box>
  );
};

export default IndexButton;
