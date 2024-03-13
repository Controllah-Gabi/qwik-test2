import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;

interface ProductDislikesPayload {
  id: string;
  token: string;
  limit?: number;
}

interface ProductLike {
  // Define the properties of a ProductLike here
  user?: string;
  product: any;
  _id?: string;
}

const getProductDislikes = async ({
  id,
  token,
  limit,
}: ProductDislikesPayload): Promise<ProductLike[]> => {
  const response = await axios({
    method: 'GET',
    url: `${baseURL}users/${id}/dislike`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(limit && { limit }),
    },
  });

  return response.data.data.data;
};

const useGetProductDislikes = ({
  id,
  token,
  limit,
}: ProductDislikesPayload): UseQueryResult<ProductLike[]> => {
  return useQuery({
    queryKey: ['disliked', id, token, limit],
    queryFn: () => getProductDislikes({ id, token, limit }),
    enabled: !!id && !!token,
  });
};

export { useGetProductDislikes };
