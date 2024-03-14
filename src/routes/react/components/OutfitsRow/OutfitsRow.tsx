/** @jsxImportSource react */
import { getOutfits, useGetOutfitsHomePage } from '../../api/outfit/outfits';

import GridRowWith10ColumnsSkeleton from '../Grid/GridRowWith10ColumnsSkeleton';
import Link from 'next/link';
import OutfitCard from '../Cards/OutfitCard';
import styles from '../../../styles/Grid.module.scss';
import { ScrollLeftRightButtons } from '../ScrollButtons';
import React, { useEffect, useRef, useState } from 'react';

interface OutfitsRowProps {
  heading: string;
}

const OutfitsRow: React.FC<OutfitsRowProps> = ({ heading }) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOutfits();
      setData(response);
    };
    fetchData();
  }, []);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (data[0] === undefined) {
    return <GridRowWith10ColumnsSkeleton heading="Outfits" />;
  }

  return (
    <section>
      <div className={styles['product-row__container']}>
        <h2 className={styles['product-row__container__title']}>{heading}</h2>
        <div className={styles['product-row__container--flex']}>
          <div className={styles['product-row__container--position']}>
            <ScrollLeftRightButtons scrollRef={scrollRef} />
          </div>
          <Link
            href={`/outfits?gender=men`}
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
        {data.outfits?.map((item: any, index: any) => {
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
