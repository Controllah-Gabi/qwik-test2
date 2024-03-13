/** @jsxImportSource react */
import React from 'react';
import SkeletonProductCard from '../Cards/SkeletonProductCard';
import styles from './styles/Grid.module.scss';

interface GridRowWith10ColumnsSkeletonProps {
  heading?: string;
}

const GridRowWith10ColumnsSkeleton: React.FC<
  GridRowWith10ColumnsSkeletonProps
> = ({ heading }) => {
  const listNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section>
      <div className={styles['product-row__container']}>
        <h2 className={styles['product-row__container__title']}>{heading}</h2>
      </div>
      <div className={styles['product-row__container__vessel']}>
        {listNum.map((item, index) => (
          <div
            key={item}
            className={styles['product-row__container__vessel__card']}
          >
            <div>
              <SkeletonProductCard />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GridRowWith10ColumnsSkeleton;
