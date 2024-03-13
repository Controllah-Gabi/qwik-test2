/** @jsxImportSource react */
import {
  getOutfitsHomePage,
  useGetOutfitsHomePage,
} from '@/api/outfit/outfits';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import GridRowWith10ColumnsSkeleton from '../../Grid/GridRowWith10ColumnsSkeleton';
import Link from 'next/link';
import OutfitCard from '../../Cards/OutfitCard';
import styles from '@/components/Grid/styles/Grid.module.scss';
import { ScrollLeftRightButtons } from './ScrollButtons';
import React, { useRef } from 'react';
import { useGetGender } from '@/hooks/useGetGender';

interface OutfitsRowProps {
  heading: string;
}

const OutfitsRow: React.FC<OutfitsRowProps> = ({ heading }) => {
  const { data: outfits, isLoading, refetch } = useGetOutfitsHomePage();
  refetch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedGender } = useGetGender();

  return isLoading ? (
    <GridRowWith10ColumnsSkeleton />
  ) : (
    <section>
      <div className={styles['product-row__container']}>
        <h2 className={styles['product-row__container__title']}>{heading}</h2>
        <div className={styles['product-row__container--flex']}>
          <div className={styles['product-row__container--position']}>
            <ScrollLeftRightButtons scrollRef={scrollRef} />
          </div>
          <Link
            href={`/outfits?gender=${selectedGender}`}
            className={styles['product-row__container__recommended']}
          >
            View All
          </Link>
        </div>
      </div>
      <div
        data-cy="home-desktop__outfits-row"
        className={styles['product-row__container__vessel']}
        ref={scrollRef}
      >
        {outfits?.map((item, index) => {
          return (
            <Link
              href={`/outfits/${item._id}`}
              data-cy="product-card"
              className={styles['product-row__container__vessel__card']}
              key={index}
            >
              <OutfitCard
                colour={item.outfitColours}
                sale={item.sale}
                name={item.outfitName}
                alt={item.outfitName}
                price={item.cheapestPrice}
                priceBefore={item.beforePrice}
                inStock={item.inStock}
                src={item.mainImage}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default OutfitsRow;

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['outfits/homepage'], () =>
    getOutfitsHomePage(),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
