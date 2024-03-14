/** @jsxImportSource react */
import { useRef, useState } from 'react';
import Navigation from 'swiper';
import Pagination from 'swiper';
import Scrollbar from 'swiper';
import A11y from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from '../../../styles/Banner.module.scss';
import cx from 'classnames';
import chevronLeftIcon from '/public/assets/chevronLeftIcon.svg';
import chevronRightIcon from '/public/assets/chevronRightIcon.svg';
import { SkeletonBanner } from './components/SkeletonBanner';
import { useGetBanners } from '../../api/homepage/banner';
import Link from 'next/link';

const MobileBanner = () => {
  const [index, setIndex] = useState<number>(0);
  const swiperRefMobile = useRef<any>(null);
  const swiperRefDesktop = useRef<any>(null);
  const { data, isLoading, refetch } = useGetBanners();

  refetch();

  return (
    <section className={styles['banner']}>
      <Swiper
        data-cy="home-mobile__banner__slideshow__slider"
        className={cx(styles['banner__slideshow'], styles['mobile'])}
        onSwiper={(swiper) => {
          swiperRefMobile.current = swiper;
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={1}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={(e) => setIndex(e.activeIndex)}
      >
        <div
          className={cx(styles['banner__slideshow__slider'], styles['mobile'])}
        >
          {isLoading ? (
            <SkeletonBanner />
          ) : (
            data!.map((news, index) => (
              <SwiperSlide key={index}>
                <Link href={`/${news.itemHref}`}>
                  <img
                    {...(index === 0 && { priority: 'true' })}
                    height={202}
                    width={320}
                    className={styles['banner__slideshow__slider__img']}
                    src={news.mobileImg}
                    alt={news.bannerName}
                  />
                </Link>
              </SwiperSlide>
            ))
          )}
        </div>
        <div className={styles['banner__slideshow__slider__dots']}>
          {isLoading
            ? null
            : data!.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setIndex(idx);
                    swiperRefMobile.current.slideTo(idx);
                  }}
                  className={cx(
                    styles['banner__slideshow__slider__dots__dot'],
                    {
                      [styles['banner__slideshow__slider__dots__dot--active']]:
                        index === idx,
                    },
                  )}
                ></div>
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
            <div>/ 0{isLoading ? null : data!.length}</div>
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
      </Swiper>
    </section>
  );
};

export default MobileBanner;
