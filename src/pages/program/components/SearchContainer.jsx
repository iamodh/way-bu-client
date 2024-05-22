import React from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { faSearch, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  height: 100px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  height: 40px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  border-color: var(--color-blue-main);
`;

const IconBox = styled.div`
  background-color: var(--color-blue-main);
  width: 40px;
  height: 44px;
  border-radius: 0 6px 6px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const InputBox = styled.form`
  position: relative;
  /* background-color: tomato; */
`;
export default function SearchContainer() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Search :", data.keyword);
  };

  const handleSearch = () => {
    handleSubmit(onSubmit)();
  };

  const handleReset = () => {
    reset();
    console.log("키워드 Reset");
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex" }}>
          <InputBox>
            <Input
              placeholder="키워드를 입력해주세요."
              {...register("keyword")}
            />
            <FontAwesomeIcon
              style={{ position: "absolute", bottom: "15px", right: 0 }}
              icon={faRotateRight}
              onClick={handleReset}
              color="blue"
            />
          </InputBox>

          <IconBox type="submit" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} color="white" />
          </IconBox>
        </div>
      </form>
    </Wrapper>
  );
}
