import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import queryClient from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

interface User {
  id: string;
  firstName: string;
  surname: string;
}

interface UserData {
  data?: {
    user: User;
  };
  token?: string;
}

interface AddProductCommentMutationVariables {
  userData: UserData;
  product_id: string;
  commentText: string;
}

interface UpdateProductCommentMutationVariables {
  userData: UserData;
  comment_id: string;
  commentText: string;
}

interface DeleteProductCommentOrReplyMutationVariables {
  userData: UserData;
  id: string; // Either comment_id or reply_id
  endpoint: 'comments' | 'reply';
}

interface AddCommentReplyMutationVariables {
  userData: UserData;
  product_id: string;
  comment_id: string;
  reply: string;
}

interface UpdateProductReplyMutationVariables {
  userData: UserData;
  reply_id: string;
  reply: string;
}

interface PostProductLikeOrDislikeMutationVariables {
  userData: UserData;
  endpoint: 'islike-comment' | 'like-comment';
  payload: unknown;
}

const addProductComment = async ({
  userData,
  product_id,
  commentText,
}: AddProductCommentMutationVariables) => {
  const response = await axios({
    method: 'POST',
    url: `${baseURL}products/${product_id}/comments`,
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ commentText }),
  });

  return response.data.data;
};

const updateProductComment = async ({
  userData,
  comment_id,
  commentText,
}: UpdateProductCommentMutationVariables) => {
  const response = await axios({
    method: 'PATCH',
    url: `${baseURL}comments/${comment_id}`,
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ commentText }),
  });

  return response.data.data;
};

// DEV NOTE: The *id* is either *comment_id* or *reply_id*
const deleteProductCommentOrReply = async ({
  userData,
  id,
  endpoint,
}: DeleteProductCommentOrReplyMutationVariables) => {
  const response = await axios({
    method: 'DELETE',
    url: `${baseURL}${endpoint}/${id}`,
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
};

const addCommentReply = async ({
  userData,
  product_id,
  comment_id,
  reply,
}: AddCommentReplyMutationVariables) => {
  const response = await axios({
    method: 'POST',
    url: `${baseURL}products/${product_id}/comments/${comment_id}/reply`,
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ reply }),
  });

  return response.data.data;
};

const getCommentReplies = async (comment_id: string) => {
  const response = await axios({
    method: 'GET',
    url: `${baseURL}comments/${comment_id}/reply`,
  });

  return response.data.data.data;
};

const updateCommentReply = async ({
  userData,
  reply_id,
  reply,
}: UpdateProductReplyMutationVariables) => {
  const response = await axios({
    method: 'PATCH',
    url: `${baseURL}reply/${reply_id}`,
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({ reply }),
  });

  return response.data.data;
};

const getProductComments = async (product_id: string) => {
  const response = await axios({
    method: 'GET',
    url: `${baseURL}products/${product_id}/comments`,
  });
  return response.data.data.data;
};

const postProductLikeOrDislike = async ({
  userData,
  endpoint,
  payload,
}: PostProductLikeOrDislikeMutationVariables) => {
  const response = await axios({
    method: 'POST',
    url: `${baseURL}${endpoint}`,
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
    },
    data: payload,
  });
  return response.data.data;
};

const useAddProductComment = () => {
  return useMutation({
    mutationFn: ({
      userData,
      product_id,
      commentText,
    }: AddProductCommentMutationVariables) =>
      addProductComment({ userData, product_id, commentText }),
    onSuccess: (endpoint) => {
      //@ts-ignore
      queryClient.invalidateQueries({ queryKey: 'product_comments' });
    },
  });
};

const useUpdateProductComment = () => {
  return useMutation({
    mutationFn: ({
      userData,
      comment_id,
      commentText,
    }: UpdateProductCommentMutationVariables) =>
      updateProductComment({ userData, comment_id, commentText }),
    onSuccess: (endpoint) => {
      //@ts-ignore
      queryClient.invalidateQueries({ queryKey: 'product_comments' });
    },
  });
};

const useDeleteProductCommentOrReply = () => {
  return useMutation({
    mutationFn: ({
      userData,
      id,
      endpoint,
    }: DeleteProductCommentOrReplyMutationVariables) =>
      deleteProductCommentOrReply({ userData, id, endpoint }),
    onSuccess: (userData, endpoint) => {
      //@ts-ignore
      queryClient.invalidateQueries({ queryKey: 'product_comments' });
    },
  });
};

const useAddCommentReply = () => {
  return useMutation({
    mutationFn: ({
      userData,
      product_id,
      comment_id,
      reply,
    }: AddCommentReplyMutationVariables) =>
      addCommentReply({ userData, product_id, comment_id, reply }),
    onSuccess: (endpoint) => {
      //@ts-ignore
      queryClient.invalidateQueries({ queryKey: 'product_comments_replies' });
    },
  });
};

const useGetCommentReplies = (comment_id: string) => {
  return useQuery({
    queryKey: ['product_comments_replies', comment_id],
    queryFn: () => getCommentReplies(comment_id),
  });
};

const useUpdateProductReply = () => {
  return useMutation({
    mutationFn: ({
      userData,
      reply_id,
      reply,
    }: UpdateProductReplyMutationVariables) =>
      updateCommentReply({ userData, reply_id, reply }),
    onSuccess: (endpoint) => {
      //@ts-ignore
      queryClient.invalidateQueries({ queryKey: 'product_comments_replies' });
    },
  });
};

const useGetProductComments = (product_id: string) => {
  return useQuery({
    queryKey: ['product_comments', product_id],
    queryFn: () => getProductComments(product_id),
  });
};

const usePostProductLikeOrDislike = () => {
  return useMutation({
    mutationFn: ({
      userData,
      endpoint,
      payload,
    }: PostProductLikeOrDislikeMutationVariables) =>
      postProductLikeOrDislike({ userData, endpoint, payload }),
    onSuccess: (userData, endpoint, payload) => {
      // @ts-ignore
      queryClient.invalidateQueries({
        //@ts-ignore
        queryKey: `${queryKeyKey[endpoint.endpoint]}`,
      });
    },
  });
};

const queryKeyKey = {
  'dislike-comment': 'product_comments',
  'like-comment': 'product_comments',
  'like-reply': 'product_comments_replies',
  'dislike-reply': 'product_comments_replies',
  reply: 'product_comments_replies',
};

export {
  useAddProductComment,
  useUpdateProductComment,
  useDeleteProductCommentOrReply,
  useAddCommentReply,
  useGetCommentReplies,
  useUpdateProductReply,
  useGetProductComments,
  usePostProductLikeOrDislike,
};
