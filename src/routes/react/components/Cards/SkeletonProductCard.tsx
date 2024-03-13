/** @jsxImportSource react */
import styles from './styles/Card.module.scss';
import cx from 'classnames';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

const SkeletonProductCard: FC = () => {
  const router = useRouter();
  return (
    <article className={styles['product-card']}>
      <div className={styles['product-card__container']}>
        <div
          className={cx(
            styles['product-card__container__image__skeleton'],
            styles['skeleton'],
            {
              [styles['skeleton__mw40']]: router.pathname === '/[products]',
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
              [styles['skeleton__mw40']]: router.pathname === '/[products]',
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
              [styles['skeleton__mw40']]: router.pathname === '/[products]',
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
                  [styles['skeleton__mw40']]: router.pathname === '/[products]',
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
