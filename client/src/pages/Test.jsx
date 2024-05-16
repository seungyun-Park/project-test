import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import InfoInput from '../components/InfoInput';
import { NavLink, useNavigate } from 'react-router-dom';
import SignUpButton from '../components/SignUpButton';

function Test(){
    const [userInfo, setUserInfo] = useState(null);


    useEffect(()=>{
        fetch('http://localhost:4000/api/user')
      .then((response) => response.json())
      .then((data)=>setUserInfo(data));
    }, []);

    return(
        <>
        <h1>유저 정보</h1>
        {userInfo?.map((user)=>(
            <div key={user.userid}>
                <div>{user.userid}</div>
                <div>{user.nickname}</div>
                <div>{user.id}</div>
                <div>{user.pw}</div>
            </div>
        ))}
        </>
    );
    
}

export default Test;