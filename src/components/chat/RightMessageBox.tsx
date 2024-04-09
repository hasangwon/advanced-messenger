import _ from 'lodash';
import React from 'react';
import ImageBox from '../common/ImageBox';
import VideoBox from '../common/VideoBox';
import FileBox from '../common/FileBox';
import Linkify from '../../utils/Linkify';
import { Time } from './Time';

const RightMessageBox = ({ preMsgCard, msgCard, nextMsgCard, read }) => {
  const handleClickWindowEvent = {
    messageClick: () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      return window?.message.onClick(JSON.stringify(msgCard));
    },
  };

  return (
    <div className='my-[.625rem] removeHighlight'>
      <div className={'flex flex-1 justify-end mr-4'}>
        <div className={'group flex flex-1 flex-col items-end '}>
          <div className={'w-full flex items-end flex-row-reverse'}>
            <div
              className={
                'max-w-3/4 ' +
                (msgCard.images || msgCard.videos || msgCard.files
                  ? 'w-full '
                  : '') +
                ' rounded-t-2xl rounded-l-2xl bg-secondary-normal'
              }
            >
              <ul
                className={
                  'break-all whitespace-pre-wrap text-base ' +
                  (!msgCard.images && !msgCard.videos
                    ? 'p-3 overflow-hidden'
                    : 'rounded-t-2xl rounded-l-2xl overflow-hidden') +
                  ' text-neutral-dark'
                }
              >
                {msgCard.text}
              </ul>
            </div>
            {read && (
              <div
                className={
                  'flex p-1 text-xs text-neutral-light mr-1 rounded-full  w-[1.7rem] h-[1.2rem] items-center'
                }
              >
                <span className='text-neutral-light text-xs whitespace-nowrap mb-1'>
                  읽음
                </span>
              </div>
            )}
          </div>
          <Time
            isLeft={false}
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

export const MemoizedRightMessageBox = React.memo(RightMessageBox, areEqual);
