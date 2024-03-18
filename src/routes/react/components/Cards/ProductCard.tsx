/** @jsxImportSource react */
import greenCircleIcon from '/public/assets/greenCircleIcon.svg';
import redCircleIcon from '/public/assets/redCircleIcon.svg';
import styles from '../../../styles/Card.module.scss';
import cx from 'classnames';
import { useState, FC } from 'react';
import { displayFloatPrice } from '../../../../utils/displayFloatPrice';

interface ProductCardProps {
  sale?: boolean; // Assuming sale is optional and of type boolean
  name: string;
  alt: string;
  price: number; // Assuming price is a number
  priceBefore?: number; // Assuming priceBefore is optional and of type number
  inStock: boolean;
  src: string;
  coloursShown: string;
  index?: number;
}

const ProductCard: FC<ProductCardProps> = ({
  sale,
  name,
  alt,
  price,
  priceBefore,
  inStock,
  src,
  coloursShown,
  index,
}) => {
  const [isimgLoading, setIsimgLoading] = useState(true);
  return (
    <article className={styles['product-card']}>
      <div className={styles['product-card__container']}>
        <div className={styles['product-card__container__img']}>
          <img
            {...(index! < 4 && { priority: 'true' })}
            key={index}
            width={290}
            height={360}
            src={src}
            alt={alt}
            className={cx(
              isimgLoading ? styles['opacity-0'] : styles['transition-op'],
            )}
            onLoad={() => setIsimgLoading(false)}
          />
        </div>
      </div>
      <div
        className={cx(styles['product-card__container__info'], {
          [styles['product-card__container__info--pd']]: true,
        })}
      >
        <div className={styles['product-card__container__info__brand']}>
          <p>{name}</p>
        </div>
        <div className={styles['product-card__container__info__colours']}>
          <p className={styles['product-card__container__info__colours__text']}>
            {coloursShown}
          </p>
        </div>
        <div className={styles['product-card__container__info__availability']}>
          <div>
            <div
              className={
                styles['product-card__container__info__availability__container']
              }
            >
              <p
                className={
                  styles[
                    'product-card__container__info__availability__container__text'
                  ]
                }
              >
                {sale ? (
                  <>
                    <span
                      className={
                        styles[
                          'product-card__container__info__availability__container__text__from'
                        ]
                      }
                    >
                      From{' '}
                    </span>
                    <span
                      className={
                        styles[
                          'product-card__container__info__availability__container__text__prev-price'
                        ]
                      }
                    >
                      £{priceBefore! > price ? priceBefore : price}
                    </span>
                    <span
                      className={
                        styles[
                          'product-card__container__info__availability__container__text__offer-price'
                        ]
                      }
                    >
                      {' '}
                      £
                      {
                        //@ts-ignore
                        price > priceBefore
                          ? displayFloatPrice(priceBefore!)
                          : displayFloatPrice(price)
                      }
                    </span>
                  </>
                ) : (
                  <>
                    From{' '}
                    <span
                      className={
                        styles[
                          'product-card__container__info__availability__container__text__price'
                        ]
                      }
                    >
                      £{displayFloatPrice(price)}
                    </span>{' '}
                  </>
                )}
                <img
                  src={inStock ? greenCircleIcon : redCircleIcon}
                  alt={inStock ? 'In Stock' : 'Sold Out'}
                  height={15}
                  width={15}
                  className={
                    styles[
                      'product-card__container__info__availability__container__text__img'
                    ]
                  }
                />{' '}
                {inStock ? 'In Stock' : 'Sold Out'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
