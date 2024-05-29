import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { client } from "../../../../libs/supabase";
import BeachTag from './BeachTag';
import { getBeach } from "../../../../apis/beach"

const FrameWrapperRoot = styled.form`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  height: 100%;
  gap: var(--gap-base);
  margin: auto;
`;

const Div = styled.div`
  font-size: var(--font-size-s);
  font-weight: bold;
  color: var(--color-blue-main);
  text-align: center;
  height: 45px;
  line-height: 45px;
`;

const Title = styled.input`
  height: 40px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 374px;
  max-width: 100%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const SportTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  max-width: 100%;
  gap: var(--gap-3xs);
`;


const FrameGroup = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: var(--gap-xl);
  white-space: nowrap;
  margin-bottom: 10px;
  @media screen and (max-width: 750px) {
    flex-wrap: wrap;
  }
`;

const Schedulebox = styled.input`
  height: 40px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  max-width: 30%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const NumberInput = styled.input`
  height: 40px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  max-width: 30%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const FrameDiv = styled.div`
  width: 767px;
  display: flex;
  justify-content: flex-start;
  gap: var(--gap-3xs);
  box-sizing: border-box;
  max-width: 100%;
`;

const FrameParent1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 60%;
  margin-top: 25px;
`;

const Divbox = styled.div`
  padding: 10px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  height: 40px;
  line-height: 20px;
  background-color: var(--color-blue-vivid);
  width: 70px;
`;

const Textbox = styled.textarea`
  height: 230px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: var(--font-size-m);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  resize: none;
  border: none;
  outline: none;
  background-color: aliceblue;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  min-width: 150px;
  padding: var(--padding-base) var(--padding-base);
  background-color: var(--color-blue-main);
  color: var(--color-white);
  border-radius: var(--br-3xs);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--color-navy);
    box-sizing: border-box;
  }
`;

const DivRoot = styled.div`
  width: 100%;
  box-sizing: border-box;
  gap: var(--gap-base);
  @media screen and (max-width: 675px) {
    gap: var(--gap-mini);
    box-sizing: border-box;
  }
`;

const Div2 = styled.div`
  position: relative;
  font-size: var(--font-size-m);
  color: inherit;
  text-align: center;
  display: inline-block;
  white-space: nowrap;
`;

const FrameDiv1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const Radio = styled.input`
  &:checked + label {
    color: var(--color-blue-main);
    font-weight: 900;
  }
`;

const RadioLabel = styled.label`
  margin-left: 0px;
  margin-right: 0px;
  height: 45px;
  line-height: 45px;
  font-weight: bold;
  color: var(--color-gray);
  cursor: pointer;
  &:hover {
    color: var(--color-blue-main);
  }
`;

const Dropdown = styled.select`
  height: 40px;
  flex: 1;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  max-width: 60%;
  padding: 0px 20px 0px 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const Necessity = styled.input`
  margin-left: 23px;
  height: 45px;
  flex: 1;
  border-radius: var(--br-8xs);
  border: 1px solid var(--color-blue-main);
  box-sizing: border-box;
  overflow: hidden;
  min-width: 30px;
  max-width: 100%;
  padding: 10px;
  background-color: aliceblue;
  @media screen and (max-width: 675px) {
    min-width: 100%;
  }
