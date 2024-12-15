import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonCardProps {
  isLoading: boolean;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ isLoading }) => {
  return (
    <SkeletonTheme baseColor='white' highlightColor='#1aade3'>
      <Skeleton height={60} width={250} borderRadius={10} />
    </SkeletonTheme>
  );
};

export default SkeletonCard;
