/** @jsxImportSource react */
import { useEffect, useRef, useState } from 'react';

// import Navigation from 'swiper';
// import Pagination from 'swiper';
// import Scrollbar from 'swiper';
// import A11y from 'swiper';

import styles from '../../../styles/Banner.module.scss';
import cx from 'classnames';
import chevronLeftIcon from '/public/assets/chevronLeftIcon.svg';
import chevronRightIcon from '/public/assets/chevronRightIcon.svg';
import { SkeletonBanner } from './components/SkeletonBanner';
import { getBanners } from '../../api/homepage/banner';

// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const Banner = () => {
  const [index, setIndex] = useState<number>(0);
  const swiperRefMobile = useRef<any>(null);
  const swiperRefDesktop = useRef<any>(null);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBanners();
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <section className={styles['banner']}>
      <div
        data-cy="home-desktop__banner__slideshow__slider"
        className={cx(styles['banner__slideshow'], styles['desktop'])}
      >
        <div
          className={cx(styles['banner__slideshow__slider'], styles['desktop'])}
        >
          {data?.map((news: any, index: any) => (
            <div key={index}>
              <a href={`/${news.itemHref}`}>
                <img
                  {...(index === 0 && { priority: 'true' })}
                  height={475}
                  width={1500}
                  className={styles['banner__slideshow__slider__img']}
                  src={news.desktopImg}
                  alt={news.bannerName}
                />
              </a>
            </div>
          ))}
        </div>

        <div className={styles['banner__slideshow__navigation']}>
          <div
            className={cx(
              styles['banner__slideshow__navigation__directions__previous'],
              styles['banner__slideshow__navigation__directions'],
            )}
          >
            <button
              onClick={() => swiperRefDesktop.current.slidePrev()}
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
            <div>/ 0{data?.length}</div>
          </div>
          <div
            className={cx(
              styles['banner__slideshow__navigation__directions__next'],
              styles['banner__slideshow__navigation__directions'],
            )}
          >
            <button
              onClick={() => swiperRefDesktop.current.slideNext()}
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

export default Banner;
