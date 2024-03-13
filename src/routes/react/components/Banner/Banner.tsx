/** @jsxImportSource react */
import { useRef, useState } from 'react';
import Image from 'next/image';
import Navigation from 'swiper';
import Pagination from 'swiper';
import Scrollbar from 'swiper';
import A11y from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './styles/Banner.module.scss';
import cx from 'classnames';
import chevronLeftIcon from '/public/assets/chevronLeftIcon.svg';
import chevronRightIcon from '/public/assets/chevronRightIcon.svg';
import { SkeletonBanner } from './components/SkeletonBanner';
import { useGetBanners } from '../../../../api/homepage/banner';
import Link from 'next/link';

const Banner = () => {
  const [index, setIndex] = useState<number>(0);
  const swiperRefMobile = useRef<any>(null);
  const swiperRefDesktop = useRef<any>(null);
  const { data, isLoading, refetch } = useGetBanners();

  refetch();

  return (
    <section className={styles['banner']}>
      <Swiper
        data-cy="home-desktop__banner__slideshow__slider"
        className={cx(styles['banner__slideshow'], styles['desktop'])}
        onSwiper={(swiper) => {
          swiperRefDesktop.current = swiper;
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
          className={cx(styles['banner__slideshow__slider'], styles['desktop'])}
        >
          {isLoading ? (
            <SkeletonBanner />
          ) : (
            data?.map((news, index) => (
              <SwiperSlide key={index}>
                <Link href={`/${news.itemHref}`}>
                  <img
                    {...(index === 0 && { priority: true })}
                    height={475}
                    width={1500}
                    className={styles['banner__slideshow__slider__img']}
                    src={news.desktopImg}
                    alt={news.bannerName}
                  />
                </Link>
              </SwiperSlide>
            ))
          )}
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
              <Image
                src={chevronLeftIcon}
                id="chevron-left"
                aria-labelledby="left-chevron"
                width={30}
                height={30}
                alt="left chevron"
                className={
                  styles[
                    'banner__slideshow__navigation__directions__image__chevron'
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
            <div>/ 0{isLoading ? null : data?.length}</div>
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
              <Image
                src={chevronRightIcon}
                id="chevron-right"
                aria-labelledby="right-chevron"
                width={30}
                height={30}
                alt="right chevron"
                className={
                  styles[
                    'banner__slideshow__navigation__directions__image__chevron'
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

export default Banner;
