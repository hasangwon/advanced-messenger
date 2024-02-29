import _ from 'lodash';
import React from 'react';

import { messageComponentType } from './messageType';
import { Time } from './Time';
import ImageBox from '../common/ImageBox';
import VideoBox from '../common/VideoBox';
import Linkify from '../../utils/Linkify';
import FileBox from '../common/FileBox';

const LeftMessageBox = ({
  hospitalName,
  msgCard,
  preMsgCard,
  nextMsgCard,
}: messageComponentType) => {
  const onMessageClick = (event) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    window?.message.onClick(JSON.stringify(msgCard));
  };

  return (
    <div
      data-drag-type='chat'
      className='my-[.625rem] text-left removeHighlight'
    >
      <div data-drag-type='chat' className={'ml-4'}>
        <div
          data-drag-type='chat'
          className={'flex flex-col pt-1 items-start '}
        >
          {preMsgCard?.user == null && (
            <div className='flex items-center mb-1'>
              <div
                className={'w-[2rem] h-[2rem] rounded-full bg-secondary-light'}
              >
                <img
                  className={`w-full`}
                  src={'/Profile@2x.png'}
                  alt='profile_icon'
                />
              </div>
              <span className='ml-2 text-sm text-neutral-dark font-bold'>
                {hospitalName}
              </span>
            </div>
          )}

          <div className={'ml-[2rem] max-w-3/4'}>
            <div
              className={
                'rounded-b-2xl rounded-r-2xl text-base bg-primary-light text-neutral-dark'
              }
            >
              <ul
                data-drag-type='chat'
                className={
                  'break-all whitespace-pre-wrap ' +
                  (!msgCard.images && !msgCard.videos
                    ? 'p-3 overflow-hidden'
                    : 'rounded-b-2xl rounded-r-2xl overflow-hidden')
                }
              >
                {msgCard.images &&
                  msgCard.images.map((msgObject) => {
                    return (
                      <ImageBox
                        key={msgObject.link}
                        isLeft={true}
                        imageUrl={msgObject.link}
                        onClick={onMessageClick}
                      />
                    );
                  })}
                {msgCard.videos &&
                  msgCard.videos.map((msgObject) => {
                    return (
                      <VideoBox
                        key={msgObject.link}
                        video={msgObject}
                        onClick={onMessageClick}
                      />
                    );
                  })}
                {msgCard.files &&
                  msgCard.files.map((msgObject) => {
                    return (
                      <FileBox
                        key={msgObject.link}
                        isLeft={true}
                        file={msgObject}
                        onClick={onMessageClick}
                      />
                    );
                  })}
                {msgCard.videos || msgCard.images ? (
                  ''
                ) : (
                  <button className={'text-left text-sm text-neutral-dark'}>
                    <Linkify text={msgCard.content} />
                  </button>
                )}
              </ul>
            </div>
          </div>
          <Time
            isLeft={true}
            preMsgCard={preMsgCard}
            msgCard={msgCard}
            nextMsgCard={nextMsgCard}
          />
        </div>
      </div>
    </div>
  );
};

const areEqual = (
  prevProps: messageComponentType,
  nextProps: messageComponentType,
) => {
  return _.isEqual(prevProps, nextProps);
};
export const MemoizedLeftMessageBox = React.memo(LeftMessageBox, areEqual);
