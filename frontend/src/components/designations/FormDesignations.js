import { Spinner, Message } from "..";
import { inputText, dynamicInputSelect } from "../../utils/dynamicForm";

const FormDesignations = ({
  edit,
  view,
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
  departmentData,
  setIsModalOpen,
}) => {
  return (
    <>
      <h1>{view}</h1>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          {inputText({
            register,
            errors,
            label: "Designation Serial No",
            name: "designationSerialNo",
            placeholder: "Designation Serial No",
            readOnly: view,
          })}
          {inputText({
            register,
            errors,
            label: "Designation",
            name: "designation",
            placeholder: "Designation",
            readOnly: view,
          })}
          {dynamicInputSelect({
            register,
            errors,
            label: "Department",
            name: "department",
            placeholder: "Department",
            isRequired: false,            
            data: departmentData && departmentData,
            value: "department",
            readOnly: view,
          })}
          {view ? "" :
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
                <span>
                  {edit ? 'Update' : 'Save' }
                </span>
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
        }
        </form>
      )}
    </>
  );
};

export default FormDesignations;
