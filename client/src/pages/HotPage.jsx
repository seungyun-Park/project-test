import React from 'react';
import styled from 'styled-components';
import PostTable from '../components/PostTable';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header"
import Pagination from '../components/Pagination';
import { useState } from 'react';

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 45px;
  font-weight: 500;
  padding: 20px;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  width: 80%; 
  margin: auto;
  justify-content: flex-end;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

function HotPage(){
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const totalPosts = 100; 
  // const totalPages = Math.ceil(totalPosts / postsPerPage);
  const totalPages = 10;


  return (
    <>
      <Header/>
        <Title>HOT 게시판</Title>
        <Wrapper>
        <SearchWrapper>
          <input placeholder='검색...' />
        </SearchWrapper>
        </Wrapper>

        <PostTable currentPage={currentPage} postsPerPage={postsPerPage} />

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </>
  );
};

export default HotPage;