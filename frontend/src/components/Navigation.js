import { Link, useNavigate } from "react-router-dom";
import useAuthHook from "../api/auth";
import { useMutation } from "react-query";
import useAuth from "../hooks/useAuth";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Navigation = () => {
  const navigate = useNavigate();
  const { postLogout } = useAuthHook();
  const { auth } = useAuth();

  const { mutateAsync } = useMutation(postLogout, {
    onSuccess: () => navigate("/auth/login"),
  });

  const logoutHandler = () => {
    mutateAsync({});
  };

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const guestItems = () => {
    return (
      <>
        <nav className="">
          <div className="navbar-nav ms-auto">
            <div className="nav-item">
              <Link to="/auth/login" className="block font-medium py-1 px-3 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200 ease" aria-current="page">
                Login
              </Link>
            </div>
          </div>
        </nav>
      </>
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
        <nav>
          <div className="py-2 flex items-center">
            {menus() &&
              menus().menuItems.map(
                (menu) =>
                  menu.menu === "normal" &&
                  menu.auth === true && (
                    <li key={menu._id}>
                      <Link
                        to={menu.path}
                        className="p-2 block"
                        aria-current="page"
                      >
                        {menu.name}
                      </Link>
                    </li>
                  )
              )}

            {menus() &&
              menus().uniqueDropdowns.map((item) => (
                <Menu key={item}>
                  <MenuButton className="p-2" >
                    {item === "profile"
                      ? user() && user().name
                      : item.charAt(0).toUpperCase() + item.substring(1)}
                  </MenuButton>
                  <MenuItems anchor="bottom start" className="w-40 z-20 bg-white py-3 rounded shadow-md">
                    {menus() &&
                      menus().menuItems.map(
                        (menu) =>
                          menu.menu === item && (
                            <MenuItem key={menu._id} className="data-[active]:bg-blue-200">
                              <a className="block px-3 py-2 data-[focus]:bg-blue-50 cursor-pointer" to={menu.path}>
                                {menu.name}
                              </a>
                            </MenuItem>
                          )
                      )}
                  </MenuItems>
                </Menu>
              ))}

            <div className="nav-item">
              <Link
                to="/auth/login"
                className="nav-link"
                aria-current="page"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </div>
          </div>
        </nav>
      </>
    );
  };

  return (
    <nav className="flex justify-between items-center px-4 py-2">
      <Link to="/">
        <img
          width="40"
          height="40"
          src="/htc.svg"
          className="img-fluid"
          alt="HTC"
        />
      </Link>
      <div className="flex items-center">
        <button
          className="p-1 w-8 h-8 block sm:hidden"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-rounded">menu</span>
        </button>
        <div className="hidden sm:block">
          {userInfo ? authItems() : guestItems()}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
