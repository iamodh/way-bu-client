import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { client } from "../../../../libs/supabase";
import BeachTag from './BeachTag';
import { getBeach } from "../../../../apis/beach"
import { getSports } from '../../../../apis/sports';
import { useRecoilState } from "recoil";
import { loggedInUserState, loggedInUserProfileState } from "../../../atom";
import { useParams } from 'react-router-dom';
import { FrameWrapperRoot, Div, Title, Location, SportTagWrapper, FrameGroup, Schedulebox, NumberInput, FrameDiv, FrameDiv2, FrameParent1, Divbox, Textbox, Button, DivRoot, Div2, FrameDiv1, Radio, RadioLabel, Dropdown, Necessity, BeachWrapper } from "./MatchingLayout";

const MatchingWrite = ({ closeModal }) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(loggedInUserState);
  // const [isNecessityRequired, setIsNecessityRequired] = useState(false);
  const [allMatchings, setAllMatchings] = useState([]);
  const [selectedBeachId, setSelectedBeachId] = useState(null);
  const [clickedTags, setClickedTags] = useState([]);

  //매칭테이블
  const getMatchings = async () => {
    let { data: matchings, error } = await client
      .from("MATCHING")
      .select(
        "id, title, difficulty, matching_date, matching_time, total_people, required, location, beach_id, sport_id, host_userId"
      );
    setAllMatchings(matchings);
  };

  //해수욕장
  const { isLoading: beachLoading, data: beachData } = useQuery(
    ["beach"],
    getBeach
  );

  useEffect(() => {
    getMatchings();
  }, [beachData]);

// 해수욕장 태그 기능
  const handleTagClicked = (id) => {
    setClickedTags([id]);  // 항상 클릭된 태그를 설정
    setSelectedBeachId(id);  // 선택된 해변 ID를 설정
  };


  //스포츠
  const { isLoading: sportsLoading, data: sportsData } = useQuery(
    ["sports"],
    getSports
  );

  useEffect(() => {
    getMatchings();
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //매칭추가
  const addMatching = async (formData) => {
    const { data, error } = await client
      .from("MATCHING")
      .insert([
        {
          title: formData.title,
          beach_id: selectedBeachId,
          location: formData.location,
          sport_id: formData.sport_id,
          difficulty: formData.difficulty,
          matching_date: formData.matching_date,
          matching_time: formData.matching_time,
          total_people: formData.total_people,
          necessity: formData.necessity,
          necessity_details: formData.necessity_details,
          required: formData.required,
          host_userId: loggedInUser.id
        },
      ])
      .select();
    if (error) {
      console.error(error);
      return;
    }
    getMatchings();
    closeModal();
    window.location.reload();
  };

  //준비물
  // const handleNecessityChange = (event) => {
  //   setIsNecessityRequired(event.target.value === '필요');
  // };

  return (
    <FrameWrapperRoot onSubmit={handleSubmit(addMatching)}>
      <FrameParent1>
        <FrameGroup>
          <FrameDiv>
            <Divbox>제목</Divbox>
            <Title type="text"
              placeholder='20자까지 입력가능합니다.' {...register("title", { required: "제목을 입력해 주세요." })} id='title'/>
          </FrameDiv>
          <FrameDiv>
            <Divbox>해변</Divbox>
            <BeachWrapper>
              {beachLoading
                ? "Loading..."
                : beachData.map((beach) => {
                    return (
                      <BeachTag
                        key={beach.id}
                        beach={beach}
                        onClick={() => handleTagClicked(beach.id)}
                        hasClicked={clickedTags.includes(beach.id)}
                      />
                    );
                  })}
            </BeachWrapper>
          </FrameDiv>
          <FrameDiv>
            <Divbox>위치</Divbox>
            <Location type="text" {...register("location", { required: "제목을 입력해 주세요." })} id='location'/>
          </FrameDiv>
          <FrameDiv1>
            <FrameDiv>
              <Divbox>종목</Divbox>
              <Dropdown {...register("sport_id", { required: "종목을 선택해 주세요." })}>
                <option value="">스포츠 종목 선택</option>
                {sportsLoading ? (
                  <option value="" disabled>
                    Loading...
                  </option>
                ) : (
                  sportsData.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.title}
                    </option>
                  ))
                )}
              </Dropdown>
            </FrameDiv>
            <FrameDiv2>
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
            </FrameDiv2>
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
          <FrameDiv2>
            <Divbox>준비물</Divbox>
            <Radio
              type="radio"
              value="필요"
              name='radio'
              id="yes"
              style={{ opacity: '0' }}
              {...register('necessity', {
                required: '준비물을 선택해 주세요.',
              })}
            />
            <RadioLabel htmlFor="yes">필요</RadioLabel>
            <Radio
              type="radio"
              value="불필요"
              name='radio'
              id="no"
              style={{ opacity: '0' }}
              {...register('necessity', {
                required: '준비물을 선택해 주세요.',
              })}
            />
            <RadioLabel htmlFor="no">불필요</RadioLabel>
            <Necessity {...register("necessity_details")} type="text" placeholder="필요시 준비물 입력" />
          </FrameDiv2>
        </FrameGroup>
      </FrameParent1>
      <DivRoot>
        <Textbox  {...register("required")} placeholder='상세 설명을 적어주세요.' />
      </DivRoot>
      <Button type='submit'>
        <Div2>올리기</Div2>
      </Button>
    </FrameWrapperRoot>
  );
};

export default MatchingWrite;
