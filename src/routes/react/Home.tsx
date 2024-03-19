/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { useEffect, useState, FC } from 'react';
import styles from '../styles/Home.module.scss';
// import { WhoWeAre } from './components/WhoWeAre';
import GridRowWith10ColumnsSkeleton from './components/Grid/GridRowWith10ColumnsSkeleton';
import { SkeletonBanner } from './components/Banner/components/SkeletonBanner';
import BlogPostsButton from './components/BlogPostsButton';
import WhoWeAre from './components/WhoWeAre';
import Banner from './components/Banner';
import Recommended from './components/Recommended';
import MostPopular from './components/MostPopular';

const Home: FC = () => {
  const [shouldLoadInstagram, setShouldLoadInstagram] = useState(false);
  const [shouldLoadLatestReleases, setShouldLoadLatestReleases] =
    useState(false);
  const [shouldLoadPriceDrops, setShouldLoadPriceDrops] = useState(false);
  const [shouldLoadBrands, setShouldLoadBrands] = useState(false);
  const [shouldLoadOutfits, setShouldLoadOutfits] = useState(false);
  const [shouldLoadWhoWeAre, setShouldLoadWhoWeAre] = useState(false);
  const [shouldLoadRecommended, setShouldLoadRecommended] = useState(false);
  const [shouldLoadBanner, setShouldLoadBanner] = useState(false);
  const [shouldLoadMostPopular, setShouldLoadMostPopular] = useState(false);
  const [shouldWeLoadBlogPosts, setShouldLoadBlogPosts] = useState(false);

  const mobile = false;

  // useEffect(() => {
  //   setShouldLoadBanner(true);
  //   window.addEventListener('scroll', function () {
  //     if (window.scrollY > 200) {
  //       setShouldLoadInstagram(true);
  //     }
  //     if (window.scrollY > 500) {
  //       setShouldLoadLatestReleases(true);
  //     }
  //     if (window.scrollY > 900) {
  //       setShouldLoadPriceDrops(true);
  //     }
  //     if (window.scrollY > 1500) {
  //       setShouldLoadBrands(true);
  //     }
  //     if (window.scrollY > 2000) {
  //       setShouldLoadOutfits(true);
  //     }
  //     if (window.scrollY > 2200) {
  //       setShouldLoadWhoWeAre(true);
  //       setShouldLoadBlogPosts(true);
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener('scroll', () => {});
  //   };
  // }, []);

  // useEffect(() => {
  //   if (Banner) {
  //     setShouldLoadRecommended(true);
  //     setShouldLoadMostPopular(true);
  //   }
  // }, [Banner]);

  return (
    <div className={styles['home']}>
      <Banner />

      <Recommended />

      <MostPopular />

      {/* {shouldLoadInstagram && <Instagram heading="Instagram" />}

      {shouldLoadLatestReleases && <LatestReleases />}

      {shouldLoadPriceDrops && <PriceDrops />}

      {shouldLoadBrands && <Brands />}

      {shouldLoadOutfits && <OutfitsRow heading="Outfits" />}

      {shouldWeLoadBlogPosts && <BlogPostsButton />} */}

      <WhoWeAre />
    </div>
  );
};

export const QHome = qwikify$(Home, { eagerness: 'visible' });
