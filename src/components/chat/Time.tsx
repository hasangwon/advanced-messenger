import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localKo from 'dayjs/locale/ko';

export const Time = ({ isLeft, preMsgCard, msgCard, nextMsgCard }) => {
  dayjs.extend(utc);

  const getTime = (createdAt) => {
    return createdAt > dayjs().valueOf()
      ? dayjs(createdAt).locale(localKo).utc().format('YYYY.MM.DD 발송 예정')
      : dayjs(createdAt).locale(localKo).utc().format('MM월 DD일 a h시 mm분');
  };
  const TimeSpan = ({ createdAt }: { createdAt: number }) => {
    return (
      <div
        className={
          'flex justify-end mx-1 mt-2 mb-2 ' +
          (isLeft ? 'ml-[2rem]' : 'items-center')
        }
      >
        <span className='text-neutral-light text-xs font-semibold'>
          {getTime(createdAt)}
        </span>
      </div>
    );
  };
  const isSameMinutes = (preMsgCard, msgCard) => {
    return (
      dayjs(preMsgCard?.createdAt)
        .locale(localKo)
        .utc()
        .format('HH:MM') ===
      dayjs(msgCard?.createdAt)
        .locale(localKo)
        .utc()
        .format('HH:MM')
    );
  };

  const shouldDisplayTime = (preMsgCard, msgCard, nextMsgCard) => {
    const hasPreUser = preMsgCard && preMsgCard?.user ? true : false;
    const hasCurrentUser = msgCard && msgCard?.user ? true : false;
    const hasNextUser = nextMsgCard && nextMsgCard?.user ? true : false;

    if (!nextMsgCard) return true;
    if (!preMsgCard) return true;

    if (hasPreUser !== hasCurrentUser) {
      if (hasCurrentUser === hasNextUser) return false;
      else return true;
    }

    if (hasCurrentUser !== hasNextUser) {
      return true;
    }

    if (!isSameMinutes(preMsgCard, msgCard)) return true;
    if (!isSameMinutes(msgCard, nextMsgCard)) return true;

    if (!nextMsgCard || hasNextUser !== hasCurrentUser) return true;

    return false;
  };
  return (
    <>
      {shouldDisplayTime(preMsgCard, msgCard, nextMsgCard) && (
        <TimeSpan createdAt={msgCard.createdAt} />
      )}
    </>
  );
};
