import React from 'react';

const ImageBox = ({ isLeft = true, imageUrl = '', onClick }) => {
  return (
    <>
      <li key={imageUrl} className='relative w-full'>
        <button onClick={onClick} className='w-full block overflow-hidden'>
          <img
            loading='lazy'
            className={isLeft ? 'bg-[#f5f6fa]' : 'bg-[#f5f6fa]'}
            src={imageUrl}
            alt=''
            style={{ width: '400px', height: '300px', objectFit: 'cover' }}
          />
        </button>
      </li>
    </>
  );
};

export default ImageBox;
