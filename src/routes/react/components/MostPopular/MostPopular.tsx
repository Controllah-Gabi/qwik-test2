/** @jsxImportSource react */
import { dehydrate, QueryClient } from '@tanstack/react-query';
import GridRowWith10Columns from '@/components/Grid/GridRowWith10Columns';
import GridRowWith10ColumnsSkeleton from '@/components/Grid/GridRowWith10ColumnsSkeleton';
import { GetStaticProps } from 'next';
import React from 'react';
import { useGetGender } from '@/hooks/useGetGender';
import {
  getProductsSearch,
  useGetProductsSearch,
} from '@/api/product/products';

const MostPopular: React.FC = () => {
  const { selectedGender } = useGetGender();
  const { data, isLoading, refetch } = useGetProductsSearch({
    slug: 'most-popular',
    sort: '-popularity',
    gender: selectedGender,
    limit: 10,
  });
  refetch();

  return isLoading || !data ? (
    <GridRowWith10ColumnsSkeleton />
  ) : (
    <GridRowWith10Columns
      heading="Most Popular"
      // @ts-ignore
      data={data.pages[0]}
      more="View All"
      href={`/most-popular?gender=${selectedGender}&sort=-popularity`}
    />
  );
};

export default MostPopular;

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([
    'products',
    getProductsSearch({
      slug: 'most-popular',
      sort: '-popularity',
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
