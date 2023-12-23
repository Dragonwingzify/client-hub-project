import { Link, useParams } from "react-router-dom";
import arrowUpRight from "../assets/logos/arrow-up-right.svg";
import { useAppContext } from "./AppContext";
import { useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function VerticalNavigation({
  tasksData,
  taskAccomplices,
  serviceNames,
  selectedService,
}) {
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

  // Find the index of the selected task name in serviceNames
  const selectedTaskIndex = serviceNames.indexOf(selectedService);
  return (
    <nav className="flex flex-2 flex-col" aria-label="Sidebar">
      <div className="text-xs font-semibold leading-6 text-gray-400">
        Ansvarlig person
      </div>
      <ul className="flex flex-1 flex-col ">
        <li className="-mx-2 space-y-1">
          <Link
            to={`/team/${urlID}`}
            className={classNames(
              "text-black text-sm group flex gap-x-3 rounded-md p-2 leading-6 font-semibold"
            )}
          >
            <span className="truncate">
              {tasksData[selectedTaskIndex].responsible.name}
            </span>
            <img src={arrowUpRight} alt="redirect" />
          </Link>
        </li>
        <li>
          <div className="text-xs font-semibold leading-6 text-gray-400 ">
            Øvrige
          </div>
          <ul className="-mx-2  ">
            {taskAccomplices[selectedTaskIndex].map((accomplice, index) => (
              <li key={index}>
                <Link
                  to={`/team/${urlID}`}
                  className={classNames(
                    "text-black text-sm  group flex gap-x-3 rounded-md p-2 leading-6 font-semibold"
                  )}
                >
                  <span className="truncate">{accomplice}</span>
                  <img src={arrowUpRight} alt="redirect" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="text-xs font-semibold leading-6 text-gray-400 ">
            Ydelse
          </div>
          <div className=" text-black text-sm font-medium mt-2">
            {selectedTaskIndex !== -1 ? serviceNames[selectedTaskIndex] : "N/A"}
          </div>
        </li>
      </ul>
    </nav>
  );
}
