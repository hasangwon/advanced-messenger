import React from 'react';

const NoMessageContainer = () => {
  return (
    <div className='flex flex-col items-center text-base justify-center shadow-lg h-full text-neutral-normal leading-8'>
      <p>아직 입력된 대화가 없습니다.</p>
      <div className='flex justify-between'>
        <p>새로운 대화를 작성해보세요!</p>
      </div>
    </div>
  );
};

export default NoMessageContainer;
