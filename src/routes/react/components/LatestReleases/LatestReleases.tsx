/** @jsxImportSource react */
import { dehydrate, QueryClient } from '@tanstack/react-query';
import GridRowWith10Columns from '@/components/Grid/GridRowWith10Columns';
import GridRowWith10ColumnsSkeleton from '@/components/Grid/GridRowWith10ColumnsSkeleton';
import {
  getLatestReleases,
  useGetLatestReleases,
} from '@/api/homepage/homepageLatestReleases';
import { GetStaticProps } from 'next';
import React from 'react';
import { useGetGender } from '@/hooks/useGetGender';

const LatestReleases: React.FC = () => {
  const { data, isLoading, refetch } = useGetLatestReleases();
  const { selectedGender } = useGetGender();
  refetch();
  return isLoading || !data ? (
    <GridRowWith10ColumnsSkeleton />
  ) : (
    <GridRowWith10Columns
      heading="Latest Releases"
      data={data}
      more="View All"
      href={`/latest?gender=${selectedGender}&sort=-dateAdded`}
    />
  );
};

export default LatestReleases;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['latest_releases'], () =>
    getLatestReleases(),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
