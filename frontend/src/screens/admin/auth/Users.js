import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { confirmAlert } from 'react-confirm-alert'
import { useForm } from 'react-hook-form'
import useUsersHook from '../../../api/users'
import {
  Spinner,
  ViewUsers,
  Pagination,
  FormUsers,
  Message,
  Confirm,
} from '../../../components'

const Users = () => {
  const [page, setPage] = useState(1)
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')

  const { getUsers, postUser, updateUser, deleteUser } = useUsersHook({
    page,
    q,
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirmed: true,
      blocked: false,
    },
  })

  const { data, isLoading, isError, error, refetch } = getUsers

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateUser

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteUser

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postUser

  const formCleanHandler = () => {
    setEdit(false)
    reset()
  }

  useEffect(() => {
    if (isSuccessPost || isSuccessUpdate) formCleanHandler()
  }, [isSuccessPost, isSuccessUpdate])

  useEffect(() => {
    refetch()
  }, [page])

  useEffect(() => {
    if (!q) refetch()
  }, [q])

  const searchHandler = (e) => {
    e.preventDefault()
    refetch()
    setPage(1)
  }

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)))
  }

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          department: data.department,
          designation: data.designation,
          name: data.name,
          address1: data.address1,
          address2: data.address2,
          address3: data.address3,
          city: data.city,
          pincode: data.pincode,
          state: data.state,
          mobile: data.mobile,
          pan: data.pan,
          pf: data.pf,
          esi: data.esi,
          dob: data.dob,
          salaryscheduletype: data.salaryscheduletype, 
          email: data.email,
          confirmed: data.confirmed,
          blocked: data.blocked,
          password: data.password,
        })
      : mutateAsyncPost(data)
  }

  const editHandler = (user) => {
    setId(user._id)
    setEdit(true)
    setValue('department', user.department)
    setValue('designation', user.designation)
    setValue('name', user.name)
    setValue('address1', user.address1)
    setValue('address2', user.address2)
    setValue('address3', user.address3)
    setValue('city', user.city)
    setValue('pincode', user.pincode)
    setValue('state', user.state)
    setValue('mobile', user.mobile)
    setValue('pan', user.pan)
    setValue('pf', user.pf)
    setValue('esi', user.esi)
    setValue('dob', user.dob)
    setValue('salaryscheduletype', user.salaryscheduletype)
    setValue('email', user.email)
    setValue('confirmed', user.confirmed)
    setValue('blocked', user.blocked)
  }

  return (
    <>
      <Helmet>
        <title>Users</title>
        <meta property='og:title' content='Users' key='title' />
      </Helmet>
      {isSuccessDelete && (
        <Message variant='success'>User has been deleted successfully.</Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant='success'>User has been updated successfully.</Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant='success'>User has been Created successfully.</Message>
      )}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <FormUsers
        edit={edit}
        formCleanHandler={formCleanHandler}
        isLoading={isLoading}
        isError={isError}
        errors={errors}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingPost={isLoadingPost}
        register={register}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        watch={watch}
        error={error}
      />

      <div className='ms-auto text-end'>
        <Pagination data={data} setPage={setPage} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ViewUsers
          data={data}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          isLoadingDelete={isLoadingDelete}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
        />
      )}
    </>
  )
}

export default Users
