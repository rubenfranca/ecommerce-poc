import React, { FC } from 'react';
import Button from './../forms/Button';

interface LoadMoreProps {
  onLoadMoreEvt: () => void;
}

const LoadMore: FC<LoadMoreProps> = ({ onLoadMoreEvt = () => {} }) => {
  return <Button onClick={() => onLoadMoreEvt()}>Load More</Button>;
};

export default LoadMore;
