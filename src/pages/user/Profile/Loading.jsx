import React from 'react';
import infinityLoader from '../../../assets/icons/infinity-loader.svg';

const Loading = () => (
  <div className='h-full flex items-center justify-center'>
    <img src={infinityLoader} alt="Loading..." />
  </div>
);

export default Loading;