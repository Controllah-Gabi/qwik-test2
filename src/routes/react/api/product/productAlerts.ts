import axios from 'axios';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

const baseURL = import.meta.env.PUBLIC_API_URL;

interface ProductAlertsPayload {
  id: string;
  token?: string;
  limit?: number;
}

interface Alert {
  // Define the properties of an alert here
  size: string[];
  product: any;
  user: string;
}

const getProductAlerts = async (
  payload: ProductAlertsPayload,
): Promise<Alert[]> => {
  const { id, token, limit } = payload;

  const response = await axios({
    method: 'GET',
    url: `${baseURL}users/${id}/alerts`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...(limit && { limit }),
    },
  });
  return response.data.data.data;
};

const useGetProductAlerts = (
  payload: ProductAlertsPayload,
): UseQueryResult<Alert[], unknown> => {
  const { id, token, limit } = payload;

  return useQuery({
    queryKey: ['alerts', id, token, limit],
    queryFn: () => getProductAlerts(payload),
    enabled: !!id && !!token,
  });
};

export { useGetProductAlerts, getProductAlerts };
