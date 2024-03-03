import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import dayjs from 'dayjs';

const Login = () => {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const handlePwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (pw.length < 8) {
      alert('비밀번호는 8자리 이상이어야 합니다.');
      return;
    }

    try {
      await firebase.auth().createUserWithEmailAndPassword(id, pw);

      const newChatRef = await db.collection('Channel').doc();

      await newChatRef
        .set({
          key: newChatRef.id,
          email: id,
          createdDate: dayjs().valueOf(),
        })
        .catch((err) => {
          console.log(err);
        });
      alert('회원가입 성공!');
    } catch (error) {
      console.log(error, 'error');
      if (error.code === 'auth/email-already-in-use') {
        alert('이 이메일은 이미 사용 중입니다.');
      } else {
        alert(error.message);
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(id, pw);
      alert('로그인 성공!');
    } catch (error) {
      console.log(error, 'error');

      alert(error.message);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user && navigate('/admin');
    });
  }, []);

  console.log(isLoginView, 'ad');
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className='p-4 bg-white shadow-md rounded-lg'>
        <h1 className='text-xl w-full text-center font-semibold mb-4'>
          {isLoginView ? '로그인' : '회원가입'}
        </h1>

        <form className='flex flex-col space-y-4'>
          <input
            type='text'
            id='email'
            placeholder='Email'
            value={id}
            onChange={(event) => setId(event.target.value)}
            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <input
            type='password'
            placeholder='Password'
            value={pw}
            onChange={(event) => setPw(event.target.value)}
            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={isLoginView ? handleLogin : handleSignUp}
            className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700'
          >
            {isLoginView ? 'Login' : 'Sign Up'}
          </button>
          <button
            type='button'
            onClick={toggleView}
            className='p-1 mt-2 text-sm text-blue-500'
          >
            {isLoginView ? 'Create account' : 'Back to login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
