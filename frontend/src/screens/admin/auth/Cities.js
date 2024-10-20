import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { confirmAlert } from "react-confirm-alert";
import { useForm } from "react-hook-form";
import useCitiesHook from "../../../api/cities";
import useStatesHook from "../../../api/states";
import {
  Spinner,
  ViewCities,
  Pagination,
  FormCities,
  Message,
  Confirm,
} from "../../../components";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

const Cities = () => {
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [q, setQ] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    getCities,
    postCity,
    updateCity,
    deleteCity,
  } = useCitiesHook({
    page,
    q,
  });

  const { getStates } = useStatesHook({
    limit: 1000000,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const { data, isLoading, isError, error, refetch } = getCities;

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateCity;

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteCity;

  const { data: stateData } = getStates;

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postCity;

  const formCleanHandler = () => {
    setEdit(false);
    reset();
  };

  useEffect(() => {
    if (isSuccessPost || isSuccessUpdate) formCleanHandler();
  }, [isSuccessPost, isSuccessUpdate]);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    if (!q) refetch();
  }, [q]);

  const searchHandler = (e) => {
    e.preventDefault();
    refetch();
    setPage(1);
  };

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)));
  };

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          cityID: data.cityID,
          cityName: data.cityName,
          cityShortName: data.cityShortName,
          state: data.state,
        })
      : mutateAsyncPost(data);
  };

  const viewHandler = (city) => {
    setId(city._id);
    setView(true);
    setValue("cityID", city.cityID);
    setValue("cityName", city.cityName);
    setValue("cityShortName", city.cityShortName);
    setValue("state", city.state._id);   
  };

  const editHandler = (city) => {    
    setId(city._id);
    setView(false);
    setEdit(true);
    setValue("cityID", city.cityID);
    setValue("cityName", city.cityName);
    setValue("cityShortName", city.cityShortName);
    setValue("state", city.state._id);    
  };

  return (
    <>
      <Helmet>
        <title>Cities | HTC</title>
        <meta property="og:title" content="Cities" key="title" />
      </Helmet>
      {isSuccessDelete && (
        <Message variant="success">
          City has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant="success">
          City has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant="success">
          City has been Created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant="danger">{errorPost}</Message>}

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ViewCities
          data={data}
          viewHandler={viewHandler}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          isLoadingDelete={isLoadingDelete}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setView={setView}
        />
      )}

      <div className="ms-auto text-end">
        <Pagination data={data} setPage={setPage} />
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        transition
        className="realtive z-[1000] transition duration-100 ease-linear data-[closed]:opacity-0"
      >
        <div className="fixed z-[1000] inset-0 flex w-screen justify-end p-4">
          <DialogPanel className="max-w-[800px] w-full flex flex-col rounded-xl shadow-sm bg-white">
            <DialogTitle
              className="flex justify-between items-center py-4 px-6"
              as="div"
            >
              <h3 className="text-2xl font-bold">                
                {edit ? "Edit City" : view ? "View City" : "Add City"}
              </h3>

              <button
                type="button"
                className="inline-flex text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600 focus-visible:ring-4 transition duration-150 ease-linear p-2"
                aria-label="Close"
                onClick={() => {
                  setIsModalOpen(false);
                  formCleanHandler();
                }}
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </DialogTitle>
            <div className="flex-1 overflow-auto py-4 px-6">
              <FormCities
                edit={edit}
                view={view}
                formCleanHandler={formCleanHandler}
                isLoading={isLoading}
                isError={isError}
                errors={errors}
                isLoadingUpdate={isLoadingUpdate}
                isLoadingPost={isLoadingPost}
                register={register}
                handleSubmit={handleSubmit}
                submitHandler={submitHandler}
                setIsModalOpen={setIsModalOpen}
                stateData={stateData && stateData.data}
                watch={watch}
                error={error}
                nextSequenceNumber={data && data.nextSequenceNumber}
              />
            </div>
          </DialogPanel>
        </div>
        <DialogBackdrop className="fixed z-[999] inset-0 bg-black/30" />
      </Dialog>
    </>
  );
};

export default Cities;
