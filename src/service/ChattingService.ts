import axios from 'axios';
import dayjs from 'dayjs';

export const getChatInfoByRoomId = async (roomId) => {
  try {
    const response = await axios.get(`/chat/room/${roomId}`);
    const data = response.data.data || {};

    return {
      hospitalName: data.affiliation || '병원명 없음',
      petName: data.petName || '이름 없음',
      petSpecies: data.petSpecies || '',
      hospitalPhoneNumber: data.hotPhone || '',
      petBirthDate: dayjs(data.petBirthDate).valueOf(),
      messages: data.messages || [],
    };
  } catch (error) {
    console.error('Error fetching chat room details', error);
    throw error;
  }
};
