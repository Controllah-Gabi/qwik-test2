/** @jsxImportSource react */
import Image from 'next/image';
import greenCircleIcon from '/public/assets/greenCircleIcon.svg';
import redCircleIcon from '/public/assets/redCircleIcon.svg';
import styles from '../../../styles/Card.module.scss';
import cx from 'classnames';
import { useState, FC } from 'react';
import { displayFloatPrice } from '../../../../utils/displayFloatPrice';

interface OutfitCardProps {
  sale?: boolean; // Assuming sale is optional and of type boolean
  name: string;
  alt: string;
  price: number; // Assuming price is a number
  priceBefore?: number; // Assuming priceBefore is optional and of type number
  inStock: boolean;
  src: string;
  colour: string; // Assuming colour is a string
}

const OutfitCard: FC<OutfitCardProps> = ({
  sale,
  name,
  alt,
  price,
  priceBefore,
  inStock,
  src,
  colour,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <article className={styles['product-card']}>
      <div className={styles['product-card__container']}>
        <div className={styles['product-card__container__outfit-image']}>
          <Image
            quality={20}
            width={264}
            height={264}
            src={src}
            alt={alt}
            className={cx(
              isImageLoading ? styles['opacity-0'] : styles['transition-op'],
            )}
            onLoadingComplete={() => setIsImageLoading(false)}
          />
        </div>
      </div>
      <div className={styles['product-card__container__info']}>
        <div className={styles['product-card__container__info__brand']}>
          <p>{name}</p>
        </div>
        <div className={styles['product-card__container__info__brand']}>
          <p className={styles['product-card__container__info__colour']}>
            {colour}
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
                    From{' '}
                    <span
                      className={
                        styles[
                          'product-card__container__info__availability__container__text__prev-price'
                        ]
                      }
                    >
                      £{displayFloatPrice(priceBefore!)}
                    </span>
                    <span
                      className={
                        styles[
                          'product-card__container__info__availability__container__text__offer-price'
                        ]
                      }
                    >
                      {' '}
                      £{displayFloatPrice(price)}
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
                <Image
                  quality={20}
                  src={inStock ? greenCircleIcon : redCircleIcon}
                  alt={inStock ? 'In Stock' : 'Sold Out'}
                  className={
                    styles[
                      'product-card__container__info__availability__container__text__image'
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

export default OutfitCard;
