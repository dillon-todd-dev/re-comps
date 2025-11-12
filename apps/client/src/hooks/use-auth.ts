import { getCurrentUser } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function useAuth() {
  const { data } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: getCurrentUser,
  });
  return { user: data };
}
