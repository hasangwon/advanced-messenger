import dayjs from 'dayjs';
import firebase from 'firebase';
import { db } from '../firebase';

export const handleSignUp = async (id: string, pw: string) => {
  if (pw.length < 8) {
    alert('비밀번호는 8자리 이상이어야 합니다.');
    return;
  }

  try {
    await firebase.auth().createUserWithEmailAndPassword(id, pw);

    const newChatRef = await db.collection('Channel').doc();

    await newChatRef
      .set({
        key: newChatRef.id,
        email: id,
        createdDate: dayjs().valueOf(),
      })
      .catch((err) => {
        console.log(err);
      });
    alert('회원가입 성공!');
  } catch (error) {
    console.log(error, 'error');
    if (error.code === 'auth/email-already-in-use') {
      alert('이 이메일은 이미 사용 중입니다.');
    } else {
      alert(error.message);
    }
  }
};
