import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FormContainer, Message } from '../../components'
import { useForm } from 'react-hook-form'
import useAuthHook from '../../api/auth'
import useUserRolesHook from '../../api/userRoles'
import { inputEmail, inputPassword } from '../../utils/dynamicForm'
import useAuth from '../../hooks/useAuth'
import { Helmet } from 'react-helmet'

const Login = () => {
  let [searchParams] = useSearchParams()
  const pathName = searchParams.get('next') || '/'
  const navigate = useNavigate()

  const { auth } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { setAuth } = useAuth()

  const { postLogin } = useAuthHook()
  const { postUserRoleById } = useUserRolesHook({
    page: 1,
    q: '',
    limit: 10000000,
  })

  const { isLoading, isError, error, mutateAsync, isSuccess, data } = postLogin
  const {
    mutateAsync: userRoleMutateAsync,
    data: userRole,
    error: errorUserRole,
    isError: isErrorUserRole,
  } = postUserRoleById

  useEffect(() => {
    if (isSuccess) {
      userRoleMutateAsync(data._id)
      if (userRole) {
        localStorage.setItem('userRole', JSON.stringify(userRole))
        localStorage.setItem('userInfo', JSON.stringify(data))

        setAuth({
          userInfo: data,
          userRole: userRole,
        })
        navigate(pathName)
      }
    }
  }, [isSuccess, userRole])

  useEffect(() => {
    auth?.userInfo && navigate('/')
  }, [navigate])

  const submitHandler = async (data) => {
    mutateAsync(data)
  }

  return (
    <>
      <Helmet>
        <title>Login | HTC Accounting</title>
        <meta property='og:title' content='Login' key='title' />
      </Helmet>
      <div className="bg-gradient-to-b from-sky-100 to-sky-200">
        <div className='grid grid-cols-12 gap-3 h-screen dark:bg-darkgray relative z-[999] bg-transparent'>
          <div className='xl:col-span-8 col-span-12 items-center justify-center md:flex hidden relative overflow-hidden'>
            <img className='max-w-100 w-[600px]' src='/accounting@2x.png' />
          </div>
          <div className='xl:col-span-4 col-span-12 flex items-center h-screen sm:px-12 px-4 relative z-10 xl:bg-white xl:dark:bg-darkgray bg-transparent'>
            <FormContainer>
              <div className='mb-10'>
                <img
                  width="80"
                  src="/htc.svg"
                  className="img-fluid"
                  alt="HTC"
                />
              </div>
              <h1 className="text-gray-900 text-2xl font-bold mb-2">Welcome to HTC Accounting</h1>
              <p className="text-gray-900 text-lg font-medium mb-5">Sign in to Continue</p>
              {isError && <Message variant='danger'>{error}</Message>}
              {isErrorUserRole && <Message variant='danger'>{errorUserRole}</Message>}

              <form onSubmit={handleSubmit(submitHandler)}>
                {inputEmail({
                  register,
                  errors,
                  label: 'Email',
                  name: 'email',
                  placeholder: 'Email',
                })}
                {inputPassword({
                  register,
                  errors,
                  label: 'Password',
                  name: 'password',
                  placeholder: 'Password',
                })}
                <button
                  type='submit'
                  className="my-3 inline-flex items-center justify-center text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full dark:text-white" role="status" aria-label="loading">
                      <span className="sr-only">Loading...</span>
                    </span>
                  ) : ''}
                  <span className='px-3'>Sign In</span>
                </button>
              </form>
              <div className='mt-3'>
                <Link to='/auth/forgot-password' className="text-blue-700">
                  Forgot Password?
                </Link>
              </div>
            </FormContainer>
          </div>
        </div>

      </div>
    </>
  )
}

export default Login
