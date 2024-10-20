import dynamicAPI from './dynamicAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const url = '/api/auth/hsns'

const queryKey = 'hsns'

export default function useHSNsHook(props) {
  const { page = 1, id, q = '', limit = 25 } = props
  const queryClient = useQueryClient()

  const getHSNs = useQuery(
    queryKey,
    async () =>
      await dynamicAPI('get', `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  )

  const getHSNById = useQuery(
    queryKey,
    async (id) => await dynamicAPI('get', `${url}/${id}`, {}),
    { retry: 0, enabled: !!id }
  )

  const updateHSN = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const deleteHSN = useMutation(
    async (id) => await dynamicAPI('delete', `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const postHSN = useMutation(
    async (obj) => await dynamicAPI('post', url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  return {
    getHSNs,
    updateHSN,
    deleteHSN,
    postHSN,
    getHSNById,
  }
}
