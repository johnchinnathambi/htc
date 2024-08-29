import moment from 'moment'
import { FaPenAlt, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { Search } from '..'

const ViewUsers = ({
  data,
  editHandler,
  deleteHandler,
  isLoadingDelete,
  setQ,
  q,
  searchHandler,
}) => {
  return (
    <div className='table-responsive bg-light p-3 mt-2'>
      <div className='d-flex align-items-center flex-column mb-2'>
        <h3 className='fw-light text-muted'>
          Users List <sup className='fs-6'> [{data && data.total}] </sup>
        </h3>
        <button
          className='btn btn-outline-primary btn-sm shadow my-2'
          data-bs-toggle='modal'
          data-bs-target='#userModal'
        >
          Add New User
        </button>
        <div className='col-auto'>
          <Search
            placeholder='Search by email'
            setQ={setQ}
            q={q}
            searchHandler={searchHandler}
          />
        </div>
      </div>
      <table className='table table-sm table-border'>
        <thead className='border-0'>
          <tr>
            <th>Joined Date</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Name</th>
            <th>Email</th>
            {/* <th>Address 1</th>
            <th>Address 2</th>
            <th>Address 3</th>
            <th>City</th>
            <th>Pin Code</th>
            <th>State</th>
            <th>Mobile</th>
            <th>PAN No.</th>
            <th>PF No.</th>
            <th>ESI No.</th>
            <th>DOB</th>
            <th>Salary Schedule Type</th>             */}
            <th>Confirmed</th>
            <th>Blocked</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.data.map((user) => (
              <tr key={user._id}>
                <td>{moment(user.createdAt).format('lll')}</td>
                <td>{user.department}</td>
                <td>{user.designation}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                {/* <td>{user.address1}</td>
                <td>{user.address2}</td>
                <td>{user.address3}</td>
                <td>{user.city}</td>
                <td>{user.pincode}</td>
                <td>{user.state}</td>
                <td>{user.mobile}</td>
                <td>{user.pan}</td>
                <td>{user.pf}</td>
                <td>{user.esi}</td>
                <td>{user.dob}</td>
                <td>{user.salaryscheduletype}</td> */}
                <td>
                  {user.confirmed ? (
                    <FaCheckCircle className='text-success' />
                  ) : (
                    <FaTimesCircle className='text-danger' />
                  )}
                </td>
                <td>
                  {user.blocked ? (
                    <FaCheckCircle className='text-success' />
                  ) : (
                    <FaTimesCircle className='text-danger' />
                  )}
                </td>

                <td>
                  <div className='btn-group'>
                    <button
                      className='btn btn-primary btn-sm rounded-pill'
                      onClick={() => editHandler(user)}
                      data-bs-toggle='modal'
                      data-bs-target='#userModal'
                    >
                      <FaPenAlt />
                    </button>

                    <button
                      className='btn btn-danger btn-sm ms-1 rounded-pill'
                      onClick={() => deleteHandler(user._id)}
                      disabled={isLoadingDelete}
                    >
                      {isLoadingDelete ? (
                        <span className='spinner-border spinner-border-sm' />
                      ) : (
                        <span>
                          <FaTrash />
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
  )
}

export default ViewUsers
