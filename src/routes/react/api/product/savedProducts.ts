import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

interface Product {
  // Define the properties of a Product here
  user: string;
  product: any;
}

interface SavedProductsPayload {
  id: string;
  token: string;
  limit?: number;
}

const getSavedProducts = async (
  payload: SavedProductsPayload,
): Promise<Product[]> => {
  const { id, token, limit } = payload;

  const response = await axios({
    method: 'GET',
    url: `${baseURL}users/${id}/saved`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(limit && { limit }),
    },
  });

  return response.data.data.data;
};

const useGetSavedProducts = (
  payload: SavedProductsPayload,
): UseQueryResult<Product[]> => {
  const { id, token, limit } = payload;

  return useQuery({
    queryKey: ['saved', id, token, limit],
    queryFn: () => getSavedProducts(payload),
    enabled: !!id && !!token,
  });
};

export { useGetSavedProducts, getSavedProducts };
