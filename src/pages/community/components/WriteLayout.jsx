import styled from "styled-components";

export const WriteTagBox = styled.div`
  display: flex;
`;

export const WriteTopBox = styled.div`
  @media screen and (max-width: 768px) {
    display: block;
  }
  display: flex;
  align-items: center;
`;

export const TagInput = styled.select`
  padding: 1rem;
  width: 6rem;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
  text-align-last: center;
  -webkit-appearance: none; /* 크롬 화살표 없애기 */
  -moz-appearance: none; /* 파이어폭스 화살표 없애기 */
  appearance: none; /* 화살표 없애기 */
`;
export const WriteTitle = styled.input`
  flex: 1;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.6);
  @media screen and (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
  }
`;

export const WriteContent = styled.textarea`
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const WriteBtn = styled.button`
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: var(--color-blue-main);
  color: white;
  width: 6rem;
`;

export const WriteBtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
