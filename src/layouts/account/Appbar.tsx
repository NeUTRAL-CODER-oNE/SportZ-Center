/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext, Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition, Switch } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/images/SportZ-Center.png";
import { ThemeContext } from "../../context/theme";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

const Appbar = () => {
  const { pathname } = useLocation();
  const { theme, setTheme } = useContext(ThemeContext);
  const authenticated = !!localStorage.getItem("authToken");
  const [enabled, setEnabled] = useState(false);

  const classNames = (...classes: string[]): string =>
    classes.filter(Boolean).join(" ");

  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }
    setTheme(newTheme);
    setEnabled(!enabled);

    // Store the theme preference in localStorage
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    setEnabled(theme === "dark");

    // Retrieve the theme preference from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme, theme]);

  const navigation = [
    { name: "News Articles", href: "/news/articles", current: false },
  ];

  return (
    <>
      <Disclosure
        as="nav"
        className={` border-b border-slate-200 ${
          theme === "dark" ? "dark" : ""
        }`}
      >
        {({}) => (
          <div className="max-w-screen-1xl mx-10">
            <div className="flex h-16 items-center mx-4 justify-between">
              <div className="flex items-center">
                <Link to={"/"}>
                  <div className="flex-shrink-0">
                    <img className="h-6" src={Logo} alt="SportZ-Center" />
                  </div>
                </Link>

                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline">
                    {navigation.map((item) => {
                      const isCurrent = pathname.includes(item.href);

                      return (
                        <>
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              isCurrent
                                ? "bg-gray-200 text-blue-700  font-bold dark:bg-gray-900"
                                : " hover:text-blue-600 dark:text-slate-300 text-slate-600 font-bold",
                              "rounded-md px-3 py-2 text-sm font-medium bg-gray-100  dark:bg-gray-800",
                            )}
                            aria-current={isCurrent ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Switch
                    checked={enabled}
                    onChange={toggleTheme}
                    className={`${
                      enabled ? "bg-slate-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        enabled ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition duration-300`}
                    >
                      {enabled ? (
                        <MoonIcon className="text-gray-800" />
                      ) : (
                        <SunIcon className="text-yellow-500" />
                      )}
                    </span>
                  </Switch>
                  {authenticated && (
                    <>
                      <Link to={`/user/preferences`}>
                        <div className="relative ml-5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                            />
                          </svg>
                        </div>
                      </Link>
                    </>
                  )}
                  <Menu as="div" className="relative ml-5">
                    <div>
                      <Menu.Button className="rounded-full bg-transprent p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className={`
    absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md
    ${
      enabled
        ? "dark:bg-gray-900 dark:text-white"
        : "bg-white text-gray-700 transition-all duration-300"
    }
    py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
  `}
                      >
                        {authenticated ? (
                          <Link
                            className="block px-4 py-2 text-sm font-mono transition-all duration-300 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
                            to="/logout"
                          >
                            Sign-Out
                          </Link>
                        ) : (
                          <>
                            <Link
                              className="block px-4 py-2 text-sm font-mono transition-all duration-300 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
                              to="/user/sign-in"
                            >
                              Sign-In
                            </Link>
                            <Link
                              className="block px-4 py-2 text-sm font-mono transition-all duration-300 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
                              to="/sign-up"
                            >
                              Sign-Up
                            </Link>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
