import axios from 'axios';
import {
  useInfiniteQuery,
  useQuery,
  UseQueryResult,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

export type Outfit = {
  _id: string;
  outfitColours: string;
  sale: boolean;
  outfitName: string;
  cheapestPrice: number;
  beforePrice?: number;
  inStock: boolean;
  mainImage: string;
  products: any[];
};

interface OutfitsPayload {
  brand?: string;
  gender?: string;
  type?: string;
  category?: string;
  limit?: number;
  page?: number;
}

const getOutfits = async (payload: OutfitsPayload = {}): Promise<Outfit[]> => {
  const {
    brand = null,
    gender = null,
    type = null,
    category = null,
    page = 1,
    limit = 10,
  } = payload;
  const params = {
    page,
    ...(brand && { brand }),
    ...(gender && { gender }),
    ...(type && { type }),
    ...(category && { category }),
    limit,
  };
  const response = await axios.get<{ data: { data: Outfit[] } }>(
    `${baseURL}outfits`,
    {
      params,
    },
  );
  return response.data.data.data;
};

const getOutfitsHomePage = async (): Promise<Outfit[]> => {
  let genderState;
  // if (window) {
  //   genderState = JSON.parse(localStorage.getItem('selectedGender'));
  // }

  const response = await axios.get<{ data: { data: Outfit[] } }>(
    genderState === 'women'
      ? `${baseURL}outfits/homepage?gender=women`
      : `${baseURL}outfits/homepage?gender=men`,
  );
  return response.data.data.data;
};

const getOutfitById = async (id: string): Promise<Outfit> => {
  const response = await axios.get<{ data: { data: Outfit } }>(
    `${baseURL}outfits/${id}`,
  );
  return response.data.data.data;
};

const useGetOutfits = (
  payload: OutfitsPayload,
): UseInfiniteQueryResult<Outfit[]> => {
  return useInfiniteQuery(
    ['outfits', payload],
    ({ pageParam = 1 }) => getOutfits({ ...payload, page: pageParam }),
    //@ts-ignore
    {
      getNextPageParam: (lastPage: any, pages: any) => {
        if (lastPage.length < 10) return undefined;
        return pages.length + 1;
      },
    },
  );
};

const useGetOutfitById = (id: string): UseQueryResult<Outfit> => {
  return useQuery({
    queryKey: ['outfits', id],
    queryFn: () => getOutfitById(id),
    enabled: !!id,
  });
};

const useGetOutfitsHomePage = (): UseQueryResult<Outfit[]> => {
  return useQuery({
    queryKey: ['outfits?limit=10'],
    queryFn: getOutfitsHomePage,
  });
};

export {
  getOutfits,
  getOutfitById,
  useGetOutfits,
  useGetOutfitById,
  useGetOutfitsHomePage,
  getOutfitsHomePage,
};
