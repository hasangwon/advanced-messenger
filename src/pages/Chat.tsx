import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import ChattingHeader from '../components/chat/ChattingHeader';
import ChattingBoxModule from '../components/chat/ChattingBoxModule';
import ChattingTextBox from '../components/chat/ChattingTextBox';
import { useNavigate } from 'react-router-dom';

import { addChatMessage, getChatInfo } from '../service/ChattingService';
import firebase from 'firebase';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState('');
  const [channelKey, setChannelKey] = useState('');
  const [selectedChat, setSelectedChat] = useState('');

  const sendMessage = (inputMessage) => {
    addChatMessage(
      channelKey,
      selectedChat,
      'customer',
      inputMessage,
      chatName || '유저',
    );
  };

  useEffect(() => {
    const channelQuery = new URLSearchParams(window.location.search).get(
      'channel',
    );
    const chatQuery = new URLSearchParams(window.location.search).get('chat');
    const storage = window.localStorage;
    const localInfo = storage.getItem('savedChat');
    setChannelKey(channelQuery);
    setSelectedChat(chatQuery);

    // 채널 쿼리 없을 시, 기본 페이지로 이동
    if (!channelQuery) {
      navigate('/admin');
    }
    // 챗 쿼리가 없을 시, 로컬 스토리지 확인
    else if (!chatQuery) {
      const infos = localInfo ? localInfo.split('/') : [null, null];
      // 일치하는 채널 쿼리 있을 시, 이동
      if (infos[0] && infos[0] === channelQuery) {
        navigate(`/?channel=${channelQuery}&chat=${infos[1]}`);
      }
      // 일치하는 채널 쿼리 없을 시, 신규 생성으로 이동
      else {
        navigate(`/start/?channel=${channelQuery}`);
      }
    }
    // 채널, 챗 쿼리 모두 있을 시, 챗 정보 가져옴
    else {
      getChatInfo(channelQuery, chatQuery).then((chatInfo) => {
        if (chatInfo) {
          setChatName(chatInfo.name);
          navigate(`/?channel=${channelQuery}&chat=${chatQuery}`);
          storage.setItem('savedChat', `${channelQuery}/${chatQuery}`);
        } else {
          navigate(`/start/?channel=${channelQuery}`);
        }
      });
    }
  }, []);

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
          setMessages(sortedMessageList);
        });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [channelKey, selectedChat]);

  return (
    <>
      <Helmet>
        <title>{'간편상담'}</title>
        <link rel='icon' type='image/ico' href='/favicon.ico' sizes='96x96' />
      </Helmet>
      <div className='flex flex-col fixed bottom-0 bg-white w-full h-full'>
        <ChattingHeader
          userName={'간편상담'}
          userTelNumber={'01012345678'}
          chatName={chatName}
        />
        <ChattingBoxModule
          messageList={messages}
          isLoaded={true}
          userName={chatName}
        />
        <ChattingTextBox
          addChatMessage={(message) => {
            sendMessage(message);
          }}
        />
      </div>
    </>
  );
};

export default Chat;
