/** @jsxImportSource react */
import { FC } from 'react';
import cx from 'classnames';
import styles from '../../../styles/Card.module.scss';
type UpAndComingProductCardProps = {
  name: string;
  alt: string;
  price: number;
  src: string;
  comingSoonTime: string;
  coloursShown: string;
};

const UpAndComingProductCard: FC<UpAndComingProductCardProps> = ({
  name,
  alt,
  price,
  src,
  coloursShown,
  comingSoonTime,
}) => {
  return (
    <article className={styles['product-card']}>
      <div className={styles['product-card__container']}>
        <div className={styles['product-card__container__image']}>
          <img width={264} height={264} src={src} alt={alt} />
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
                From{' '}
                <span
                  className={
                    styles[
                      'product-card__container__info__availability__container__text__price'
                    ]
                  }
                >
                  £{price}
                </span>{' '}
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            styles['product-card__container__info__availability__release-date']
          }
        >
          <p>Release Date: {comingSoonTime}</p>
        </div>
      </div>
    </article>
  );
};

export default UpAndComingProductCard;
