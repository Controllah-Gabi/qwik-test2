import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$, type RequestHandler } from '@builder.io/qwik-city';
import { QNavbar } from './react/Navbar';
import Home$ from './Home';
import { getBanners } from './react/api/homepage/banner';
import { getMostPopular } from './react/api/homepage/homepageMostPopular';
import { getRecommended } from './react/api/homepage/homepageRecommended';
import { brotliCompress, createBrotliCompress } from 'zlib';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
  createBrotliCompress();
};

export const useBannerData = routeLoader$(async () => {
  const res = await getBanners();
  return res;
});

export const useMostPopularData = routeLoader$(async () => {
  const res = await getMostPopular();
  return res;
});

export const useRecommendedData = routeLoader$(async () => {
  const res = await getRecommended();
  return res;
});

export default component$(() => {
  const bannerData = useBannerData();
  const mostPopularData = useMostPopularData();
  const recommendedData = useRecommendedData();
  return (
    <>
      <QNavbar />;
      <Home$
        bannerData={bannerData}
        mostPopularData={mostPopularData}
        recommendedData={recommendedData}
      />
    </>
  );
});
