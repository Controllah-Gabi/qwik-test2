import axios from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { hashPassword } from '../../../../utils/hash';

const baseURL = import.meta.env.PUBLIC_API_URL;

interface User {
  token: string;
  data: any; // Replace 'any' with actual user data type
}

interface SignupPayload {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
  passwordConfirm: string;
}

interface UpdateUserValues {
  shoeSize?: string;
  clothingSize?: string;
  productRestocks?: {
    email: boolean;
    sms: boolean;
  };
  productSales?: {
    email: boolean;
    sms: boolean;
  };
  newProducts?: {
    email: boolean;
    sms: boolean;
  };
  eventNotifications?: {
    email: boolean;
    sms: boolean;
  };
  allowMarketingNotifications?: {
    email: boolean;
    sms: boolean;
  };
}

interface UpdatePasswordValues {
  password: string;
  passwordConfirm: string;
  passwordCurrent: string;
}

interface ResetPasswordPayload {
  password: string;
  passwordConfirm: string;
  token: string;
}

const signup = async (payload: SignupPayload): Promise<any> => {
  const hashedPayload = {
    ...payload,
    password: hashPassword(payload.password),
    passwordConfirm: hashPassword(payload.passwordConfirm),
  };
  const response = await axios.post(`${baseURL}users/signup`, hashedPayload, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return response.data;
};

const updateUser = async (
  userData: User,
  values: UpdateUserValues,
): Promise<any> => {
  const response = await axios.patch(`${baseURL}users/updateMe`, values, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
      withCredentials: true,
    },
  });
  return response.data.data;
};

const getMe = async (userData: User): Promise<any> => {
  const response = await axios.get(`${baseURL}users/me`, {
    headers: {
      Authorization: `Bearer ${userData.token}`,
      'Content-Type': 'application/json',
      withCredentials: true,
    },
  });
  return response.data.data;
};

const updatePassword = async (
  userData: User,
  values: UpdatePasswordValues,
): Promise<any> => {
  const hashedValues = {
    ...values,
    password: hashPassword(values.password),
    passwordConfirm: hashPassword(values.passwordConfirm),
    passwordCurrent: hashPassword(values.passwordCurrent),
  };

  const response = await axios.patch(
    `${baseURL}users/updateMyPassword`,
    hashedValues,
    {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'application/json',
        withCredentials: true,
      },
    },
  );
  return response.data.data;
};

const resetPassword = async (
  password: string,
  passwordConfirm: string,
  token: string,
): Promise<any> => {
  const hashedPassword = hashPassword(password);
  const hashedPasswordConfirm = hashPassword(passwordConfirm);
  const response = await axios.patch(
    `${baseURL}users/resetPassword/${token}`,
    {
      password: hashedPassword,
      passwordConfirm: hashedPasswordConfirm,
    },
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data.data;
};

const useSignup = (): UseMutationResult<
  any,
  unknown,
  SignupPayload,
  unknown
> => {
  return useMutation({
    mutationFn: (payload) => signup(payload),
    onSuccess: () => {},
  });
};

const useUpdateUser = (): UseMutationResult<
  any,
  unknown,
  { userData: User; values: UpdateUserValues },
  unknown
> => {
  return useMutation({
    mutationFn: ({ userData, values }) => updateUser(userData, values),
    onSuccess: () => {},
  });
};

const useUpdatePassword = (): UseMutationResult<
  any,
  unknown,
  { user: User; values: UpdatePasswordValues },
  unknown
> => {
  return useMutation({
    mutationFn: ({ user, values }) => updatePassword(user, values),
    onSuccess: () => {},
  });
};

const useGetMeData = (): UseMutationResult<any, unknown, User, unknown> => {
  return useMutation({
    mutationFn: (userData) => getMe(userData),
    onSuccess: () => {},
  });
};

const useResetPassword = (): UseMutationResult<
  any,
  unknown,
  ResetPasswordPayload,
  unknown
> => {
  return useMutation({
    mutationFn: ({ password, passwordConfirm, token }) =>
      resetPassword(password, passwordConfirm, token),
    onSuccess: () => {},
  });
};

export {
  useSignup,
  useUpdateUser,
  useUpdatePassword,
  useResetPassword,
  useGetMeData,
};
