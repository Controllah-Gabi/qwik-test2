/** @jsxImportSource react */
import GridRowWith10Columns from '../Grid/GridRowWith10Columns';
import GridRowWith10ColumnsSkeleton from '../Grid/GridRowWith10ColumnsSkeleton';
import { FC, useEffect, useState } from 'react';

import {
  getProductsSearch,
  useGetProductsSearch,
} from '../../api/product/products';
import { getMostPopular } from '../../api/homepage/homepageMostPopular';

const MostPopular: FC = () => {
  // const { data, isLoading, refetch } = useGetProductsSearch({
  //   slug: 'most-popular',
  //   sort: '-popularity',
  //   gender: 'men',
  //   limit: 10,
  // });
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMostPopular();
      setData(response);
    };
    fetchData();
  }, []);
  if (data[0] === undefined) {
    return <GridRowWith10ColumnsSkeleton heading="Most Popular" />;
  }

  return (
    <GridRowWith10Columns
      heading="Most Popular"
      // @ts-ignore
      data={data}
      more="View All"
      href={`/most-popular?gender=men&sort=-popularity`}
    />
  );
};

export default MostPopular;
