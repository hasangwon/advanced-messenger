export const getAge = (birthday: number) => {
  const birth = new Date(birthday);
  const today = new Date();
  const dif = today.getTime() - birth.getTime();
  const cDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
  const cMonth = cDay * 30; // 월 만듬
  const cYear = cMonth * 12; // 년 만듬
  const age = parseInt(`${dif / cYear}`);
  const remainderMonth = age * 12 - dif / cMonth;
  const month = parseInt(
    `${remainderMonth < 0 ? -remainderMonth : remainderMonth}`,
  );
  return age === 0 && month === 0
    ? '0개월'
    : `${age ? `${age}년` : ''} ${month ? `${month}개월` : ''}`;
};

import dayjs from 'dayjs';

export const getAgeFromDate = (birthday: number) => {
  const birth = new Date(birthday);
  const today = new Date();
  const dif = today.getTime() - birth.getTime();
  const cDay = 24 * 60 * 60 * 1000; // 시 * 분 * 초 * 밀리세컨
  const cMonth = cDay * 30; // 월 만듬
  const cYear = cMonth * 12; // 년 만듬
  const age = parseInt(`${dif / cYear}`);
  const remainderMonth = age * 12 - dif / cMonth;
  const month = parseInt(
    `${remainderMonth < 0 ? -remainderMonth : remainderMonth}`,
  );
  return { age, month };
};

export const getDateFromAge = (age: number, month: number): number => {
  if (age === 0 && month === 0) {
    return 0;
  }
  const today = dayjs();
  const birthDate = today.subtract(age, 'year').subtract(month, 'month');
  return birthDate.valueOf();
};
