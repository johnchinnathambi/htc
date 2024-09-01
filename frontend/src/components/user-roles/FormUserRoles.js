import { Spinner, Message } from '..'
import { dynamicInputSelect } from '../../utils/dynamicForm'

const FormUserRoles = ({
  edit,
  formCleanHandler,
  isLoading,
  register,
  isError,
  errors,
  isLoadingUpdate,
  isLoadingPost,
  handleSubmit,
  submitHandler,
  error,
  dataRoles,
  dataUsers,
}) => {
  return (
    <div
      className='modal fade'
      id='userRoleModal'
      data-bs-backdrop='static'
      data-bs-keyboard='false'
      tabIndex='-1'
      aria-labelledby='userRoleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content modal-background'>
          <div className='modal-header'>
            <h3 className='modal-title ' id='userRoleModalLabel'>
              {edit ? 'Edit UserRole' : 'Post UserRole'}
            </h3>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
              onClick={formCleanHandler}
            ></button>
          </div>
          <div className='modal-body'>
            {isLoading ? (
              <Spinner />
            ) : isError ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <form onSubmit={handleSubmit(submitHandler)}>
                {dynamicInputSelect({
                  register,
                  errors,
                  label: 'User',
                  name: 'user',
                  value: 'name',
                  data:
                    dataUsers &&
                    dataUsers.data &&
                    dataUsers.data.filter(
                      (user) => user.confirmed && !user.blocked
                    ),
                  placeholder: 'User',
                })}

                {dynamicInputSelect({
                  register,
                  errors,
                  label: 'Role',
                  name: 'role',
                  placeholder: 'Role',
                  data: dataRoles && dataRoles.data,
                  value: 'name',
                })}

                <div className='flex gap-3'>
                  <button
                    type='button'
                    className='px-4 py-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none '
                    data-bs-dismiss='modal'
                    onClick={formCleanHandler}
                  >
                    Close
                  </button>
                  <button
                    type='submit'
                    className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center '
                    disabled={isLoadingPost || isLoadingUpdate}
                  >
                    {isLoadingPost || isLoadingUpdate ? (
                      <span className='spinner-border spinner-border-sm' />
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormUserRoles
