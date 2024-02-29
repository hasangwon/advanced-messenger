import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { MemoizedLeftMessageBox } from './LeftMessageBox';
import MessageSkeleton from './MessageSkeleton';
import { messageDataType } from './messageType';
import NoMessageContainer from './NoMessageContainer';
import { MemoizedRightMessageBox } from './RightMessageBox';

const ChattingBoxModule = ({
  hospitalName,
  messageList,
  isLoaded,
}: {
  hospitalName: string;
  messageList: messageDataType[];
  isLoaded: boolean;
}) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [innerMessageList, setInnerMessageList] = useState(null);
  // const [isScrollBottom, setIsScrollBottom] = useState(true);
  // const [visibleMessages, setVisibleMessages] = useState([]);

  // const handleScrollEvent = () => {
  //   if (
  //     chatRef.current.scrollTop + chatRef.current.offsetHeight + 20 >=
  //     chatRef.current.scrollHeight
  //   ) {
  //     // setIsShownInVisibleMessage(false);
  //     setIsScrollBottom(true);
  //   } else {
  //     setIsScrollBottom(false);
  //   }
  // };

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
    // setVisibleMessages(newMessageList);
    // setTimeout(() => {
    // }, 100);
    setInnerMessageList(newMessageList);
  }, [messageList]);

  useEffect(() => {
    if (!hospitalName) return;
    if (chatRef && chatRef?.current) {
      setTimeout(() => {
        chatRef.current.scrollTop = chatRef.current?.scrollHeight;
      }, 100);
    }
  }, [hospitalName, messageList, innerMessageList]);

  // useEffect(() => {
  //   console.log('isScrollBottom', isScrollBottom);
  //   console.log(visibleMessages[visibleMessages.length - 1], 'differMessage');
  // }, [isScrollBottom, visibleMessages]);

  return (
    <>
      <div
        ref={chatRef}
        className={'relative w-full h-full overflow-y-scroll chatViewMain'}
        // onScroll={handleScrollEvent}
      >
        {!isLoaded || !innerMessageList ? (
          <MessageSkeleton />
        ) : innerMessageList.length !== 0 ? (
          <>
            <div className='w-full'>
              {innerMessageList.map((msgCard, index) =>
                msgCard?.user ? (
                  <MemoizedLeftMessageBox
                    hospitalName={hospitalName}
                    msgCard={msgCard}
                    key={msgCard.id}
                    preMsgCard={getPreMsgCard(index)}
                    nextMsgCard={getNextMsgCard(index)}
                  />
                ) : (
                  <MemoizedRightMessageBox
                    msgCard={msgCard}
                    key={msgCard.id}
                    preMsgCard={getPreMsgCard(index)}
                    nextMsgCard={getNextMsgCard(index)}
                    read={msgCard.see}
                  />
                ),
              )}
            </div>
          </>
        ) : (
          <NoMessageContainer />
        )}
        {/* {isShownInVisibleMessage && inVisibleMessage && (
          <div className={'absolute bottom-0 w-full px-3 mb-[5rem] z-50'}>
            <button
              className={
                'shadow-md bg-secondary-light w-full text-left rounded-xl p-3 removeHighlight'
              }
              onClick={handleInVisibleMessageClick}
            >
              <p className={'text-neutral-dark text-sm'}>
                {inVisibleMessage.writer}
              </p>
              <p className={'text-neutral-dark text-sm mt-2'}>
                {inVisibleMessage.text}
              </p>
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};

export default ChattingBoxModule;
