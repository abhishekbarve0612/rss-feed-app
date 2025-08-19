import {
  useQuery as useTanStackQuery,
  useMutation as useTanStackMutation,
  useQueryClient,
} from '@tanstack/react-query'

export const useGet = <T>(endpoint: string, params?: Record<string, string>, baseUrl = '') => {
  const url = new URL(endpoint, baseUrl || window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value))
    })
  }

  return useTanStackQuery({
    queryKey: [endpoint, params],
    queryFn: () => fetch(url.toString()).then((res) => res.json() as T),
    staleTime: 5 * 60 * 1000,
  })
}

export const usePost = <T>(endpoint: string, baseUrl = '') => {
  const queryClient = useQueryClient()

  return useTanStackMutation({
    mutationFn: (payload?: Record<string, string>) =>
      fetch(`${baseUrl || window.location.origin}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload ? JSON.stringify(payload) : undefined,
      }).then((res) => res.json() as T),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] })
    },
  })
}

export const usePatch = <T>(endpoint: string, baseUrl = '') => {
  const queryClient = useQueryClient()

  return useTanStackMutation({
    mutationFn: (payload?: Record<string, string>) =>
      fetch(`${baseUrl || window.location.origin}${endpoint}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: payload ? JSON.stringify(payload) : undefined,
      }).then((res) => res.json() as T),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] })
    },
  })
}
