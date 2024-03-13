import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;

interface Product {
  _id: string;
  // Define the properties of a Product here
}

interface RelatedProductsPayload {
  limit?: number;
  q: string;
}

const getRelatedProducts = async (
  payload: RelatedProductsPayload,
): Promise<Product[]> => {
  const { limit = 11, q } = payload;

  const params = {
    limit,
    q,
  };
  let genderState;
  if (window) {
    genderState = JSON.parse(localStorage.getItem('selectedGender'));
  }
  const response = await axios({
    method: 'GET',
    url:
      genderState === 'women'
        ? `${baseURL}products/searched?gender=women`
        : `${baseURL}products/searched?gender=men`,
    params,
  });

  return response.data.data.data;
};

const useGetRelatedProducts = (
  payload: RelatedProductsPayload,
): UseQueryResult<Product[]> => {
  const { limit, q } = payload;

  return useQuery({
    queryKey: ['related_products', limit, q],
    queryFn: () => getRelatedProducts(payload),
    enabled: !!q,
  });
};

export { getRelatedProducts, useGetRelatedProducts };
