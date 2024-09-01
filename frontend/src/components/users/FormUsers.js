import { Message } from "../../components";
import {
  inputCheckBox,
  inputEmail,
  inputPassword,
  inputText,
  staticInputSelect,
  inputDate,
} from "../../utils/dynamicForm";

// import { useState } from "react";

export const FormUsers = ({
  // edit,
  // formCleanHandler,
  isLoading,
  register,
  isError,
  errors,
  watch,
  isLoadingUpdate,
  isLoadingPost,
  handleSubmit,
  submitHandler,
  error,
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
          {staticInputSelect({
            register,
            errors,
            label: "Department",
            name: "department",
            placeholder: "Department",
            isRequired: false,
            data: [{ name: "Account" }],
          })}
          {staticInputSelect({
            register,
            errors,
            label: "Designation",
            name: "designation",
            placeholder: "Designation",
            isRequired: false,
            data: [{ name: "Manager" }],
          })}
          {inputText({
            register,
            errors,
            label: "Name",
            name: "name",
            placeholder: "Name",
          })}
          {inputText({
            register,
            errors,
            label: "Address 1",
            name: "address1",
            placeholder: "House/Flat no, Building name",
          })}
          {inputText({
            register,
            errors,
            label: "Address 2",
            name: "address2",
            placeholder: "Street name/number",
          })}
          {inputText({
            register,
            errors,
            label: "Address 3",
            name: "address3",
            placeholder: "Block no. , Area Name",
          })}
          {staticInputSelect({
            register,
            errors,
            label: "City",
            name: "city",
            placeholder: "City",
            isRequired: false,
            data: [{ name: "Chennai" }, { name: "Madurai" }],
          })}
          {inputText({
            register,
            errors,
            label: "Pin code",
            name: "pincode",
            placeholder: "600 078",
          })}
          {staticInputSelect({
            register,
            errors,
            label: "State",
            name: "state",
            placeholder: "State",
            isRequired: false,
            data: [{ name: "Tamilnadu" }, { name: "Kerala" }],
          })}
          {inputText({
            register,
            errors,
            label: "Mobile no.",
            name: "mobile",
            placeholder: "044 12345678",
          })}
          {inputEmail({
            register,
            errors,
            label: "Email ID",
            name: "email",
            placeholder: "Email",
          })}
          {inputText({
            register,
            errors,
            label: "Pan No.",
            name: "pan",
            placeholder: "AAAAA1234Z",
          })}
          {inputText({
            register,
            errors,
            label: "PF No.",
            name: "pf",
            placeholder: "KN/PY/1234567/987",
          })}
          {inputText({
            register,
            errors,
            label: "ESI No.",
            name: "esi",
            placeholder: "31-00-123456-000-0001",
          })}
          {inputDate({
            register,
            errors,
            label: "DOB",
            name: "dob",
            placeholder: "11/11/1999",
          })}
          {staticInputSelect({
            register,
            errors,
            label: "Salary Schedule Type",
            name: "salaryscheduletype",
            placeholder: "Salary Schedule Type",
            isRequired: false,
            data: [{ name: "Weekly" }, { name: "Monthly" }],
          })}
          {inputPassword({
            register,
            errors,
            label: "Password",
            name: "password",
            minLength: true,
            isRequired: false,
            placeholder: "Password",
          })}
          {inputPassword({
            register,
            errors,
            watch,
            name: "confirmPassword",
            label: "Confirm Password",
            validate: true,
            minLength: true,
            isRequired: false,
            placeholder: "Confirm Password",
          })}

          {inputCheckBox({
            register,
            errors,
            watch,
            name: "confirmed",
            label: "Confirmed",
            isRequired: false,
            placeholder: "Confirmed",
          })}

          {inputCheckBox({
            register,
            errors,
            watch,
            name: "blocked",
            label: "Blocked",
            isRequired: false,
            placeholder: "Blocked",
          })}
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
          </div>
        </form>

        // <div
        //   className='modal fade'
        //   id='userModal'
        //   data-bs-backdrop='static'
        //   data-bs-keyboard='false'
        //   tabIndex='-1'
        //   aria-labelledby='userModalLabel'
        //   aria-hidden='true'>
        //
        //   <div className='modal-dialog'>
        //     <div className='modal-content modal-background'>
        //       <div className='modal-header'>
        //         <h3 className='modal-title ' id='userModalLabel'>
        //           {edit ? 'Edit User' : 'Add User'}
        //         </h3>
        //         <button
        //           type='button'
        //           className='btn-close'
        //           data-bs-dismiss='modal'
        //           aria-label='Close'
        //           onClick={formCleanHandler}
        //         ></button>
        //       </div>
        //       <div className='modal-body'>

        //       </div>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
};

export default FormUsers;
