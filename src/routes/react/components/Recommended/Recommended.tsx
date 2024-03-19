/** @jsxImportSource react */
import { dehydrate, QueryClient } from '@tanstack/react-query';
import GridRowWith10ColumnsSkeleton from '../Grid/GridRowWith10ColumnsSkeleton';
import {
  getRecommended,
  useGetRecommended,
} from '../../api/homepage/homepageRecommended';
import GridRowWith10Columns from '../../components/Grid/GridRowWith10Columns';
import { useEffect, useState } from 'react';
import { qwikify$ } from '@builder.io/qwik-react';

const Recommended = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRecommended();
      setData(response);
    };
    fetchData();
  }, []);

  if (data[0] === undefined) {
    return <GridRowWith10ColumnsSkeleton heading="For you" />;
  }

  return <GridRowWith10Columns heading="For You" data={data} />;
};

export const QRecommended = qwikify$(Recommended, { eagerness: 'visible' });
