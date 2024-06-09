import styled from "styled-components";

export const PostWrapper = styled.div`
  @media (max-width: 768px) {
    & * {
      font-size: 0.8rem;
    }
    padding-top: 0;
  }
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 1000px;
  width: 80%;
  min-width: 350px;
  margin: 2rem auto;
  flex-direction: column;
  & * {
    box-sizing: border-box;
    border-collapse: collapse;
  }
  border: 1px solid var(--color-blue-main);
  padding: 1rem;
  border-radius: 0.5rem;
  position: relative;
`;

export const PostTitleContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0%;
  align-items: center;
  @media (max-width: 768px) {
    padding-bottom: 0.5rem;
  }
`;

export const PostTitle = styled.div`
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-left: 0;
  }
  flex: 1;
  margin-left: 0.5rem;
  font-size: var(--font-size-l);
  font-weight: 700;
  word-break: break-all;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const PostTag = styled.div`
  @media (max-width: 768px) {
    height: 2rem;
  }
  border-radius: 0.6rem;
  margin-right: 0.5rem;
  padding: 0 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.6);
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostAvatar = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

export const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  border: 1px solid var(--color-blue-main);
  border-radius: 0.5rem;
  position: relative;
  margin-bottom: 1rem;
`;

export const PostInfoBottom = styled.div`
  display: flex;
  margin-top: 0.5rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const PostInfoBox = styled.div`
  display: flex;
  margin-right: 1rem;
  &:last-child {
    position: absolute;
    right: 1.5rem;
  }
  @media screen {
    margin: 0;
  }
`;

export const PostInfoItem = styled.div`
  &:first-child {
    margin-right: 0.5rem;
    background-color: var(--color-skyblue-main);
    font-weight: 600;
  }
  padding: 0.4rem;
`;

export const PostContent = styled.div`
  width: 100%;
  border: 1px solid var(--color-blue-main);
  border-radius: 0.5rem;
  min-height: 15rem;
  padding: 2rem;
  position: relative;
  margin-bottom: 1rem;
`;

export const PostBtn = styled.button`
  background-color: white;
  border: 1px solid var(--color-blue-main);
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  float: right;
`;

export const PostBtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ThumbBtn = styled.button`
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  position: absolute;
  bottom: 1rem;
  right: 50%;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  font-size: 1.5rem;
  padding: 0.5rem;
  transform: translate(50%, 0);
  &:hover {
    cursor: pointer;
  }
`;

export const CommentContainer = styled.div`
  width: 100%;
`;

export const CommentForm = styled.form`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentInput = styled.textarea`
  @media (max-width: 768px) {
    height: 3rem;
  }
  height: 3.5rem;
  border-radius: 0.2rem;
  flex: 1;
  padding: 0.3rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
`;

export const CommentInputBtn = styled.button`
  @media (max-width: 768px) {
    width: 4rem;
    height: 3rem;
  }
  border: none;
  background-color: var(--color-blue-main);
  color: white;
  height: 3.5rem;
  width: 6rem;
  margin-left: 0.5rem;
  border-radius: 0.2rem;
`;

export const CommentBox = styled.div`
  background-color: var(--color-skyblue-background);
  padding: 0.6rem 1rem;
  &:nth-child(2) {
    padding-top: 1rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  &:nth-last-child(2) {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    padding-bottom: 1rem;
  }
`;

export const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const CommentItem = styled.div`
  margin-right: 0.5rem;
  &:nth-child(2),
  &:nth-child(3) {
    opacity: 0.6;
  }
  @media (max-width: 768px) {
    &:nth-child(3) {
      display: none;
    }
  }
`;

export const CommentContent = styled.div`
  background-color: white;
  margin: 0 1rem;
  padding: 0.6rem;
  border-radius: 0.3rem;
  @media (max-width: 768px) {
    margin: 0 0.5rem;
  }
`;

export const CommentBtn = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  font-size: 0.7rem;
  padding: 0;
  margin-right: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

export const CommentCount = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
