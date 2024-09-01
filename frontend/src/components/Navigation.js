import { Link } from "react-router-dom";
// import useAuthHook from "../api/auth";
// import { useMutation } from "react-query";
import useAuth from "../hooks/useAuth";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { clsx } from "clsx";
const Navigation = () => {
  // const navigate = useNavigate();
  // const { postLogout } = useAuthHook();
  const { auth } = useAuth();

  // const { mutateAsync } = useMutation(postLogout, {
  //   onSuccess: () => navigate("/auth/login"),
  // });

  // const logoutHandler = () => {
  //   mutateAsync({});
  // };

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const guestItems = () => {
    return (
      <nav className="">
        <div className="navbar-nav ms-auto">
          <div className="nav-item">
            <Link
              to="/auth/login"
              className="block font-medium py-1 px-3 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease"
              aria-current="page"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    );
  };

  const user = () => {
    const userInfo = auth?.userInfo;

    return userInfo;
  };

  const menus = () => {
    const dropdownItems = auth?.userRole?.clientPermission?.map(
      (route) => route?.menu
    );

    const menuItems = auth?.userRole?.clientPermission?.map((route) => route);

    const dropdownArray =
      dropdownItems &&
      dropdownItems.filter((item) => item !== "hidden" && item !== "normal");

    const uniqueDropdowns = [...new Set(dropdownArray)];

    return { uniqueDropdowns, menuItems };
  };

  const authItems = () => {
    return (
      <>
        {menus() &&
          menus().menuItems.map(
            (menu) =>
              menu.menu === "normal" &&
              menu.auth === true && (
                <li key={menu._id}>
                  <Link
                    to={menu.path}
                    className="group relative flex items-center gap-2 rounded px-4 py-2 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 dark:bg-slate-600 bg-slate-600 text-slate-50 active"
                    aria-current="page"
                  >
                    <span className="material-symbols-rounded">dashboard</span>
                    <span>{menu.name}</span>
                  </Link>
                </li>
              )
          )}

        {menus() &&
          menus().uniqueDropdowns.map((item) => (
            <Disclosure as="li" key={item}>
              {({ open }) => (
                <>
                  <DisclosureButton className="group relative flex justify-between items-center gap-2 w-full rounded p-2 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600">
                    <span className="material-symbols-rounded">
                      shield_person
                    </span>
                    <span>
                      {item === "profile"
                        ? user() && user().name
                        : item.charAt(0).toUpperCase() + item.substring(1)}
                    </span>
                    <span
                      className={clsx(
                        "material-symbols-rounded ml-auto",
                        open && "rotate-180"
                      )}
                    >
                      keyboard_arrow_down
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel>
                    <ul className="pb-4 pt-2 flex flex-col pl-4 space-y-2">
                      {menus() &&
                        menus().menuItems.map(
                          (menu) =>
                            menu.menu === item && (
                              <li key={menu._id}>
                                <Link
                                  to={menu.path}
                                  className="group relative flex items-center gap-2 rounded-md pl-6 py-1 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                                >
                                  {menu.name}
                                </Link>
                              </li>
                            )
                        )}
                    </ul>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col p-3">
        <img src="/htc-white.svg" width="80" className="max-w-full" alt="HTC" />
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-200 ease-linear">
        <nav className="mt-3 py-4 px-2">
          <ul className="mb-6 flex flex-col gap-2">
            {userInfo ? authItems() : guestItems()}

            {/* <Disclosure as="li">
                <DisclosureButton className="group relative flex justify-between items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600">
                  <span className="material-symbols-rounded">
                    shield_person
                  </span>
                  <span>Administration</span>
                  <span className="material-symbols-rounded ml-auto">
                    keyboard_arrow_down
                  </span>
                </DisclosureButton>
                <DisclosurePanel>
                  <ul className="mb-3 flex flex-col pl-4 space-y-3">
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        State & City
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Department & Designation
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Unit & Unit Conversion
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Service Type
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Users
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Company Branch
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Channel Partner
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Rights
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Reset Password
                      </a>
                    </li>
                    <li>
                      <a
                        className="group relative flex items-center gap-2 rounded-md pl-8 text-slate-200 duration-200 ease-in-out hover:text-blue-400"
                        href="#"
                      >
                        Configuration
                      </a>
                    </li>
                  </ul>
                </DisclosurePanel>
              </Disclosure>
              <li>
                <a
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600"
                  href="/profile"
                >
                  <span className="material-symbols-rounded">business</span>
                  <span>Company</span>
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 active"
                  href="/"
                >
                  <span className="material-symbols-rounded">
                    manage_accounts
                  </span>
                  <span>Account</span>
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 active"
                  href="/"
                >
                  <span className="material-symbols-rounded">inventory_2</span>
                  <span>Product</span>
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 active"
                  href="/"
                >
                  <span className="material-symbols-rounded">contract</span>
                  <span>Transaction</span>
                </a>
              </li>
              <li>
                <a
                  aria-current="page"
                  className="group relative flex items-center gap-2 rounded py-2 px-4 text-slate-200 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 active"
                  href="/"
                >
                  <span className="material-symbols-rounded">analytics</span>
                  <span>Reports</span>
                </a>
              </li> */}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
