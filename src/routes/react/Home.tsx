/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './styles/Home.module.scss';
// import { WhoWeAre } from './components/WhoWeAre';
import GridRowWith10ColumnsSkeleton from './components/Grid/GridRowWith10ColumnsSkeleton';
import { SkeletonBanner } from './components/Banner/components/SkeletonBanner';
import BlogPostsButton from './components/BlogPostsButton';
// import { IsMobileContext } from '@/contexts/IsMobileContext';

const Banner = dynamic(() => import('./components/Banner'), {
  loading: () => <SkeletonBanner />,
});
const MobileBanner = dynamic(() => import('./components/Banner/MobileBanner'), {
  loading: () => <SkeletonBanner />,
});
const Recommended = dynamic(() => import('./components/Recommended'), {
  loading: () => <GridRowWith10ColumnsSkeleton />,
});
const Instagram = dynamic(() => import('./components/Instagram'), {
  loading: () => <GridRowWith10ColumnsSkeleton />,
});
const LatestReleases = dynamic(() => import('./components/LatestReleases'), {
  loading: () => <GridRowWith10ColumnsSkeleton />,
});
const PriceDrops = dynamic(() => import('./components/PriceDrops'), {
  loading: () => <GridRowWith10ColumnsSkeleton />,
});
const OutfitsRow = dynamic(() => import('./components/OutfitsRow'), {
  loading: () => <GridRowWith10ColumnsSkeleton />,
});
const Brands = dynamic(() => import('./components/Brands'), {
  loading: () => <GridRowWith10ColumnsSkeleton />,
});
const WhoWeAre = dynamic(() => import('./components/WhoWeAre'));

const MostPopular = dynamic(() => import('./components/MostPopular'), {
  loading: () => <GridRowWith10ColumnsSkeleton />,
});

const Home: React.FC = () => {
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

  //   const mobile = useContext(IsMobileContext);
  const mobile = true;

  useEffect(() => {
    setShouldLoadBanner(true);
    window.addEventListener('scroll', function () {
      if (window.scrollY > 200) {
        setShouldLoadInstagram(true);
      }
      if (window.scrollY > 500) {
        setShouldLoadLatestReleases(true);
      }
      if (window.scrollY > 900) {
        setShouldLoadPriceDrops(true);
      }
      if (window.scrollY > 1500) {
        setShouldLoadBrands(true);
      }
      if (window.scrollY > 2000) {
        setShouldLoadOutfits(true);
      }
      if (window.scrollY > 2200) {
        setShouldLoadWhoWeAre(true);
        setShouldLoadBlogPosts(true);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  useEffect(() => {
    if (Banner) {
      setShouldLoadRecommended(true);
      setShouldLoadMostPopular(true);
    }
  }, [Banner]);

  return (
    <div className={styles['home']}>
      {shouldLoadBanner && !mobile ? <Banner /> : <MobileBanner />}

      {shouldLoadRecommended && <Recommended />}

      {shouldLoadMostPopular && <MostPopular />}

      {shouldLoadInstagram && <Instagram heading="Instagram" />}

      {shouldLoadLatestReleases && <LatestReleases />}

      {shouldLoadPriceDrops && <PriceDrops />}

      {shouldLoadBrands && <Brands />}

      {shouldLoadOutfits && <OutfitsRow heading="Outfits" />}

      {shouldWeLoadBlogPosts && <BlogPostsButton />}

      {shouldLoadWhoWeAre && <WhoWeAre />}
    </div>
  );
};

export const QHome = qwikify$(Home, { eagerness: 'visible' });
