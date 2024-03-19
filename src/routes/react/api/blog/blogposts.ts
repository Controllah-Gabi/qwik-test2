import axios from 'axios';

const baseURL = import.meta.env.PUBLIC_API_URL;

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

// const useGetBlogPosts = (
//   payload: BlogPostPayload,
// ): UseInfiniteQueryResult<BlogPost[]> => {
//   return useInfiniteQuery(
//     ['blogpost', payload],
//     ({ pageParam = 1 }) => getBlogPosts({ ...payload, page: pageParam }),
//     // @ts-ignore
//     {
//       getNextPageParam: (lastPage: any, pages: any) => {
//         if (lastPage.length < 10) return undefined;
//         return pages.length + 1;
//       },
//     },
//   );
// };

// const useGetBlogPostById = (id: string): UseQueryResult<BlogPost> => {
//   return useQuery({
//     queryKey: ['blogpost', id],
//     queryFn: () => getBlogPostById(id),
//     enabled: !!id,
//   });
// };

// const useGetBlogPostsHomePage = (): UseQueryResult<BlogPost[]> => {
//   return useQuery({
//     queryKey: ['blogpost?limit=10'],
//     queryFn: getBlogPostsHomePage,
//   });
// };

export {
  getBlogPosts,
  getBlogPostById,
  // useGetBlogPosts,
  // useGetBlogPostById,
  // useGetBlogPostsHomePage,
  getBlogPostsHomePage,
};
