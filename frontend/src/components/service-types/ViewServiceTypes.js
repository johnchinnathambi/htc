import { Search } from "..";

const ViewServiceTypes = ({
  data,
  viewHandler,
  editHandler,
  deleteHandler,
  isLoadingDelete,
  setQ,
  q,
  searchHandler,
  setIsModalOpen,
  setView,
}) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between mb-3">
        <h2 className="font-bold text-2xl text-gray-800 my-1">
          Service Types ({data && data.total})
        </h2>
        <div className="flex flex-wrap gap-3">
          <Search
            placeholder="Search by name"
            setQ={setQ}
            q={q}
            searchHandler={searchHandler}
          />
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2.5 text-center"
            onClick={() => {setIsModalOpen(true);setView(false);}}
          >
            Add New Service Type
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 rounded">
          <thead className="text-xs text-slate-500 uppercase bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-2 py-4">Service Serial No</th>
              <th className="px-2 py-4">Service Name</th>
              <th className="px-2 py-4">Perticular</th>
              <th className="px-2 py-4">Fees</th>
              <th className="px-2 py-4">Status</th>
              <th className="px-2 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.map((serviceType) => (
                <tr key={serviceType._id}>
                  <td className="p-2">{serviceType.serviceSerialNo}</td>
                  <td className="p-2">{serviceType.serviceName}</td>
                  <td className="p-2">{serviceType.particular}</td>
                  <td className="p-2">{serviceType.fees}</td>
                  <td className="p-2">{serviceType.status}</td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          viewHandler(serviceType);
                        }}
                      >
                        <span className="material-symbols-rounded ">visibility</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-blue-600 hover:bg-blue-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm p-2"
                        onClick={() => {
                          setIsModalOpen(true);
                          editHandler(serviceType);
                        }}
                      >
                        <span className="material-symbols-rounded ">edit</span>
                      </button>

                      <button
                        className="inline-flex text-gray-600 hover:text-red-600 hover:bg-red-100 focus:ring-4 focus:ring-red-200 font-medium rounded-full text-sm p-2"
                        onClick={() => deleteHandler(serviceType._id)}
                        disabled={isLoadingDelete}
                      >
                        {isLoadingDelete ? (
                          <span
                            className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full dark:text-white"
                            role="status"
                            aria-label="loading"
                          >
                            <span className="sr-only">Loading...</span>
                          </span>
                        ) : (
                          <span className="material-symbols-rounded">
                            delete
                          </span>
                        )}
                      </button>
                    </div>
                  </td>
                </tr> 
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewServiceTypes;
