import dynamicAPI from './dynamicAPI'
import { useQuery, useMutation, useQueryClient } from 'react-query'

const url = '/api/auth/unit-conversions'

const queryKey = 'unitConversions'

export default function useUnitConversionHook(props) {
  const { page = 1, id, q = '', limit = 25 } = props
  const queryClient = useQueryClient()

  const getUnitConversions = useQuery(
    queryKey,
    async () =>
      await dynamicAPI('get', `${url}?page=${page}&q=${q}&limit=${limit}`, {}),
    { retry: 0 }
  )

  const getUnitConversionById = useQuery(
    queryKey,
    async (id) => await dynamicAPI('get', `${url}/${id}`, {}),
    { retry: 0, enabled: !!id }
  )

  const updateUnitConversion = useMutation(
    async (obj) => await dynamicAPI('put', `${url}/${obj._id}`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const deleteUnitConversion = useMutation(
    async (id) => await dynamicAPI('delete', `${url}/${id}`, {}),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  const postUnitConversion = useMutation(
    async (obj) => await dynamicAPI('post', url, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries([queryKey]),
    }
  )

  return {
    getUnitConversions,
    updateUnitConversion,
    deleteUnitConversion,
    postUnitConversion,
    getUnitConversionById,
  }
}
