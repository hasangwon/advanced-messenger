import _ from 'lodash';
import React from 'react';

import { Time } from './Time';

const LeftMessageBox = ({ msgCard, preMsgCard, nextMsgCard }) => {
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
              ></div>
              <span className='ml-2 text-sm text-neutral-dark font-bold'>
                {msgCard?.writer ? msgCard.writer : '유저'}
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
                {msgCard.text}
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

const areEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps, nextProps);
};
export const MemoizedLeftMessageBox = React.memo(LeftMessageBox, areEqual);
