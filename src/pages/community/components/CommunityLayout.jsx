import styled, { keyframes } from "styled-components";

export const ComWrapper = styled.div`
  @media (max-width: 768px) {
    & * {
      font-size: 0.8rem;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 350px;
  max-width: 1000px;
  width: 80%;
  margin: 1rem auto;
  flex-direction: column;
  & * {
    box-sizing: border-box;
  }
`;

export const TitleBox = styled.div`
  @media (max-width: 768px) {
    margin-top: 1rem;
    font-size: 1.5rem;
    display: none;
  }
  font-size: var(--font-size-xxl);
  font-weight: 700;
  color: var(--color-blue-main);
  margin-top: 3rem;
`;

export const PostWrapper = styled.div`
  width: 100%;
  margin: 1rem auto;
`;

export const PostBox = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #b9b9b9;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
  position: relative;
`;

export const PostLeft = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 10rem;
`;

export const PostLeftTop = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

export const PostLeftBottom = styled.div`
  display: flex;
`;
export const PostTitle = styled.div`
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 40rem;
  @media (max-width: 1280px) {
    max-width: 30rem;
  }

  @media (max-width: 1000px) {
    max-width: 23rem;
  }
  @media (max-width: 768px) {
    max-width: 18rem;
  }
  @media (max-width: 480px) {
    max-width: 15rem;
  }
`;

export const PostUser = styled.div`
  margin-right: 0.5rem;
`;

export const PostDate = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

export const PostTag = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
  border: 1px solid black;
  border-radius: 0.6rem;
  margin-right: 1rem;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem;
  text-align: center;
  &:nth-child(2) {
    margin-right: 0.5rem;
  }
`;

export const PostView = styled.div`
  position: absolute;
  right: 0.5rem;
`;

export const PostThumb = styled.div`
  @media (max-width: 768px) {
    width: 1.8rem;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  border: 1px solid black;
  height: 2rem;
  width: 2rem;
  line-height: 2rem;
  border-radius: 0.3rem;
  text-align: center;
  margin-right: 1rem;
`;

export const PostComment = styled.div`
  margin-left: 1rem;
`;

export const PostDesc = styled.div`
  @media screen and (max-width: 768px) {
    margin-right: 0.8rem;
  }
  margin-right: 1.3rem;
  &:last-child {
    position: absolute;
    margin: 0;
    right: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const TagWrapper = styled.div`
  @media screen and (max-width: 1120px) {
    display: none;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 1rem 0;
  width: 100%;
`;

export const TagContainer = styled.div`
  min-width: 320px;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const TagBox = styled.div`
  border-radius: 0.6rem;
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.6);

  text-align: center;
  background-color: ${(props) =>
    props.selected ? "var(--color-skyblue-main)" : "white"};
  &:hover {
    cursor: pointer;
  }
`;

export const TagName = styled.div`
  @media screen and (max-width: 768px) {
    width: 2rem;
  }
  font-weight: 700;
  width: 5rem;
  margin: 0 1rem;
  text-align: center;
`;

export const PageWrapper = styled.div`
  display: flex;
  margin: 1rem auto;
`;

export const PageBox = styled.div`
  @media screen and (max-width: 768px) {
    margin: 0 0.3rem;
  }
  margin: 0 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

export const PageBtn = styled.div`
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
  &:hover {
    cursor: pointer;
  }
  &:nth-child(n + 1) {
    margin-right: 0.3rem;
  }
`;

export const WriteBox = styled.div`
  width: 100%;
  position: relative;
`;

export const WriteButton = styled.button`
  background-color: var(--color-blue-main);
  color: white;
  border: none;
  font-size: var(--font-size-ml);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  float: right;
`;

export const SearchForm = styled.form`
  width: 50%;
  min-width: 320px;
  position: relative;
`;

export const SearchBox = styled.input`
  width: 100%;
  height: 2rem;
  border: 1px solid var(--color-blue-main);
  margin: 0 auto;
  border-radius: 0.2rem;
`;

export const SearchBtn = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  position: absolute;
  right: 0;
  top: 0.2rem;
`;

const expand = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 15rem; /* 드롭다운의 최대 높이를 설정 */
    opacity: 1;
  }
`;

export const DropdownBox = styled.div`
  position: absolute;
  width: 6rem;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 1;
  overflow: hidden;
  animation: ${expand} 0.3s ease-in-out;
`;

export const DropdownComponent = styled.div`
  padding: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
  }
`;

export const TagTitle = styled.div``;
