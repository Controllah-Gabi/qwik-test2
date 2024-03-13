import axios from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;

interface SearchResult {
  // Define properties of your search result here
  _id: string;
  productName: string;
  sale: boolean;
  coloursShown: string;
  cheapestPrice: number;
  beforePrice: number;
  inStock: boolean;
  coverImage: string;
  comingSoon: boolean;
  comingSoonDate: string;
  comingSoonTime: string;
}

interface SearchBarMutationVariables {
  query: string;
}

const getSearchBar = async (query: string): Promise<SearchResult[]> => {
  let genderState;
  if (window) {
    genderState = JSON.parse(localStorage.getItem('selectedGender'));
  }
  const response = await axios({
    method: 'GET',
    url:
      genderState === 'women'
        ? `${baseURL}products/search-bar?gender=women`
        : `${baseURL}products/search-bar?gender=men`,
    params: {
      q: encodeURIComponent(query),
    },
  });

  return response.data.data.data;
};

const useGetSearchBar = (): UseMutationResult<
  SearchResult[],
  unknown,
  SearchBarMutationVariables
> => {
  return useMutation({
    mutationFn: ({ query }) => getSearchBar(query),
  });
};

export { useGetSearchBar };
