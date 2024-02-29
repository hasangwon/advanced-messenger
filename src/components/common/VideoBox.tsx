import React from 'react';

const VideoBox = ({ video, onClick }) => {
  return (
    <>
      <li key={video.link}>
        <button className='relative block w-full' onClick={onClick}>
          <div className='absolute z-10 w-full h-full bg-[#0000006e] flex justify-center items-center text-[3.75rem] text-white rounded-2xl overflow-hidden'>
            <p>{'▶'}</p>
          </div>
          {video.thumbnail ? (
            <img
              loading='lazy'
              src={video.thumbnail}
              alt={video.name}
              style={{ width: '400px', height: '300px', objectFit: 'cover' }}
            />
          ) : (
            <video className='w-full h-[300px]' preload='metadata'>
              <track kind='captions' />
              <source src={video?.link} type={'video/' + video?.extension} />
            </video>
          )}
        </button>
      </li>
    </>
  );
};

export default VideoBox;
