import { Message } from "../../components";
import {
  inputCheckBox,
  inputEmail,  
  inputText,
  staticInputSelect,
  inputDate,
} from "../../utils/dynamicForm";

// import { useState } from "react";

export const FormCompanies = ({
  // edit,
  formCleanHandler,
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
            label: "Company Serial No.",
            name: "companySerialNo",
            placeholder: "Company Serial No.",
          })}
          {inputDate({
            register,
            errors,
            label: "Registration Date",
            name: "registrationDate",
            placeholder: "11/11/2024",
          })}
          {staticInputSelect({
            register,
            errors,
            label: "Introduction ID",
            name: "introductionID",
            placeholder: "Introduction ID",
            isRequired: false,
            data: [{ name: "TNCHN56789CP" }],
          })}
          {inputText({
            register,
            errors,
            label: "Company ID",
            name: "companyID",
            placeholder: "TNCHN12345CO",
          })}
          {staticInputSelect({
            register,
            errors,
            label: "Type of Service",
            name: "typeofService",
            placeholder: "Type of Service",
            isRequired: false,
            data: [{ name: "S-1" }, { name: "S-2" }],
          })}
          {staticInputSelect({
            register,
            errors,
            label: "Company Type",
            name: "companyType",
            placeholder: "Company Type",
            isRequired: false,
            data: [{ name: "Proprietor" }, { name: "Partnership" }],
          })}
          {inputText({
            register,
            errors,
            label: "User ID",
            name: "user",
            placeholder: "User ID",
          })}
          {inputText({
            register,
            errors,
            label: "Company Name",
            name: "companyName",
            placeholder: "Company Name",
          })}
          {inputText({
            register,
            errors,
            label: "Company Short Name",
            name: "companyShortName",
            placeholder: "Company Short Name",
          })}
          {inputText({
            register,
            errors,
            label: "GSTIN Number",
            name: "gSTINNumber",
            placeholder: "GSTIN Number",
          })}
          {inputText({
            register,
            errors,
            label: "Company Admin Name",
            name: "companyAdminName",
            placeholder: "Company Admin Name",
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
          {inputText({
            register,
            errors,
            label: "Mobile Number 1",
            name: "mobileNumber1",
            placeholder: "9876543210",
          })}
          {inputText({
            register,
            errors,
            label: "Mobile Number 2",
            name: "mobileNumber2",
            placeholder: "044 12345678",
          })}
          {inputText({
            register,
            errors,
            label: "Phone Number",
            name: "phoneNumber",
            placeholder: "04412345678",
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
            label: "Logo",
            name: "logo",
            placeholder: "Logo",
          })}
          {inputText({
            register,
            errors,
            label: "Watermark",
            name: "watermark",
            placeholder: "Watermark",
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

export default FormCompanies;
