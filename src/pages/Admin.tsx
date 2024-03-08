import dayjs from 'dayjs';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { displayDomain } from '../utils/displayDomain';
import QrCodeComponent from '../utils/QrCodeComponent';
import ChattingTextBox from '../components/chat/ChattingTextBox';
import ChattingBoxModule from '../components/chat/ChattingBoxModule';

const Admin = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.search, 'location');
    setChannelKey(new URLSearchParams(location.search).get('channel'));
    setSelectedChat(new URLSearchParams(location.search).get('chat'));
  }, [location]);

  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(''); // 사용자 이메일 상태
  const [channelKey, setChannelKey] = useState(''); // 채널 키 상태
  const [chatList, setChatList] = useState([]); // 채팅 목록 상태
  const [selectedChat, setSelectedChat] = useState(''); // 선택된 채팅 상태
  const [messageList, setMessageList] = useState([]); // 메시지 목록 상태

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
            setSelectedChat('');
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

  useEffect(() => {
    if (channelKey && selectedChat) {
      firebase
        .firestore()
        .collection('Channel')
        .doc(channelKey)
        .collection('Chat')
        .doc(selectedChat)
        .collection('Message')
        .orderBy('createdDate', 'desc')
        .onSnapshot((snapshot) => {
          console.log(snapshot.docs.map((doc) => doc.data()));
          const sortedMessageList = snapshot.docs
            .map((doc) => doc.data())
            .sort((a, b) => a.createdDate - b.createdDate);
        });
    }
  }, [selectedChat]);

  return (
    <div className='w-full h-full'>
      <div className='flex justify-between p-4 border border-gray-300 border-t-0 border-l-0 border-r-0 border-b-[1px]'>
        {selectedChat ? (
          <button
            className='text-gray-400 text-sm'
            onClick={() => {
              navigate('/admin');
              setSelectedChat('');
            }}
          >
            뒤로가기
          </button>
        ) : (
          <button
            className='text-gray-400 text-sm'
            onClick={() => {
              firebase.auth().signOut();
              navigate('/login');
            }}
          >
            로그아웃
          </button>
        )}

        <h1 className='mb-2 text-xl font-semibold text-gray-600 flex items-center'>
          채팅
        </h1>
        <div className='pb-2 flex text-xs items-center'>
          <div className='mr-4'>
            {QrCodeComponent(displayDomain(channelKey))}
          </div>
          <div className='flex flex-col'>
            <span className='mb-1'>상담 주소 공유</span>
            <button
              onClick={() => {
                console.log(displayDomain(channelKey));
                navigator.clipboard.writeText(
                  displayDomain(channelKey).toString(),
                );
              }}
              className='border p-2'
            >
              주소 복사
            </button>
          </div>
        </div>
      </div>

      <div className='p-2 overflow-y-auto h-[calc(100%-5rem)]'>
        {selectedChat ? (
          <div>
            {/* {selectedChat} */}
            <ChattingBoxModule
              hospitalName={'나'}
              messageList={[]}
              isLoaded={true}
            />
            <ChattingTextBox addChatMessage={() => {}} />
          </div>
        ) : (
          <div>
            {chatList.map((chat) => (
              <button
                onClick={() => {
                  setSelectedChat(chat.key);
                  navigate(`/admin?chat=${chat.key}`);
                }}
                key={chat.key}
                className='w-full h-20 border border-gray-300 bg-gray-400 text-white rounded-md mb-2'
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
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
