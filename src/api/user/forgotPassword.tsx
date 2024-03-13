import axios, { AxiosResponse } from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

const baseURL = process.env.NEXT_PUBLIC_ENV === "development" 
    ? process.env.NEXT_PUBLIC_DEV_SERVER 
    : process.env.NEXT_PUBLIC_SERVER;

const postResetPassword = async (email: string): Promise<AxiosResponse> => {
    const response = await axios({
        method: "POST",
        url: `${baseURL}users/forgotPassword`,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: JSON.stringify({ email })
    });
    return response;
};

const useForgotPassword = (): UseMutationResult<AxiosResponse, unknown, string, unknown> => {
    return useMutation({
        mutationFn: postResetPassword,
        // DEV NOTE: Populate onSuccess callback if there are any existing queries need invalidation OR something else you'd like to do once the mutation is successful
        onSuccess: () => {}
    });
};

export { postResetPassword, useForgotPassword };
