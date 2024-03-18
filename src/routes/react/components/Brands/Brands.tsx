/** @jsxImportSource react */
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import styles from '../../../styles/Grid.module.scss';
import { getBrands, useGetBrands } from '../../api/homepage/brands';
import GridRowWith10ColumnsSkeleton from '../Grid/GridRowWith10ColumnsSkeleton';

const Brands: FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBrands();
      setData(response);
    };
    fetchData();
  }, []);
  const selectedGender = 'men';

  return (
    <section>
      <div className={styles['product-row__container']}>
        <h2 className={styles['product-row__container__title']}>Brands</h2>
      </div>
      <div
        data-cy="home-desktop__brands__container"
        className={styles['product-row__container__brand']}
      >
        {data.map((element: any, index: any) => (
          <Link
            data-cy="home-desktop__brands__container__brand"
            href={element.brandHref + `?gender=${selectedGender}`}
            key={index}
          >
            <div className={styles['product-row__container__brand__container']}>
              <article
                className={
                  styles['product-row__container__brand__container__vessel']
                }
              >
                <img
                  width={300}
                  height={300}
                  src={
                    //@ts-ignore
                    element.brandImg?.[selectedGender]
                  }
                  alt={element.brandName}
                  className={
                    styles[
                      'product-row__container__brand__container__vessel__image'
                    ]
                  }
                />
                <div
                  className={
                    styles[
                      'product-row__container__brand__container__vessel__info'
                    ]
                  }
                >
                  <p>{element.brandName}</p>
                  <p
                    className={
                      styles[
                        'product-row__container__brand__container__vessel__info__shop-option'
                      ]
                    }
                  >
                    Shop Now
                  </p>
                </div>
              </article>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Brands;
