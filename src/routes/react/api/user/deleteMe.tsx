import axios from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

interface UserData {
  token: string;
}

const deleteUser = async (userData: UserData): Promise<any> => {
  const response = await axios.delete(`${baseURL}users/deleteMe`, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
      withCredentials: true,
    },
  });

  return response.data.data;
};

const useDeleteUser = (): UseMutationResult<
  any,
  unknown,
  UserData,
  unknown
> => {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {},
  });
};

export { useDeleteUser };
