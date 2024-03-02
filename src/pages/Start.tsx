import React, { useState } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Start = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onClick = async (event) => {
    event.preventDefault();
    const channelQuery = new URLSearchParams(window.location.search).get(
      'channel',
    );

    console.log('channelQuery', channelQuery);

    if (!channelQuery) {
      alert('Please enter a channel name');
    }
    const newChatRef = await db
      .collection('Channel')
      .doc(channelQuery)
      .collection('Chat')
      .doc();
    await newChatRef
      .set({
        key: newChatRef.id,
        name: name,
        createdDate: dayjs().valueOf(),
      })
      .then(() => {
        const storage = window.localStorage;
        storage.setItem('savedChat', `${channelQuery}/${newChatRef.id}`);
        console.log('nice', newChatRef.id);
        navigate(`/?channel=${channelQuery}&chat=${newChatRef.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className='p-4 bg-white shadow-md rounded-lg'>
        <form className='flex flex-col space-y-4'>
          <label htmlFor='name' className='text-lg font-semibold'>
            Enter your name:
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={handleChange}
            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            onClick={onClick}
            className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Start;
