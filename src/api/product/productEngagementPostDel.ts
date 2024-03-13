// @ts-nocheck
import axios from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import queryClient from '@/state/queryClient';

const baseURL =
  process.env.NEXT_PUBLIC_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_SERVER
    : process.env.NEXT_PUBLIC_SERVER;
interface User {
  id: string;
  firstName: string;
  surname: string;
}
interface UserData {
  token?: string;
  data?: {
    user: User;
  };
}

interface EngagementMutationVariables {
  userData: UserData;
  engagement_id: string;
  endpoint: string;
  payload?: any;
}

const addEngagement = async ({
  userData,
  engagement_id,
  endpoint,
  payload,
}: EngagementMutationVariables): Promise<any> => {
  const response = await axios({
    method: 'POST',
    url: `${baseURL}products/${engagement_id}/${endpoint}`,
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
    },
    data: payload,
  });

  return response.data.data;
};

const deleteEngagement = async ({
  userData,
  engagement_id,
  endpoint,
  payload,
}: EngagementMutationVariables): Promise<any> => {
  const response = await axios({
    method: 'DELETE',
    url: `${baseURL}${endpoint}/${engagement_id}`,
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
    },
    data: payload,
  });

  return response.data.data;
};

const useAddEngagement = (): UseMutationResult<
  any,
  unknown,
  EngagementMutationVariables,
  unknown
> => {
  return useMutation({
    mutationFn: ({ userData, engagement_id, endpoint, payload }) =>
      addEngagement({ userData, engagement_id, endpoint, payload }),
    onSuccess: (endpoint) => {
      queryClient.invalidateQueries({ queryKey: endpoint });
    },
  });
};

const useDeleteEngagement = (): UseMutationResult<
  any,
  unknown,
  EngagementMutationVariables,
  unknown
> => {
  return useMutation({
    mutationFn: ({ userData, engagement_id, endpoint, payload }) =>
      deleteEngagement({ userData, engagement_id, endpoint, payload }),
    onSuccess: (endpoint) => {
      queryClient.invalidateQueries({ queryKey: endpoint });
    },
  });
};

export { useAddEngagement, useDeleteEngagement };
