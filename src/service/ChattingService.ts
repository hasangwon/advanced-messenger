import dayjs from 'dayjs';
import firebase from 'firebase';

export const addChatMessage = async (
  channelKey: string,
  selectedChat: string,
  writerType: string,
  input: string,
  name?: string,
) => {
  if (input.replaceAll(' ', '') !== '' && channelKey && selectedChat) {
    firebase
      .firestore()
      .collection('Channel')
      .doc(channelKey)
      .collection('Chat')
      .doc(selectedChat)
      .collection('Message')
      .add({
        createdDate: dayjs().valueOf(),
        text: input,
        writer: name || '유저',
        writerType: writerType,
      })
      .then(() => {
        console.log('메시지 전송');
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('입력한 메시지가 없거나 키 값 부재');
  }
};

export const getChannelKey = async (userEmail: string) => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection('Channel')
      .where('email', '==', userEmail)
      .get();

    let key = '';
    snapshot.forEach((doc) => {
      console.log(doc.data().key, 'asd');
      key = doc.data().key;
    });

    return key;
  } catch (err) {
    console.log(err);
    return '';
  }
};

export const getChatList = async (channelKey: string) => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection('Channel')
      .doc(channelKey)
      .collection('Chat')
      .get();

    console.log(snapshot.docs.map((doc) => doc.data()));
    const sortedChatList = snapshot.docs
      .map((doc) => doc.data())
      .sort((a, b) => b.createdDate - a.createdDate);

    return sortedChatList;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getChatInfo = async (channelKey: string, chatKey: string) => {
  try {
    const doc = await firebase
      .firestore()
      .collection('Channel')
      .doc(channelKey)
      .collection('Chat')
      .doc(chatKey || '')
      .get();
    return doc.data();
  } catch (error) {
    console.error('Error initializing chat:', error);
    return null;
  }
};
