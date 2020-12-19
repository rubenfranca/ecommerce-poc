import React, { FC } from 'react';
import './styles.scss';

import ShopMen from '../../assets/shopMens.jpg';
import ShopWomen from '../../assets/shopWomens.jpg';

const Directory: FC = () => {
  return (
    <div className='directory'>
      <div className='wrap'>
        <div
          className='item'
          style={{
            backgroundImage: `url(${ShopWomen})`,
          }}
        >
          <a>Shop Womens</a>
        </div>
        <div
          className='item'
          style={{
            backgroundImage: `url(${ShopMen})`,
          }}
        >
          <a>Shop Mens</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
