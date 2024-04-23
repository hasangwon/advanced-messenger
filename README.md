### 상담 메신저 앱
기술 스택 : Next.js, Context API, Typescript, TailwindCSS, Firebase

- React, Firebase, TailwindCSS를 사용하여 이전 회사에서 알던 지식들을 정리하고, 부족하다고 생각했던 부분을 보완해보는 개인 프로젝트
- 실시간 대화를 Firebase snapshot으로 개발하고, 메신저 중심적으로 개발함
- 이전 회사의 서비스와 같이 쿼리파라미터를 사용하여 (관리자 + 고객)을 구분하는 방식으로 구현함
- 각 메신저를 사용하는 channel과 그 하위 트리에 생성되는 chat의 키 값을 쿼리에 담아서 채팅을 할 수 있도록 구현함
- (문제점) 관리자는 firebase authentication으로 로그인하지만, 사용자는 쿼리파라미터로 메신저 대화를 하기 때문에, 주소만 탈취하면 다른 사람이 해당 대화 내용을 탈취할 수 있음
- (진행중) 해당 채팅의 비밀번호를 걸거나 일정 시간 뒤에 대화를 만료시키는 기능 추가 예정
<br />

(좌: 상담 관리자, 우: 상담 이용자)

![image](https://github.com/hasangwon/advanced-messenger/assets/75872687/bbf8d794-c18e-4394-a4d7-c09d8255b5f6)

![image](https://github.com/hasangwon/advanced-messenger/assets/75872687/be1daba5-7b46-48b8-abc7-289fdc49a2fe)

![image](https://github.com/hasangwon/advanced-messenger/assets/75872687/211c9a05-0a8a-4d0f-8797-ac86440f3125)
