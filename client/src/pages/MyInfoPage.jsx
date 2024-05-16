import React from 'react';
import styled from 'styled-components';
import PostTable from '../components/PostTable';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 40px;
  padding: 20px;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  padding: 10px;
  margin: 0 140px;
  display: flex;
  justify-content: space-between;
`;

function MyInfoPage(){
  const navigate = useNavigate();


  return (
    <>
      <Header/>
        <Title>내 정보</Title>
    </>
  );
};

export default MyInfoPage;