import { useState, Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import chevronDown from "../assets/logos/chevron-down.svg";
import phone from "../assets/logos/phone.svg";
import envelope from "../assets/logos/envelope.svg";
import bell from "../assets/logos/bell.svg";
import conversioLogo from "../assets/logos/conversio-logo.svg";
import { Outlet, Link, useParams, redirect } from "react-router-dom";
import { useAppContext } from "./AppContext";

const navigation = [
  { name: "Opgaver", href: "opgaver" },
  { name: "Dit team", href: "team" },
  { name: "Din aftale", href: "aftale" },
  { name: "Værktøjer", href: "vaerktoejer" },
];

const medias = [
  { name: "Cases", href: "https://conversio.dk/cases/" },
  { name: "Blog", href: "https://conversio.dk/blog/" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [activeLink, setActiveLink] = useState(false);
  const { companyID, cvrNum, setCompanyID, setCvrNum, urlID, setUrlID } =
    useAppContext();

  // If urlID is not set, set it from the route params
  const { urlID: routeUrlID } = useParams();
  useEffect(() => {
    if (!urlID) {
      setUrlID(routeUrlID);
    }
  }, [urlID, routeUrlID, setUrlID]);

  useEffect(() => {
    const companyID = urlID?.split("-")[0];
    const cvrNum = urlID?.split("-")[1];
    setCompanyID(companyID);
    setCvrNum(cvrNum);
  }, [urlID, setCompanyID, setCvrNum]);

  const handleClick = () => {
    setActiveLink(true);
  };

  return (
    <header className="bg-white">
      <nav
        className=" mx-auto flex items-center justify-between rounded-lg pb-4 pt-5 sm:max-w-8xl sm:px-8"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          {/* Navigate trough the pages */}
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src={conversioLogo} alt="Logo" />
          </Link>
          <div className="hidden lg:flex lg:gap-x-12 ">
            {navigation.map(
              // Redirect to front page if urlID is not set or else redirect to the page with the urlID
              (page) =>
                !urlID ? (
                  <Link
                    key={page.name}
                    to="/"
                    className="text-sm font-semibold text-gray-800"
                  >
                    {page.name}
                  </Link>
                ) : (
                  <Link
                    key={page.name}
                    to={`${page.href}/${urlID}`}
                    className="text-sm font-semibold text-gray-800"
                  >
                    {page.name}
                  </Link>
                )
            )}
          </div>
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div className="flex items-center gap-x-12">
            <div className="hidden lg:flex lg:gap-x-12">
              {/* Loop through the media links */}
              {medias.map((media) => (
                <a
                  key={media.name}
                  href={media.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold  text-gray-800"
                >
                  {media.name}
                </a>
              ))}
            </div>
            <button>
              <img
                src={bell}
                className="mr-3 h-10 w-10 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
                alt="call conversio"
              />
            </button>

            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <img src={chevronDown} alt="chevron-down" />
              Kontakt os
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
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <p
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "group flex items-center px-4 py-2 text-sm"
                      )}
                    >
                      <img
                        src={phone}
                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                        alt="call conversio"
                      />
                      +45 70666500
                    </p>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="mailto:hello@conversio.dk"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "group flex items-center px-4 py-2 text-sm"
                      )}
                    >
                      <img
                        src={envelope}
                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                        alt="mail"
                      />
                      hello@conversio.dk
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
      <div className="border-t border-zinc-200 py-4"></div>
      <Outlet />
    </header>
  );
}
