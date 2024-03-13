/** @jsxImportSource react */
import React, { RefObject } from 'react';
import chevronLeftIcon from '/public/assets/chevronLeftIcon.svg';
import chevronRightIcon from '/public/assets/chevronRightIcon.svg';
import Image from 'next/image';
import { smoothScroll } from '@/hooks/useSmoothScroll';
import styles from '../styles/ScrollButtons.module.scss';
import cx from 'classnames';
import { useRouter } from 'next/router';

interface ScrollButtonProps {
  scrollRef: RefObject<HTMLDivElement>;
}

export const ScrollLeftButton: React.FC<ScrollButtonProps> = ({
  scrollRef,
}) => (
  <div className={styles['scroll-button__left']}>
    <button
      className={styles['scroll-button__left__button']}
      onClick={() => smoothScroll(-400, scrollRef)}
    >
      <Image
        quality={20}
        src={chevronLeftIcon}
        id="chevron-left"
        aria-labelledby="left-chevron"
        width={30}
        height={30}
        alt="left chevron"
      />
    </button>
  </div>
);

export const ScrollRightButton: React.FC<ScrollButtonProps> = ({
  scrollRef,
}) => {
  const router = useRouter();
  return (
    <div
      className={cx(styles['scroll-button__right'], {
        [styles['scroll-button__right__product-sec']]:
          router.pathname === '/products/[id]',
      })}
    >
      <button
        className={styles['scroll-button__right__button']}
        onClick={() => smoothScroll(400, scrollRef)}
      >
        <Image
          quality={20}
          src={chevronRightIcon}
          id="chevron-right"
          aria-labelledby="right-chevron"
          width={30}
          height={30}
          alt="right chevron"
        />
      </button>
    </div>
  );
};

export const ScrollLeftRightButtons: React.FC<ScrollButtonProps> = ({
  scrollRef,
}) => (
  <>
    <div className={styles['scroll-buttons__left']}>
      <button
        className={styles['scroll-buttons__left__button']}
        onClick={() => smoothScroll(-400, scrollRef)}
      >
        <Image
          quality={20}
          src={chevronLeftIcon}
          id="chevron-left"
          aria-labelledby="left-chevron"
          width={30}
          height={30}
          alt="left chevron"
        />
      </button>
    </div>
    <div className={styles['scroll-buttons__right']}>
      <button
        className={styles['scroll-buttons__right__button']}
        onClick={() => smoothScroll(400, scrollRef)}
      >
        <Image
          quality={20}
          src={chevronRightIcon}
          id="chevron-right"
          aria-labelledby="right-chevron"
          width={30}
          height={30}
          alt="right chevron"
        />
      </button>
    </div>
  </>
);
