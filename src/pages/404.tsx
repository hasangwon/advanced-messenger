const NotFoundPage = () => {
  return (
    <div className='bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 grid place-items-center lg:px-8 m-auto'>
      <div className='max-w-max m-auto'>
        <main className='sm:flex m-auto'>
          <p className='text-4xl font-extrabold text-primary-500 sm:text-5xl'>
            404
          </p>
          <div className='sm:ml-6'>
            <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
              <h1 className='text-2xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
                페이지를 찾을 수 없습니다.
              </h1>
              <p className='mt-1 text-base text-gray-500'>
                전달받으신 주소로만 사용가능한 전용 채팅 페이지 입니다. 문자의
                주소를 잘 확인하시고 입력해주세요!
              </p>
            </div>
            {/* <div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
              <a
                href='https://vetflux.channel.io'
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
              >
                고객센터 문의하기
              </a>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFoundPage;
