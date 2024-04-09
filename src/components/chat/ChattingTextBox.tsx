import { KeyboardEventHandler, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const ChattingTextBox = ({ addChatMessage }) => {
  const hiddenInputRef = useRef<HTMLInputElement>();
  const [currentChat, setCurrentChat] = useState('');

  const textAreaRef = useRef(null);

  const handleChange = (event: { target: { value: string } }) => {
    setCurrentChat(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (textAreaRef) {
      textAreaRef.current.focus();
    }
    if (currentChat.replaceAll(' ', '')) {
      setCurrentChat('');
      hiddenInputRef.current.focus();
      addChatMessage(currentChat);
    }
  };

  const handleEnterPress: KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    if (event.code === 'Enter') {
      if (!event.shiftKey) {
        if (currentChat.replaceAll(' ', '')) {
          event.preventDefault();
          addChatMessage(currentChat);
          setCurrentChat('');
          hiddenInputRef.current.focus();
        } else {
          alert('입력한 메시지가 없습니다.');
        }
      }
    }
  };

  return (
    <div className=''>
      <div className='max-h-0 h-0'>
        <input
          ref={hiddenInputRef}
          className={'w-0 h-0 max-h-0 opacity-0 '}
          onFocus={() => {
            textAreaRef?.current?.focus();
          }}
        />
      </div>
      <form
        className={`flex flex-col relative w-full textAreaShadow bg-white pt-3 px-4 pb-5`}
      >
        <div>
          <div className={`flex flex-row items-start`}>
            <TextareaAutosize
              ref={textAreaRef}
              className=' w-full bg-secondary-dark text-base text-neutral-dark px-3 py-2 rounded border-none outline-none resize-none placeholder:text-neutral-light placeholder:tracking-normal'
              placeholder={'메시지를 작성해주세요'}
              onChange={handleChange}
              value={currentChat}
              onKeyPress={handleEnterPress}
              maxRows={4}
            />
            <button
              onClick={handleSubmit}
              className='w-[2.4rem] h-[2.4rem] removeHighlight p-1.5'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M6.53556 4.15251C6.35831 4.04149 6.1507 3.98884 5.94196 4.00197C5.73322 4.0151 5.53385 4.09335 5.37191 4.22571C5.20996 4.35807 5.0936 4.53788 5.03918 4.73983C4.98476 4.94178 4.99504 5.15571 5.06856 5.35151L7.00356 10.0165L14.3356 12.0165L7.00356 14.0135L5.06856 18.6785C4.99377 18.8673 4.97977 19.0747 5.02852 19.2718C5.07727 19.4689 5.18633 19.6458 5.34048 19.7779C5.49463 19.9101 5.68619 19.9908 5.88842 20.0088C6.09065 20.0268 6.29346 19.9813 6.46856 19.8785L21.0036 12.0155L6.53556 4.15251Z'
                  fill='#FF9200'
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChattingTextBox;
