import axios from 'axios';
import {
  useQuery,
  useInfiniteQuery,
  UseQueryResult,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

export type Product = {
  productName: string;
  productHeader: string;
  cheapestPrice: number;
  galleryImages: string[];
  saved: any[];
  alerts: any[];
  likes: any[];
  dislikes: any[];
  _id: string;
  type: string;
  comingSoon: boolean;
  comingSoonDate: string;
  comingSoonTime: string;
  sale: boolean;
  retailers: any[];
  sizesAvailable: any[];
  coloursShown: string;
  comingSoonRetailers: any[];
  homepageVisible: boolean;
  homepageRow: string;
  homepageColumn: number;
  styleCode: string;
  coverImage: string;
  id: string;
  inStock: boolean;
  beforePrice: number | null;
  afterPrice: number | null;
  brand?: string;
  gender?: string;
  description?: string;
};

interface ProductsSearchPayload {
  slug: string;
  page?: number;
  gender?: string | string[];
  brand?: string | string[];
  sizesAvailable?: string | string[];
  sale?: string | string[];
  sort?: string | string[];
  q?: string | string[];
  limit?: number;
}

const getProductsSearch = async (
  payload: ProductsSearchPayload,
): Promise<Product[]> => {
  let {
    slug,
    page = 1,
    gender,
    brand,
    sizesAvailable,
    sale,
    sort = '-popularity',
    q,
    limit,
  } = payload;

  const params = {
    page,
    ...(gender && { gender }),
    ...(sort && { sort }),
    ...(brand && { brand }),
    ...(sizesAvailable && { sizesAvailable }),
    ...(sale && { sale }),
    ...(q && { q }),
    ...(limit && { limit }),
  };

  const response = await axios({
    method: 'GET',
    url: `${baseURL}products/${slug}`,
    params,
  });

  return response.data.data.data;
};

const getProductById = async (id: string): Promise<Product> => {
  const response = await axios({
    method: 'GET',
    url: `${baseURL}products/${id}`,
  });
  return response.data.data.data;
};

const useGetProductsSearch = (
  payload: ProductsSearchPayload,
): UseInfiniteQueryResult<Product[]> => {
  const { slug, gender, brand, sizesAvailable, sort, q, sale, limit } = payload;

  return useInfiniteQuery(
    ['products', slug, gender, brand, sizesAvailable, sort, q, sale, limit],
    ({ pageParam = 1 }) => getProductsSearch({ ...payload, page: pageParam }),
    // @ts-ignore
    {
      enabled: !!slug, // Only fetch data if slug exists
      getNextPageParam: (lastPage: [], allPages: []) => {
        if (lastPage.length > 0) {
          return allPages.length + 1;
        }
        return undefined;
      },
    },
  );
};

const useGetProductById = (id: string): UseQueryResult<Product> => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export {
  getProductsSearch,
  getProductById,
  useGetProductsSearch,
  useGetProductById,
};
