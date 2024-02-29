import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

const MessageSkeleton = () => {
  return (
    <>
      <div className='w-full h-full p-[2rem]'>
        <div className='left'>
          <div className='flex flex-row justify-start w-full chattingModule'>
            <Skeleton width={'40%'} height={40} duration={1} className='mb-2' />
          </div>
          <div className='flex flex-row justify-start chattingModule'>
            <Skeleton height={16} width={60} duration={1} className='mb-10' />
          </div>
        </div>
        <div className='right'>
          <div className='flex flex-row justify-end w-full chattingModule'>
            <Skeleton width={'40%'} height={40} duration={1} className='mb-2' />
          </div>
          <div className='flex flex-row justify-end chattingModule'>
            <Skeleton height={16} width={60} duration={1} className='mb-10' />
          </div>
        </div>
        <div className='right'>
          <div className='flex flex-row justify-end w-full chattingModule'>
            <Skeleton width={'40%'} height={60} duration={1} className='mb-2' />
          </div>
          <div className='flex flex-row justify-end chattingModule'>
            <Skeleton height={16} width={60} duration={1} className='mb-10' />
          </div>
        </div>
        <div className='left'>
          <div className='flex flex-row justify-start w-full chattingModule'>
            <Skeleton width={'40%'} height={40} duration={1} className='mb-2' />
          </div>
          <div className='flex flex-row justify-start chattingModule'>
            <Skeleton height={16} width={60} duration={1} className='mb-10' />
          </div>
        </div>
        <div className='right'>
          <div className='flex flex-row justify-end w-full chattingModule'>
            <Skeleton width={'40%'} height={40} duration={1} className='mb-2' />
          </div>
          <div className='flex flex-row justify-end chattingModule'>
            <Skeleton height={16} width={60} duration={1} className='mb-10' />
          </div>
        </div>
        <div className='left'>
          <div className='flex flex-row justify-start w-full chattingModule'>
            <Skeleton width={'40%'} height={40} duration={1} className='mb-2' />
          </div>
          <div className='flex flex-row justify-start chattingModule'>
            <Skeleton height={16} width={60} duration={1} className='mb-10' />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageSkeleton;
