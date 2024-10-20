import dynamicAPI from './dynamicAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const url = '/api/auth/units'

const queryKey = 'units'

export default function useUnitHook(props) {
  const { page = 1, id, q = '', limit = 25 } = props
  const queryClient = useQueryClient()

  const getUnits = useQuery(
    queryKey,
    async () =>
      await dynamicAPI('get', `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  )

  const getUnitById = useQuery(
    queryKey,
    async (id) => await dynamicAPI('get', `${url}/${id}`, {}),
    { retry: 0, enabled: !!id }
  )

  const updateUnit = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const deleteUnit = useMutation(
    async (id) => await dynamicAPI('delete', `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const postUnit = useMutation(
    async (obj) => await dynamicAPI('post', url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  return {
    getUnits,
    updateUnit,
    deleteUnit,
    postUnit,
    getUnitById,
  }
}
