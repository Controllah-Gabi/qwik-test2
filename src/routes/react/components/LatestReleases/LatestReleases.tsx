/** @jsxImportSource react */

import GridRowWith10Columns from '../Grid/GridRowWith10Columns';
import GridRowWith10ColumnsSkeleton from '../Grid/GridRowWith10ColumnsSkeleton';
import { getLatestReleases } from '../../api/homepage/homepageLatestReleases';

import { FC, useEffect, useState } from 'react';

const LatestReleases: FC = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLatestReleases();
      setData(response);
    };
    fetchData();
  }, []);

  if (data === undefined) {
    return <GridRowWith10ColumnsSkeleton heading="Latest Releases" />;
  }

  return (
    <GridRowWith10Columns
      heading="Latest Releases"
      data={data}
      more="View All"
      href={`/latest?gender=men&sort=-dateAdded`}
    />
  );
};

export default LatestReleases;
