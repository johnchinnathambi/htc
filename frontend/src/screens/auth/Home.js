import { Helmet } from "react-helmet";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import useAuthHook from "../../api/auth";
import { useMutation } from "react-query";

const Home = () => {
  
const navigate = useNavigate();
const { postLogout } = useAuthHook();

const { mutateAsync } = useMutation(postLogout, {
  onSuccess: () => navigate("/auth/login"),
});

const logoutHandler = () => {
  mutateAsync({});
};

  return (
    <>
      <Helmet>
        <title>Dashboard | HTC Accounting</title>
        <meta
          property="og:title"
          content="Dashboard - HTC Accounting"
          key="title"
        />
      </Helmet>
      <div className="flex h-screen overflow-hidden relative">
        <aside className="absolute left-0 top-0 z-[999] flex h-screen w-72 flex-col overflow-y-hidden bg-slate-800 duration-100 ease-linear dark:bg-slate-900 lg:static lg:translate-x-0 -translate-x-full">
          <div className="flex flex-col p-3">
            <img
              src="/htc-white.svg"
              width="80"
              className="max-w-full"
              alt="HTC"
            />
          </div>
          <div className="no-scrollbar flex flex-col overflow-y-auto duration-200 ease-linear">
            <nav className="mt-3 py-4 px-2">
              <div>
                <ul className="mb-6 flex flex-col gap-2">
                  <li>
                    <a
                      aria-current="page"
                      className="group relative flex items-center gap-2 rounded px-4 py-2 duration-200 ease-in-out hover:bg-slate-700 dark:hover:bg-slate-600 dark:bg-slate-600 bg-slate-600 text-slate-50 active"
                      href="/"
                    >
                      <span className="material-symbols-rounded">
                        dashboard
                      </span>
                      <span>Dashboard</span>
                    </a>
                  </li>
                  <Disclosure>
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
                            User/Employee
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
                      <span className="material-symbols-rounded">
                        inventory_2
                      </span>
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
                      <span className="material-symbols-rounded">
                        analytics
                      </span>
                      <span>Reports</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex flex-grow items-center justify-between px-4 py-2 shadow-2 md:px-6 2xl:px-11">
              <div className="hidden sm:block">
                <form action="" method="POST">
                  <div className="relative">
                    <button className="absolute left-0 top-1/2 w-6 h-6 -translate-y-1/2 text-slate-500">
                      <span className="material-symbols-rounded">search</span>
                    </button>
                    <input
                      type="text"
                      placeholder="Search User, Company and more"
                      className="w-full bg-transparent pl-9 pr-4 text-slate-800 focus:outline-none dark:text-white xl:w-125"
                    />
                  </div>
                </form>
              </div>
              <div className="relative">
                <Menu>
                  <MenuButton className="flex items-center gap-4">
                    <span className="hidden text-right lg:block">
                      <span className="block text-sm font-medium text-black dark:text-white">
                        Dhayalal
                      </span>
                      <span className="block text-xs">Admin</span>
                    </span>
                    <span className="h-10 w-10 rounded-full">
                      <img src="/avatar.png" alt="User" />
                    </span>
                  </MenuButton>
                  <MenuItems anchor="bottom end" className="w-60 z-20 bg-white py-3 rounded shadow-md">
                    <MenuItem className="block data-[focus]:bg-blue-100">
                      <Link
                        to="/auth/login"
                        className="flex items-center gap-3 px-3 py-2"
                        aria-current="page"
                        onClick={logoutHandler}
                      >
                        <span className="material-symbols-rounded">logout</span>
                        <span>Logout</span>
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Home;
