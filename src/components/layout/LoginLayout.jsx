import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;

  @media (max-width: 480px) {
    margin-top: 10px;
    padding: 40px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  padding: 60px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-blue-vivid);

  @media (max-width: 480px) {
    padding: 30px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--color-navy);

  @media (max-width: 480px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const GreyHR = styled.hr`
  border-top: 1px solid #b9b9b9;
  margin-bottom: 50px;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  display: block;
  width: 75%;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 480px) {
    width: 100%;
    padding: 10px;
    font-size: 12px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px 20px;
  font-size: 15px;
  font-weight: bold;
  width: 170px;

  @media (max-width: 480px) {
    margin-bottom: 5px;
    font-size: 12px;
  }
`;

const ErrorMsg = styled.span`
  display: block;
  color: red;
  font-size: 16px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Button = styled.button`
  width: 45%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 480px) {
    width: 70%;
    font-size: 13px;
    padding: 12px;
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

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px;
  }
`;

const LinkBtn = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  color: #fff;
  border: none;
  font-size: 16px;
  margin-bottom: 12px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px;
  }
`;

const LoginLayout = ({ children, title, alert }) => (
  <Wrapper>
    <Form>
      {/* {alert && <Alert>{alert}</Alert>} */}
      <Title>{title}</Title>
      <GreyHR />
      {children}
    </Form>
  </Wrapper>
);

export {
  LoginLayout,
  InputBox,
  Input,
  Label,
  ErrorMsg,
  ButtonContainer,
  Button,
  LinkBtn,
};
