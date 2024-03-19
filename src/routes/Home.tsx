import styles from './styles/Home.module.scss';
import { QBanner } from './react/components/Banner/Banner';
import { QRecommended } from './react/components/Recommended/Recommended';
import { QMostPopular } from './react/components/MostPopular/MostPopular';
import { QWhoWeAre } from './react/components/WhoWeAre/WhoWeAre';

const Home$ = () => {
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
    <div class={styles['home']}>
      <QBanner />

      <QRecommended />

      <QMostPopular />

      {/* {shouldLoadInstagram && <Instagram heading="Instagram" />}

      {shouldLoadLatestReleases && <LatestReleases />}

      {shouldLoadPriceDrops && <PriceDrops />}

      {shouldLoadBrands && <Brands />}

      {shouldLoadOutfits && <OutfitsRow heading="Outfits" />}

      {shouldWeLoadBlogPosts && <BlogPostsButton />} */}

      <QWhoWeAre />
    </div>
  );
};

export default Home$;
