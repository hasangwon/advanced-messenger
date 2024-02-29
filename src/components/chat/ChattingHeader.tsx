import React, { useCallback } from 'react';

import { getAge } from '../../utils/getAge';
type ChattingHeaderProps = {
  hospitalName: string;
  hospitalTelNumber: string;
  petInfo: { petName: string; petSpecies: string; petBirthDate: number };
};
const ChattingHeader: React.FC<ChattingHeaderProps> = ({
  hospitalName = '병원 정보 없음',
  hospitalTelNumber,
  petInfo,
}) => {
  const handleCallHospital = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (hospitalTelNumber) {
        window.location.href = `tel:${hospitalTelNumber}`;
      } else {
        alert('등록된 병원 전화번호가 없습니다.');
      }
    },
    [hospitalTelNumber],
  );

  return (
    <div className={'w-full'}>
      <div className='flex relative w-full h-[5rem] header-shadow items-center z-20'>
        <div className='flex w-full justify-between items-center px-[1.5rem] text-neutral-dark h-full'>
          <div className=''>
            <div className='flex items-center mb-[-.25rem]'>
              <span className='font-bold text-lg'>
                {hospitalName
                  ? hospitalName.length > 10
                    ? `${hospitalName.slice(0, 10)}..`
                    : hospitalName
                  : ''}
              </span>
            </div>
            <span className='text-sm text-neutral-normal font-semibold whitespace-nowrap'>
              {petInfo
                ? `${
                    petInfo.petName
                      ? petInfo.petName.length > 4
                        ? `${petInfo.petName.slice(0, 4)}..`
                        : petInfo.petName
                      : '-'
                  }${
                    petInfo?.petSpecies
                      ? petInfo.petSpecies === 'dog'
                        ? '/ 강아지'
                        : petInfo.petSpecies === 'cat'
                          ? '/ 고양이'
                          : '/ 기타'
                      : ''
                  } ${
                    petInfo.petBirthDate
                      ? `/ ${getAge(petInfo.petBirthDate)}`
                      : ''
                  }`
                : '입력된 정보가 없습니다.'}
            </span>
          </div>
          <div className='whitespace-nowrap'>
            <button
              className='bg-[#FFF4E5] rounded-full p-2'
              onClick={handleCallHospital}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M8.38028 8.85323C9.07627 10.3028 10.0251 11.6615 11.2266 12.8631C12.4282 14.0646 13.7869 15.0134 15.2365 15.7094C15.3612 15.7693 15.4235 15.7992 15.5024 15.8222C15.7828 15.904 16.127 15.8453 16.3644 15.6752C16.4313 15.6274 16.4884 15.5702 16.6027 15.4559C16.9523 15.1063 17.1271 14.9315 17.3029 14.8172C17.9658 14.3862 18.8204 14.3862 19.4833 14.8172C19.6591 14.9315 19.8339 15.1063 20.1835 15.4559L20.3783 15.6508C20.9098 16.1822 21.1755 16.448 21.3198 16.7333C21.6069 17.3009 21.6069 17.9712 21.3198 18.5387C21.1755 18.8241 20.9098 19.0898 20.3783 19.6213L20.2207 19.7789C19.6911 20.3085 19.4263 20.5733 19.0662 20.7756C18.6667 21 18.0462 21.1614 17.588 21.16C17.1751 21.1588 16.8928 21.0787 16.3284 20.9185C13.295 20.0575 10.4326 18.433 8.04466 16.045C5.65668 13.6571 4.03221 10.7947 3.17124 7.76131C3.01103 7.19687 2.93092 6.91464 2.9297 6.5017C2.92833 6.04347 3.08969 5.42298 3.31411 5.02348C3.51636 4.66345 3.78117 4.39863 4.3108 3.86901L4.46843 3.71138C4.99987 3.17993 5.2656 2.91421 5.55098 2.76987C6.11854 2.4828 6.7888 2.4828 7.35636 2.76987C7.64174 2.91421 7.90747 3.17993 8.43891 3.71138L8.63378 3.90625C8.98338 4.25585 9.15819 4.43065 9.27247 4.60643C9.70347 5.26932 9.70347 6.1239 9.27247 6.78679C9.15819 6.96257 8.98338 7.13738 8.63378 7.48698C8.51947 7.60129 8.46231 7.65845 8.41447 7.72526C8.24446 7.96269 8.18576 8.30695 8.26748 8.5873C8.29048 8.6662 8.32041 8.72854 8.38028 8.85323Z'
                  stroke='#FF9200'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingHeader;
