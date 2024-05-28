import PropTypes from "prop-types";
import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const [isOpen, setIsOpen] = useState(false);
  const { user: loggedInUser } = useAuth();

  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        role
      );
      return data;
    },
    onSuccess: () => {
      console.log("Data Saved Successfully");
      toast.success("User Updated Successfully!");
      refetch();
      setIsOpen(false);
    },
  });
  const modalHandler = async (selected) => {
    // if(user?.status === 'Verified'){
    //   toast.error('User role change korte cay na')
    //   return
    // }
    if (loggedInUser?.email === user?.email) {
      toast.error("You can't change your own role");
      return setIsOpen(false) 
    }
    console.log("cc", selected);
    const userRole = {
      role: selected,
      status: "Verified",
    };
    try {
      const data = await mutateAsync(userRole);
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "Verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          user={user}
          modalHandler={modalHandler}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        ></UpdateUserModal>
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
