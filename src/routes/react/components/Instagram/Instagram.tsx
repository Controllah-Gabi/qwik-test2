/** @jsxImportSource react */
import { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { AiOutlineInstagram, AiOutlineShopping } from 'react-icons/ai';
import { getInstagram, useGetInstagram } from '../../api/homepage/instagram';
import GridRowWith10ColumnsSkeleton from '../Grid/GridRowWith10ColumnsSkeleton';

import { ScrollLeftRightButtons } from '../ScrollButtons';
import styles from '../../../styles/Grid.module.scss';
import { Product } from '../../api/product/products';

interface PopularProps {
  heading: string;
}

interface InstagramDataItem {
  products: Product[];
  img: string;
  title: string;
}

// const InstagramModal = dynamic(
//   () => import('@/components/Modal/InstagramModal'),
//   {
//     loading: () => <ModalLoading />,
//   },
// );

const Popular: FC<PopularProps> = ({ heading }) => {
  const [payload, setPayload] = useState<InstagramDataItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInstagram();
      setData(response);
    };
    fetchData();
  }, []);
  const handlePostClicked = (item: InstagramDataItem) => {
    // lockScreen();
    // dispatch(instagramPostClicked);
    setPayload(item);
  };

  return (
    <>
      {/* {isInstagramPostOpen && payload && <InstagramModal payload={payload} />} */}
      <section>
        <div className={styles['product-row__container']}>
          <h2 className={styles['product-row__container__title']}>{heading}</h2>
          <div className={styles['product-row__container__btn-section']}>
            <ScrollLeftRightButtons scrollRef={scrollRef} />
          </div>
        </div>
        <div
          data-cy="home-desktop__instagram__products"
          className={cx(
            styles['product-row__container__vessel'],
            styles['product-row__container__vessel--center'],
          )}
          ref={scrollRef}
        >
          {data.map((item: any, id: any) => (
            <div
              key={id}
              data-cy="product-card"
              className={styles['product-row__container__vessel__card']}
              onClick={() => handlePostClicked(item)}
            >
              <div
                className={
                  styles['product-row__container__vessel__card__container']
                }
              >
                <div>
                  <img
                    className={cx(
                      styles[
                        'product-row__container__vessel__card__container__image'
                      ],
                      isImageLoading
                        ? styles['opacity-0']
                        : styles['transition-op'],
                    )}
                    onLoad={() => setIsImageLoading(false)}
                    height={264}
                    width={264}
                    src={item.img}
                    alt={item.title}
                  />
                </div>
              </div>
              <div
                className={
                  styles[
                    'product-row__container__vessel__card__container__instagram'
                  ]
                }
              >
                <div
                  className={
                    styles[
                      'product-row__container__vessel__card__container__instagram__stock'
                    ]
                  }
                >
                  <AiOutlineShopping className={styles['shopping-icon']} />
                  <span>View Items</span>
                </div>
                <AiOutlineInstagram className={styles['instagram-icon']} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Popular;
