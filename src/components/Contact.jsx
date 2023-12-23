import envelope from "../assets/logos/envelope.svg";
import phone from "../assets/logos/phone.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../components/AppContext";
import { useParams } from "react-router-dom";

export default function Contact() {
  const [teamID, setteamID] = useState([]);
  const [bitrixUsers, setBitrixUsers] = useState([]);

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

  useEffect(() => {
    const apiUrl = `https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/crm.company.get?ID=${companyID}&FILTER[UF_CRM_5E44004451657]=${cvrNum}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setteamID(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const bitrixUrl =
      "https://crm.conversio.dk/rest/130/sekc7hvooe2aqnf7/user.get.json";

    const bitrixConfig = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "BITRIX_SM_SALE_UID=0; PHPSESSID=tZBn3zCuBcjNq2TIdlPIgHcEaunrE04Y",
      },
    };
    // Fetch all users from the Bitrix API and stores them in the allUsers array
    const fetchData = async () => {
      let next = 1;
      let allUsers = [];
      do {
        try {
          const response = await axios.get(
            `${bitrixUrl}?start=${next}`,
            bitrixConfig
          );
          const users = response.data.result;

          // Add the users array to the allUsers array
          allUsers = [...allUsers, ...users];
          next = response.data.next || 0;
        } catch (error) {
          console.error("Error fetching bitrix users:", error);
          break;
        }
      } while (next > 0);
      setBitrixUsers(allUsers);
    };

    fetchData();
  }, [urlID]); // Empty dependency array to run the effect only once
  // Get the team IDs from the API response
  const assignedById = teamID.ASSIGNED_BY_ID || {};
  const commercialID = teamID.UF_CRM_1678093258 || {};
  const strategyID = teamID.UF_CRM_1677746370 || {};
  const paidSearchID = teamID.UF_CRM_1579080612 || {};
  const seoID = teamID.UF_CRM_1578405857 || {};
  const marketingID = teamID.UF_CRM_1579516799 || {};
  const paidSocialID = teamID.UF_CRM_1584430041 || {};

  // Combine all team IDs in an array for easier iteration
  const teamIds = [
    assignedById,
    commercialID,
    strategyID,
    paidSearchID,
    seoID,
    marketingID,
    paidSocialID,
  ];

  // Filter and map the bitrixUsers array
  const mappedData = bitrixUsers
    .filter((user) =>
      teamIds.some(
        // Check if user ID matches any of the team IDs directly or within the team ID object
        (teamId) => user.ID === teamId || user.ID === teamId[user.ID]
      )
    )
    .map((user) => ({
      // Map the relevant user data
      picture: user.PERSONAL_PHOTO || "",
      name: `${user.NAME} ${user.LAST_NAME}`,
      title: user.WORK_POSITION || "",
      email: user.EMAIL || "",
      phoneNumber: user.PERSONAL_MOBILE || "",
    }));

  return (
    <div className="mx-auto max-w-8xl items-center justify-between px-6 sm:px-8 pb-12">
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mappedData.map(
          (person, index) =>
            // Add a check for null or undefined
            person && (
              <li
                key={index}
                className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
              >
                <div className="flex flex-1 flex-col p-8">
                  <img
                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                    src={person.picture}
                    alt="profile"
                  />
                  <h3 className="mt-6 text-sm font-medium text-gray-900">
                    {person.name}
                  </h3>
                  <dl className="mt-1 flex flex-grow flex-col justify-between">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-sm text-zinc-400">{person.title}</dd>
                  </dl>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <a
                        href={`mailto:${person.email}`}
                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4  text-gray-800 text-sm font-medium"
                      >
                        <img src={envelope} alt="email" />
                        Email
                      </a>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <div className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4  text-gray-800 text-sm font-medium">
                        <img src={phone} alt="call" />
                        {person.phoneNumber}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
