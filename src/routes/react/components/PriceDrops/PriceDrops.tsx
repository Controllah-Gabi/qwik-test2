/** @jsxImportSource react */
import { dehydrate, QueryClient } from '@tanstack/react-query';
import GridRowWith10Columns from '@/components/Grid/GridRowWith10Columns';
import GridRowWith10ColumnsSkeleton from '@/components/Grid/GridRowWith10ColumnsSkeleton';
import {
  getPriceDrops,
  useGetPriceDrops,
} from '@/api/homepage/homepagePriceDrops';
import { GetStaticProps } from 'next';
import { useGetGender } from '@/hooks/useGetGender';

const PriceDrops: React.FC = () => {
  const { data, isLoading, refetch } = useGetPriceDrops();
  refetch();
  const { selectedGender } = useGetGender();
  return isLoading ? (
    <GridRowWith10ColumnsSkeleton />
  ) : (
    <GridRowWith10Columns
      heading="Price Drops"
      data={data}
      more="View All"
      href={`/sale?gender=${selectedGender}`}
    />
  );
};

export default PriceDrops;

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['Price drops'], () => getPriceDrops());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