`;

const MatchingWrite = () => {
  const [isNecessityRequired, setIsNecessityRequired] = useState(false);
  const [allMatchings, setAllMatchings] = useState([]);
  const [selectedBeachId, setSelectedBeachId] = useState(null);

  const handleNecessityChange = (event) => {
    setIsNecessityRequired(event.target.value === '필요');
  };

  const getMatchings = async () => {
    let { data: matchings, error } = await client
      .from("MATCHINGTEST")
      .select(
        "id, title, matching_date, matching_time, total_people, required, difficulty, necessity, beach_id"
      );
    console.log(matchings);
    setAllMatchings(matchings);
  };

  useEffect(() => {
    getMatchings();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading: beachLoading, data: beachData } = useQuery(
    ["beach"],
    getBeach
  );

  const [clickedTags, setClickedTags] = useState([]);

  const addMatching = async (formData) => {
    const { data, error } = await client
      .from("MATCHINGTEST")
      .insert([
        {
          title: formData.title,
          matching_date: formData.matching_date,
          matching_time: formData.matching_time,
          total_people: formData.total_people,
          required: formData.required,
          difficulty: formData.difficulty,
          necessity: formData.necessity,
          beach_id: selectedBeachId
        },
      ])
      .select();
    if (error) {
      console.error(error);
      return;
    }
    getMatchings();
    console.log("작성완료", data);
  };
  
  const handleTagClicked = (id) => {
    if (clickedTags.includes(id)) {
      setClickedTags((prev) => prev.filter((it) => it !== id));
    } else {
      setClickedTags((prev) => [...prev, id]);
    }
  };

  return (
    <FrameWrapperRoot onSubmit={handleSubmit(addMatching)}>
      <FrameParent1>
        <FrameGroup>
          <FrameDiv>
            <Divbox>제목</Divbox>
            <Title type="text" {...register("title", { required: "제목을 입력해 주세요." })} id='title'/>
          </FrameDiv>
          <FrameDiv>
            <Divbox>위치</Divbox>
            {beachLoading
              ? "Loading..."
              : beachData.map((beach) => {
                  return (
                    <BeachTag
                      key={beach.id}
                      beach={beach}
                      // handleTagClicked 함수를 onClick props로 전달
                      onClick={() => {
                        handleTagClicked(beach.id);
                        setSelectedBeachId(beach.id);
                      }}
                      hasClicked={clickedTags.includes(beach.id)}
                    />
                  );
                })}
          </FrameDiv>
          <FrameDiv1>
            {/* <FrameDiv>
              <Divbox>종목</Divbox>
              <Dropdown>
                <option value="surfing">서핑</option>
                <option value="waterskiing">수상스키</option>
                <option value="wakeboarding">웨이크보드</option>
                <option value="snorkeling">스노클링</option>
                <option value="freediving">프리다이빙</option>
                <option value="yacht">요트</option>
                <option value="kayak">카약</option>
                <option value="paddleboarding">패들보딩</option>
                <option value="etc">기타</option>
              </Dropdown>
            </FrameDiv> */}
            <FrameDiv>
              <Divbox>난이도</Divbox>
                <Radio
                  type="radio"
                  value="상"
                  name="level"
                  id="level1"
                  style={{ opacity: '0' }}
                  {...register("difficulty", { required: "제목을 입력해 주세요." })}
                />
                <RadioLabel htmlFor="level1">상</RadioLabel>
                <Radio
                  type="radio"
                  value="중"
                  name="level"
                  id="level2"
                  style={{ opacity: '0' }}
                  {...register("difficulty", { required: "제목을 입력해 주세요." })}
                />
                <RadioLabel htmlFor="level2">중</RadioLabel>
                <Radio
                  type="radio"
                  value="하"
                  name="level"
                  id="level3"
                  style={{ opacity: '0' }}
                  {...register("difficulty", { required: "제목을 입력해 주세요." })}
                />
                <RadioLabel htmlFor="level3">하</RadioLabel>
            </FrameDiv>
          </FrameDiv1>
          <FrameDiv>
            <Divbox>일정</Divbox>
            <Schedulebox type="date" {...register("matching_date", { required: "제목을 입력해 주세요." })}/>
            <Schedulebox type="time" {...register("matching_time", { required: "제목을 입력해 주세요." })}/>
          </FrameDiv>
          <FrameDiv>
            <Divbox>인원</Divbox>
            <NumberInput type="number" min={1} max={10} {...register("total_people", { required: "제목을 입력해 주세요." })} />
            <Div>최대 10명까지 가능합니다.</Div>
          </FrameDiv>
          <FrameDiv>
            <Divbox>준비물</Divbox>
            <Radio
              type="radio"
              value="필요"
              name='radio'
              id="yes"
              style={{ opacity: '0' }}
              onChange={handleNecessityChange}
              
            />
            <RadioLabel htmlFor="yes">필요</RadioLabel>
            <Radio
              type="radio"
              value="불필요"
              name='radio'
              id="no"
              style={{ opacity: '0' }}
              onChange={handleNecessityChange}
              
            />
            <RadioLabel htmlFor="no">불필요</RadioLabel>
            {isNecessityRequired && <Necessity {...register("necessity", { required: "제목을 입력해 주세요." })} type="text" placeholder="준비물 입력" />}
          </FrameDiv>
        </FrameGroup>
      </FrameParent1>
      <DivRoot>
        <Textbox  {...register("required", { required: "제목을 입력해 주세요." })} />
      </DivRoot>
      <Button type='submit'>
        <Div2>올리기</Div2>
      </Button>
    </FrameWrapperRoot>
  );
};

export default MatchingWrite;
