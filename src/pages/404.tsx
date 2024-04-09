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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotFoundPage;
