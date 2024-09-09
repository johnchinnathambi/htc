import { Message } from "..";
import {
  inputText,
  inputTextArea,
  inputMultipleCheckBox,
} from "../../utils/dynamicForm";

const FormRoles = ({
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
  permissionData,
  clientPermissionData,
  setIsModalOpen,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="w-full top-0 left-0 z-[999]">
          <div className="h-1 w-full bg-blue-100 overflow-hidden">
            <span className="sr-only">Loading...</span>
            <div className="animate-progress w-full h-full bg-blue-500 origin-left-right"></div>
          </div>
        </div>
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          {inputText({
            register,
            errors,
            label: "Name",
            name: "name",
            placeholder: "Name",
          })}

          {inputTextArea({
            register,
            errors,
            label: "Description",
            name: "description",
            placeholder: "Description",
          })}

          <div className="mb-3 p-3 border border-gray-400 rounded-md">
            <h4 className="font-medium text-base mb-3">API Permission</h4>
            {inputMultipleCheckBox({
              register,
              errors,
              label: "Permission",
              name: "permission",
              placeholder: "Permission",
              data:
                permissionData &&
                permissionData.map((item) => ({
                  name: `${item.method} - ${item.description}`,
                  _id: item._id,
                })),
              isRequired: false,
            })}
          </div>

          <div className="mb-3 p-3 border border-gray-400 rounded-md">
            <h4 className="font-medium text-base mb-3">Client Permission</h4>
            {inputMultipleCheckBox({
              register,
              errors,
              label: "Client Permission",
              name: "clientPermission",
              placeholder: "Client Permission",
              data:
                clientPermissionData &&
                clientPermissionData.map((item) => ({
                  name: `${item.menu} - ${item.path}`,
                  _id: item._id,
                })),
              isRequired: false,
            })}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="min-w-[120px] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center "
              disabled={isLoadingPost || isLoadingUpdate}
            >
              {isLoadingPost || isLoadingUpdate ? (
                <span
                  className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full dark:text-white"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </span>
              ) : (
                <span>Save</span>
              )}
            </button>
            <button
              type="button"
              className="px-4 py-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 active:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
              onClick={() => {
                setIsModalOpen(false);
                formCleanHandler();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default FormRoles;
