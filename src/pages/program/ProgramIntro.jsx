import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 810px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: tomato;
  gap: 32px;
`;

const Main = styled.div`
  background-color: blue;
  height: 514px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ImageContainer = styled.div`
  width: 300px;
  background-color: tomato;
  display: flex;
  flex-direction: column;
`;

const Image = styled.div`
  width: 100%;
  height: 400px;
  background-image: url(${(props) => props.$imageUrl});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Slides = styled.div`
  height: 114px;
  background-color: black;
  overflow-x: scroll;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Slide = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  display: inline-block;
  background-color: grey;
  &:first-child {
    margin-left: 10px;
  }
  &:last-child {
    margin-right: 10px;
  }

  background-image: url(${(props) => props.$url});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const IntroContainer = styled.div`
  width: 324px;
  height: 100%;
  background-color: pink;
`;

const Reviews = styled.div`
  width: 100%;
  height: 200px;
  background-color: red;
`;

export default function ProgramIntro() {
  const { program } = useOutletContext();

  const [image, setImage] = useState(program[0].thumbnail);

  return (
    <Wrapper>
      <Main>
        <ImageContainer>
          <Image $imageUrl={program[0].images ? image : program[0].thumbnail} />
          <Slides>
            {program[0].images ? (
              program[0].images.map((p, i) => (
                <Slide
                  onClick={() => {
                    setImage(p);
                  }}
                  key={i}
                  $url={p}
                />
              ))
            ) : (
              <Slide $url={program[0].thumbnail} />
            )}
          </Slides>
        </ImageContainer>
        <IntroContainer></IntroContainer>
      </Main>
      <Reviews></Reviews>
    </Wrapper>
  );
}
