import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InfoInput from '../components/InfoInput';
import { NavLink, useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import axios from 'axios';
import { useForm } from '../hooks/useForm';


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const LoginTitle = styled.h1`
  margin-bottom: 1px;
  font-family: 'Nunito';
`;

const Description = styled.div`
  display:flex;
  justify-content: center;
  color: #6c6c74;
  font-size: 12px;
`;

const MovePage = styled(NavLink)`
  margin-left: 5px;
  margin-bottom: 8px;
  color: red;
  font-size: 12px;
  text-decoration: none;
`

// function LoginPage(){
//   const [id, changeId] = useForm();
//   const [pw, changePW] = useForm();
//   const router = useNavigate();

//   const login = async (id, pw) => {
//     const result = await axios.post('http://localhost:4000/api/login', {
//       id: id,
//       pw: pw,
//     });
//     return result.data.data;
//   };

//   const onClick = async () => {
//     const result = await login(id, pw);
//     localStorage.setItem('accessToken', result.accessToken);
//     localStorage.setItem('refreshToken', result.refreshToken);
//     router(`/home`);
//   };

//   return (
//     <Wrapper>
//       <LoginTitle>로그인하기</LoginTitle>
//       <form>
//         <InfoInput name='ID' value={id} onChange={changeId}/>
//         <InfoInput name='Password' value={pw} onChange={changePW}/>
//         <LoginButton onClick={onClick} title="Login"/>
//       </form>
//     </Wrapper>
//   );
// }

function LoginPage(){
    const [ID, setID] = useState("");
    const [Password, setPassword] = useState("");

    const onIDHandler = (event) => {
      setID(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
    }

    const [userInfo, setUserInfo] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:4000/api/user')
      .then((response) => response.json())
      .then((data)=>setUserInfo(data));
    }, []);
  
    const navigate = useNavigate();

    const onClickConfirmButton = () => {
      if (!userInfo || userInfo.length === 0) {
        alert("등록되지 않은 회원입니다.");
        return false;
      }
    
      const user = userInfo.find(user => user.id === ID && user.pw === Password);
      if (user) {
        alert(`${user.nickname}님 환영합니다!`);
        return true;
      } else {
        alert("등록되지 않은 회원입니다.");
        return false;
      }
    }

    return (
      <Wrapper>
          <form style={{ display: 'flex', flexDirection: 'column'}}>
            <LoginTitle>Login</LoginTitle>
            <br/>
            <InfoInput name='ID' value={ID} onChange={onIDHandler}/>
            <InfoInput name='Password' value={Password} onChange={onPasswordHandler}/>

            <MovePage href = "/"> Forgot Password? </MovePage>
            <LoginButton 
              title="Login" 
              onClick={() => {
                if(onClickConfirmButton()){
                  navigate("/home");
                }
              }}/>
            <Description>
              Don't have an account?  
              <MovePage to = "/signup">
                Sign Up
              </MovePage>
            </Description>
          </form>
      </Wrapper>
    )
}

export default LoginPage;