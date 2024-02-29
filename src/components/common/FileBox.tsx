import Ripples from 'react-ripples';

const FileBox = ({ isLeft, file, onClick }) => {
  return (
    <>
      <li
        key={file.link}
        className={`relative w-full flex flex-row justify-between items-center ${
          isLeft ? 'bg-primary' : 'bg-[#ecf2ff]'
        }`}
      >
        <div className={'flex flex-col flex-1 overflow-hidden'}>
          <p className='font-bold'>파일이 도착했어요</p>
          <p className={` ${isLeft ? 'text-white' : 'text-neutral-normal'}`}>
            {file.name}
          </p>
        </div>
        <Ripples className='ml-3 mr-1 w-[2.5rem] h-[2.5rem] rounded-full'>
          <button
            onClick={onClick}
            className='flex flex-col justify-center w-full h-full rounded-full'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='2.5rem'
              height='2.5rem'
              viewBox='0 0 108 108'
            >
              <defs>
                <clipPath id='eon2acfqta'>
                  <path
                    data-name='사각형 1290'
                    className='fill-[#b0aebc]'
                    d='M0 0h54.617v60.035H0z'
                  />
                </clipPath>
              </defs>
              <g data-name='그룹 8831' transform='translate(-156 -967)'>
                <circle
                  data-name='타원 147'
                  cx='54'
                  cy='54'
                  r='54'
                  transform='translate(156 967)'
                  className='fill-[#ffffff]'
                />
                <g data-name='그룹 8830'>
                  <g
                    data-name='그룹 8829'
                    transform='translate(182.662 990.463)'
                  >
                    <path
                      data-name='패스 8792'
                      d='M40.916 25.989V14.627a1.316 1.316 0 0 0-.363-.863L27.815.388A1.27 1.27 0 0 0 26.9 0H6.706A6.729 6.729 0 0 0 0 6.769v38.189a6.686 6.686 0 0 0 6.706 6.719h15.942a17.207 17.207 0 1 0 18.268-25.688M28.153 4.392l8.546 9h-5.543a3.022 3.022 0 0 1-3-3.015zM6.706 49.174a4.192 4.192 0 0 1-4.2-4.217V6.769a4.227 4.227 0 0 1 4.2-4.269h18.945v7.87a5.516 5.516 0 0 0 5.506 5.518h7.257v9.772c-.375-.012-.676-.05-1-.05A17.459 17.459 0 0 0 26 29.918H10.11a1.251 1.251 0 1 0 0 2.5h13.564a19.911 19.911 0 0 0-2.2 3.879H10.11a1.251 1.251 0 1 0 0 2.5h10.548a17.172 17.172 0 0 0 .751 10.386H6.706zM37.4 57.545a14.7 14.7 0 1 1 14.7-14.7 14.718 14.718 0 0 1-14.7 14.7'
                      className='fill-[#b0aebc]'
                    />
                    <path
                      data-name='패스 8793'
                      d='M76.8 204.186h12.678a1.251 1.251 0 1 0 0-2.5H76.8a1.251 1.251 0 1 0 0 2.5'
                      transform='translate(-66.692 -178.034)'
                      className='fill-[#b0aebc]'
                    />
                    <path
                      data-name='패스 8794'
                      d='m260.666 292.583-5.142 5.543v-13.664a1.251 1.251 0 0 0-2.5 0v13.664l-5.18-5.543a1.262 1.262 0 0 0-1.777-.062 1.247 1.247 0 0 0-.062 1.764l7.32 7.87a1.242 1.242 0 0 0 1.827 0l7.333-7.87a1.244 1.244 0 1 0-1.815-1.7'
                      transform='translate(-216.86 -250.003)'
                      className='fill-[#b0aebc]'
                    />
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </Ripples>
      </li>
    </>
  );
};

export default FileBox;
