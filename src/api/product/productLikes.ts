import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;

interface ProductLikesPayload {
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

const getProductLikes = async ({
  id,
  token,
  limit,
}: ProductLikesPayload): Promise<ProductLike[]> => {
  const response = await axios({
    method: 'GET',
    url: `${baseURL}users/${id}/like`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(limit && { limit }),
    },
  });

  return response.data.data.data;
};

const useGetProductLikes = ({
  id,
  token,
  limit,
}: ProductLikesPayload): UseQueryResult<ProductLike[]> => {
  return useQuery({
    queryKey: ['liked', id, token, limit],
    queryFn: () => getProductLikes({ id, token, limit }),
    enabled: !!id && !!token,
  });
};

export { useGetProductLikes };
