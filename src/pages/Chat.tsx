/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import ChattingHeader from '../components/chat/ChattingHeader';
import ChattingBoxModule from '../components/chat/ChattingBoxModule';
import ChattingTextBox from '../components/chat/ChattingTextBox';
import { useNavigate } from 'react-router-dom';

import { db } from '../firebase';

const Chat = () => {
  const navigate = useNavigate();

  const [channelInfo, setChannelInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [hospitalName, setHospitalName] = useState('');
  const [chatName, setChatName] = useState('');

  useEffect(() => {
    const channelQuery = new URLSearchParams(window.location.search).get(
      'channel',
    );
    const chatQuery = new URLSearchParams(window.location.search).get('chat');
    const storage = window.localStorage;
    const localInfo = storage.getItem('savedChat');
    console.log('nice', localInfo);
    if (!channelQuery) {
      navigate('/404');
    } else if (!chatQuery) {
      const infos = localInfo ? localInfo.split('/') : [null, null];
      if (infos[0] && infos[0] === channelQuery) {
        navigate(`/?channel=${channelQuery}&chat=${infos[1]}`);
      } else {
        navigate(`/start/?channel=${channelQuery}`);
      }
    } else {
      db.collection('Channel')
        .doc(channelQuery)
        .collection('Chat')
        .doc(chatQuery || '')
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log(doc.data());
            setChatName(doc.data().name);
            navigate(`/?channel=${channelQuery}&chat=${doc.data().key}`);
            storage.setItem('savedChat', `${channelQuery}/${doc.data().key}`);
          } else {
            navigate(`/start/?channel=${channelQuery}`);
          }
        });
    }
  }, []);

  const sendMessage = (inputMessage) => {
    console.log(inputMessage);
  };

  useEffect(() => {
    db.collection('Channel')
      .get()
      .then((doc) => {
        doc.forEach((doc) => {
          console.log(doc.data());
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const [isShownViewerPopup, setShownViewerPopup] = useState(false);
  // const [selectMessageData, setSelectMessageData] = useState({
  //   mediaType: 0,
  //   link: '',
  // });
  // const viewerContentsRef = useRef(null);
  // const imageViewRef = useRef(null);
  return (
    <>
      <Helmet>
        <title>{channelInfo?.name || '간편상담'}</title>
        <link rel='icon' type='image/ico' href='/favicon.ico' sizes='96x96' />
      </Helmet>
      <div className='flex flex-col fixed bottom-0 bg-white w-full h-full'>
        {/* {isShownViewerPopup && selectMessageData.link && (
        <div
          ref={viewerContentsRef}
          className='flex justify-center items-center fixed z-[200] w-full h-full bg-[#00000045]'
        >
          {selectMessageData.mediaType === 0 ? (
            <div
              ref={imageViewRef}
              className='flex w-full justify-center items-center'
            >
              <img
                className='w-full bg-white'
                src={selectMessageData.link}
                alt='image_viewer'
              />
            </div>
          ) : (
            <div>
              <ReactPlayer
                className='absolute left-[50%] top-[50%] bg-black translate-x-[-50%] translate-y-[-50%]'
                url={selectMessageData.link}
                playing={true}
                controls={true}
                muted={true}
                width={'100%'}
              />
            </div>
          )}
        </div>
      )} */}

        <ChattingHeader
          hospitalName={channelInfo?.name || '간편상담'}
          hospitalTelNumber={'01012345678'}
          petInfo={{
            petName: chatName,
            petSpecies: '',
            petBirthDate: 0,
          }}
        />
        <ChattingBoxModule
          hospitalName={hospitalName}
          messageList={messages}
          isLoaded={true}
        />
        <ChattingTextBox
          addChatMessage={(message) => {
            sendMessage(message);
          }}
        />

        {/* <AnimatePresence>
        {isShownAgreement && (
          <AgreementModal onClickAgreement={onClickAgreement} />
        )}
      </AnimatePresence> */}
      </div>
    </>
  );
};

export default Chat;
