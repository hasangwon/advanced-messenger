import dayjs from 'dayjs';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(''); // 사용자 이메일 상태
  const [channelKey, setChannelKey] = useState(''); // 채널 키 상태
  const [chatList, setChatList] = useState([]); // 채팅 목록 상태

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // 사용자가 로그인되어 있으면, 이메일 주소를 상태에 설정
        setUserEmail(user.email);
      } else {
        // 사용자가 로그인되어 있지 않으면, 로그인 페이지로 리디렉션
        alert('로그인 해주세요.');
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail) {
      firebase
        .firestore()
        .collection('Channel')
        .where('email', '==', userEmail)
        .get()
        .then((doc) => {
          doc.forEach((doc) => {
            console.log(doc.data().key, 'asd');
            setChannelKey(doc.data().key);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userEmail]);

  useEffect(() => {
    if (channelKey) {
      firebase
        .firestore()
        .collection('Channel')
        .doc(channelKey)
        .collection('Chat')
        .onSnapshot((snapshot) => {
          console.log(snapshot.docs.map((doc) => doc.data()));
          const sortedChatList = snapshot.docs
            .map((doc) => doc.data())
            .sort((a, b) => b.createdDate - a.createdDate);
          setChatList(sortedChatList);
        });
    }
  }, [channelKey]);
  console.log(userEmail, 'ad');

  return (
    <div className='w-full h-full'>
      <div className='flex justify-between p-4 border border-green-300 border-t-0 border-l-0 border-r-0 border-b-[1px]'>
        <h1 className='mb-2 text-xl font-semibold text-green-600'>채팅</h1>
        <button
          className='text-green-300 text-sm'
          onClick={() => {
            firebase.auth().signOut();
            navigate('/login');
          }}
        >
          로그아웃
        </button>
      </div>

      <div className='p-2 overflow-y-auto h-[calc(100%-5rem)]'>
        {chatList.map((chat) => (
          <div
            key={chat.key}
            className='w-full h-20 border border-green-300 rounded-md mb-2'
          >
            <div className='w-full h-full flex items-center px-4'>
              <div className='flex-1'>
                이름 : <b>{chat.name}</b>
              </div>
              <div className='flex-1 text-sm'>
                최근 메시지 :{' '}
                {chat?.recentMessage ? chat.recentMessage : '없음'}
              </div>
              <div className='flex-1 text-sm'>
                생성일 : {dayjs(chat.createdDate).format('YYYY-MM-DD')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
