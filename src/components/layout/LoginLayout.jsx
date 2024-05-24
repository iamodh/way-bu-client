import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const Form = styled.form`
  width: 100%;
  padding: 60px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-blue-vivid);
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--color-navy);
`;

const GreyHR = styled.hr`
  border-top: 1px solid #b9b9b9;
  margin-bottom: 50px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 75%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Check = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

const Find = styled.div`
  padding: 1px;
`;

const Remember = styled.div`
  margin-left: 90px;
  padding: 1px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const ErrorMsg = styled.span`
  display: block;
  color: red;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
`;

const Button = styled.button`
  width: 70%;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const Alert = styled.span`
  display: block;
  margin-top: 20px;
  padding: 15px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 6px;
  font-size: 16px;
`;

const LoginLayout = ({ children, title, alert }) => (
  <Wrapper>
    <Form>
      {alert && <Alert>{alert}</Alert>}
      <Title>{title}</Title>
      <GreyHR />
      {children}
    </Form>
  </Wrapper>
);

const LinkBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  padding: 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export {
  LoginLayout,
  InputBox,
  Input,
  Check,
  Find,
  Remember,
  Label,
  ErrorMsg,
  ButtonContainer,
  Button,
  LinkBtn,
};
