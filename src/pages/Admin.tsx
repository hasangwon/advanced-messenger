import dayjs from 'dayjs';
import firebase from 'firebase';
import { useEffect, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { displayDomain } from '../utils/displayDomain';
import QrCodeComponent from '../utils/QrCodeComponent';
import ChattingTextBox from '../components/chat/ChattingTextBox';
import ChattingBoxModule from '../components/chat/ChattingBoxModule';
import {
  addChatMessage,
  getChannelKey,
  getChatList,
} from '../service/ChattingService';

const Admin = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(''); // 사용자 이메일 상태
  const [channelKey, setChannelKey] = useState(''); // 채널 키 상태
  const [chatList, setChatList] = useState([]); // 채팅 목록 상태
  const [selectedChat, setSelectedChat] = useState(''); // 선택된 채팅 상태
  const [messageList, setMessageList] = useState([]); // 메시지 목록 상태

  const handleLogout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/admin');
    setSelectedChat('');
  };

  const moveToBack = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/admin');
    setSelectedChat('');
  };

  const copyToClipboard = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigator.clipboard.writeText(displayDomain(channelKey).toString());
    alert('주소가 복사되었습니다.');
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        alert('로그인 해주세요.');
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const chatValue = params.get('chat');
    if (chatValue) {
      setSelectedChat(chatValue);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      getChannelKey(userEmail).then((key) => {
        setChannelKey(key);
      });
    }
  }, [userEmail]);

  useEffect(() => {
    if (channelKey) {
      getChatList(channelKey).then((list) => {
        setChatList(list);
      });
    }
  }, [channelKey, selectedChat]);

  useEffect(() => {
    let unsubscribe;
    if (channelKey && selectedChat) {
      unsubscribe = firebase
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
          setMessageList(sortedMessageList);
        });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [channelKey, selectedChat]);

  return (
    userEmail && (
      <div className='w-full h-full'>
        <div className='flex justify-between p-4 border border-gray-300 border-t-0 border-l-0 border-r-0 border-b-[1px]'>
          {selectedChat ? (
            <button className='text-gray-400 text-sm' onClick={moveToBack}>
              뒤로가기
            </button>
          ) : (
            <button className='text-gray-400 text-sm' onClick={handleLogout}>
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
              <button onClick={copyToClipboard} className='border p-2'>
                주소 복사
              </button>
            </div>
          </div>
        </div>

        {selectedChat ? (
          <div className='p-2 h-[calc(100%-10rem)]'>
            <ChattingBoxModule
              messageList={messageList}
              isLoaded={true}
              userName={'유저'}
            />
            <ChattingTextBox
              addChatMessage={(input: string) => {
                addChatMessage(channelKey, selectedChat, 'user', input);
              }}
            />
          </div>
        ) : (
          <div className='p-2 overflow-y-auto h-[calc(100%-5rem)]'>
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
    )
  );
};

export default Admin;
