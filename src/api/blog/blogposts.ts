import axios from 'axios';
import {
  useInfiniteQuery,
  useQuery,
  UseQueryResult,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;

type PageContent = {
  content: string;
  type: string;
  placementIndex: number;
};

type RetailerCardContent = {
  retailer: string;
  productId: string;
  type: string;
  placementIndex: number;
};

export type BlogPost = {
  _id: string;
  title: string;
  headings: string[];
  author: string;
  authorPhoto: string;
  authorTitle: string;
  dateAdded: string;
  textBlocks: PageContent[];
  images: PageContent[];
  links: PageContent[];
  subheadings: PageContent[];
  retailerCards: RetailerCardContent[];
};

interface BlogPostPayload {
  limit?: number;
  page?: number;
}

const getBlogPosts = async (
  payload: BlogPostPayload = {},
): Promise<BlogPost[]> => {
  const { limit = 10 } = payload;
  const params = {
    limit,
  };
  const response = await axios.get<{ data: { data: BlogPost[] } }>(
    `${baseURL}blogposts?sort=-dateAdded`,
    {
      params,
    },
  );
  return response.data.data.data;
};

const getBlogPostsHomePage = async (): Promise<BlogPost[]> => {
  let genderState;
  if (window) {
    genderState = JSON.parse(localStorage.getItem('selectedGender'));
  }

  const response = await axios.get<{ data: { data: BlogPost[] } }>(
    genderState === 'women'
      ? `${baseURL}blogposts/homepage?gender=women`
      : `${baseURL}blogposts/homepage?gender=men`,
  );
  return response.data.data.data;
};

const getBlogPostById = async (id: string): Promise<BlogPost> => {
  const response = await axios.get<{ data: { data: BlogPost } }>(
    `${baseURL}blogposts/${id}`,
  );
  return response.data.data.data;
};

const useGetBlogPosts = (
  payload: BlogPostPayload,
): UseInfiniteQueryResult<BlogPost[]> => {
  return useInfiniteQuery(
    ['blogpost', payload],
    ({ pageParam = 1 }) => getBlogPosts({ ...payload, page: pageParam }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 10) return undefined;
        return pages.length + 1;
      },
    },
  );
};

const useGetBlogPostById = (id: string): UseQueryResult<BlogPost> => {
  return useQuery({
    queryKey: ['blogpost', id],
    queryFn: () => getBlogPostById(id),
    enabled: !!id,
  });
};

const useGetBlogPostsHomePage = (): UseQueryResult<BlogPost[]> => {
  return useQuery({
    queryKey: ['blogpost?limit=10'],
    queryFn: getBlogPostsHomePage,
  });
};

export {
  getBlogPosts,
  getBlogPostById,
  useGetBlogPosts,
  useGetBlogPostById,
  useGetBlogPostsHomePage,
  getBlogPostsHomePage,
};
