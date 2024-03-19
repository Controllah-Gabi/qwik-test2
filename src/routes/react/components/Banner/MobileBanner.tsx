/** @jsxImportSource react */
import { useRef, useState } from 'react';

import 'swiper/css';
import styles from '../../../styles/Banner.module.scss';
import cx from 'classnames';
import chevronLeftIcon from '/public/assets/chevronLeftIcon.svg';
import chevronRightIcon from '/public/assets/chevronRightIcon.svg';
import { SkeletonBanner } from './components/SkeletonBanner';

const MobileBanner = () => {
  const [index, setIndex] = useState<number>(0);
  const swiperRefMobile = useRef<any>(null);
  const swiperRefDesktop = useRef<any>(null);
  const data = [
    {
      itemHref: 'test',
      mobileImg: '/public/assets/banner1Mobile.png',
      bannerName: 'test',
    },
  ];

  return (
    <section className={styles['banner']}>
      <div
        data-cy="home-mobile__banner__slideshow__slider"
        className={cx(styles['banner__slideshow'], styles['mobile'])}

        // modules={[Navigation, Pagination, Scrollbar, A11y]}
        // spaceBetween={1}
        // slidesPerView={1}
        // navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSlideChange={(e) => setIndex(e.activeIndex)}
      >
        <div
          className={cx(styles['banner__slideshow__slider'], styles['mobile'])}
        >
          {<SkeletonBanner />}
        </div>
        <div className={styles['banner__slideshow__slider__dots']}></div>

        <div className={styles['banner__slideshow__navigation']}>
          <div
            className={cx(
              styles['banner__slideshow__navigation__directions__previous'],
              styles['banner__slideshow__navigation__directions'],
            )}
          >
            <button
              onClick={() => swiperRefMobile.current.slidePrev()}
              aria-label="Previous Slide"
            >
              <img
                src={chevronLeftIcon}
                id="chevron-left"
                aria-labelledby="left-chevron"
                width={30}
                height={30}
                alt="left chevron"
                className={
                  styles[
                    'banner__slideshow__navigation__directions__img__chevron'
                  ]
                }
              />
            </button>
          </div>
          <div className={styles['banner__slideshow__navigation__info']}>
            <div
              className={
                styles['banner__slideshow__navigation__info__slide-count']
              }
            >
              0{index + 1}
            </div>
            <div>/ 0</div>
          </div>
          <div
            className={cx(
              styles['banner__slideshow__navigation__directions__next'],
              styles['banner__slideshow__navigation__directions'],
            )}
          >
            <button
              onClick={() => swiperRefMobile.current.slideNext()}
              aria-label="Next Slide"
            >
              <img
                src={chevronRightIcon}
                id="chevron-right"
                aria-labelledby="right-chevron"
                width={30}
                height={30}
                alt="right chevron"
                className={
                  styles[
                    'banner__slideshow__navigation__directions__img__chevron'
                  ]
                }
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileBanner;
