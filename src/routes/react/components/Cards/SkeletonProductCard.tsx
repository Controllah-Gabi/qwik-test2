/** @jsxImportSource react */
import styles from '../../../styles/Card.module.scss';
import cx from 'classnames';
import { FC } from 'react';

const SkeletonProductCard: FC = () => {
  return (
    <article className={styles['product-card']}>
      <div className={styles['product-card__container']}>
        <div
          className={cx(
            styles['product-card__container__image__skeleton'],
            styles['skeleton'],
            {
              [styles['skeleton__mw40']]:
                window.location.pathname === '/[products]',
            },
          )}
        ></div>
      </div>
      <div className={styles['product-card__container__info__skeleton']}>
        <div
          className={cx(
            styles['product-card__container__info__colours'],
            styles['skeleton'],
            {
              [styles['skeleton__mw40']]:
                window.location.pathname === '/[products]',
            },
          )}
        >
          <p
            className={styles['product-card__container__info__colours__text']}
          ></p>
        </div>
        <div
          className={cx(
            styles['product-card__container__info__availability'],
            styles['skeleton'],
            {
              [styles['skeleton__mw40']]:
                window.location.pathname === '/[products]',
            },
          )}
        >
          <div>
            <div
              className={cx(
                styles[
                  'product-card__container__info__availability__container'
                ],
                styles['skeleton'],
                {
                  [styles['skeleton__mw40']]:
                    window.location.pathname === '/[products]',
                },
              )}
            ></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SkeletonProductCard;
