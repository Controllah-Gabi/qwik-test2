/** @jsxImportSource react */
import GridRowWith10Columns from '../Grid/GridRowWith10Columns';
import GridRowWith10ColumnsSkeleton from '../Grid/GridRowWith10ColumnsSkeleton';
import {
  getPriceDrops,
  useGetPriceDrops,
} from '../../api/homepage/homepagePriceDrops';
import { useEffect, useState } from 'react';
// import { useGetGender } from '@/hooks/useGetGender';

const PriceDrops: React.FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getPriceDrops();
      setData(response);
    };
    fetchData();
  }, []);
  // const { selectedGender } = useGetGender();
  if (data[0] === undefined) {
    return <GridRowWith10ColumnsSkeleton heading="Price Drops" />;
  }

  return (
    <GridRowWith10Columns
      heading="Price Drops"
      data={data}
      more="View All"
      href={`/sale?gender=men`}
    />
  );
};

export default PriceDrops;
