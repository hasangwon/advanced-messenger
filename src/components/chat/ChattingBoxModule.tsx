import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { MemoizedLeftMessageBox } from './LeftMessageBox';
import MessageSkeleton from './MessageSkeleton';
import NoMessageContainer from './NoMessageContainer';
import { MemoizedRightMessageBox } from './RightMessageBox';

const ChattingBoxModule = ({ messageList, isLoaded, userName }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [innerMessageList, setInnerMessageList] = useState(null);

  const getPreMsgCard = (index) => {
    return index === 0 ? undefined : innerMessageList[index - 1];
  };
  const getNextMsgCard = (index) => {
    return index + 1 === innerMessageList.length
      ? undefined
      : innerMessageList[index + 1];
  };

  useEffect(() => {
    const newMessageList = _.cloneDeep(messageList).sort(
      (a: { createdAt: number }, b: { createdAt: number }) =>
        a.createdAt - b.createdAt,
    );
    setInnerMessageList(newMessageList);
  }, [messageList]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [innerMessageList]);

  return (
    <div ref={chatRef} className={'relative w-full h-full overflow-y-scroll'}>
      {!isLoaded || !innerMessageList ? (
        <MessageSkeleton />
      ) : innerMessageList.length !== 0 ? (
        <>
          <div className='w-full'>
            {innerMessageList.map((msgCard, index) =>
              msgCard?.writer === userName ? (
                <MemoizedRightMessageBox
                  msgCard={msgCard}
                  key={msgCard.id}
                  preMsgCard={getPreMsgCard(index)}
                  nextMsgCard={getNextMsgCard(index)}
                  read={msgCard.see}
                />
              ) : (
                <MemoizedLeftMessageBox
                  msgCard={msgCard}
                  key={msgCard.id}
                  preMsgCard={getPreMsgCard(index)}
                  nextMsgCard={getNextMsgCard(index)}
                />
              ),
            )}
          </div>
        </>
      ) : (
        <NoMessageContainer />
      )}
    </div>
  );
};

export default ChattingBoxModule;
