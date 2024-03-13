/** @jsxImportSource react */
import { dehydrate, QueryClient } from '@tanstack/react-query';
import GridRowWith10ColumnsSkeleton from '@/components/Grid/GridRowWith10ColumnsSkeleton';
import {
  getRecommended,
  useGetRecommended,
} from '../../../../api/homepage/homepageRecommended';
import { GetStaticProps, NextPage } from 'next';
import GridRowWith10Columns from '../../components/Grid/GridRowWith10Columns';

const Recommended: NextPage = () => {
  const { data, isLoading, refetch } = useGetRecommended();
  refetch();

  return isLoading ? (
    <GridRowWith10ColumnsSkeleton heading="For you" />
  ) : (
    <GridRowWith10Columns heading="For You" data={data} />
  );
};

export default Recommended;
