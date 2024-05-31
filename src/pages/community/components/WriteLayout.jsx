import styled from "styled-components";

export const ComWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  margin: 0 auto;
  flex-direction: column;
  & * {
    box-sizing: border-box;
  }
`;

export const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorMsg = styled.span`
  color: red;
`;

export const PostNameBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PostsBox = styled.div`
  display: flex;
  margin: 10px 0;
  width: 100%;
`;

export const PostBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #b9b9b9;
  padding: 0.5rem 0;
`;

export const PostLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostLeftTop = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const PostLeftBottom = styled.div`
  display: flex;
`;

export const PostCenter = styled.div``;

export const PostRight = styled.div`
  display: flex;
`;

export const PostTitle = styled.div`
  font-weight: 700;
`;

export const PostUser = styled.div`
  margin-right: 0.5rem;
`;

export const PostDate = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

export const PostTag = styled.div``;

export const PostView = styled.div``;

export const PostThumb = styled.div`
  margin: 0 1rem;
`;

export const PostComment = styled.div`
  margin-left: 1rem;
`;

export const ComponentBox = styled.div`
  margin: 0 10px;
  width: 50px;
  &:nth-child(4) {
    width: 200px;
  }
  &:nth-child(6) {
    width: 100px;
  }
  &:nth-child(2):hover,
  &:nth-child(3):hover,
  &:nth-child(5):hover,
  &:nth-child(7):hover {
    cursor: pointer;
  }
`;
