import { useState, useEffect } from "react";
import { useAppContext } from "../components/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function InvoiceCard() {
  const [data, setData] = useState([]);
  const [monthlyDeals, setMonthlyDeals] = useState([]);
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
    const fetchData = async () => {
      try {
        const apiUrl = `https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/crm.deal.list?FILTER[COMPANY_ID]=${companyID}&FILTER[UF_CRM_1582288079704]=139`;
        const response = await axios.get(apiUrl);
        // Fetch tasks data based on UF_CRM_1579614581
        if (response?.data?.result[0].ID) {
          const tasksApiUrl = `https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/crm.deal.productrows.get?ID=${response?.data?.result[0].ID}`;
          const tasksResponse = await axios.get(tasksApiUrl);

          // Check if tasksResponse.data.result contains the expected tasks
          if (tasksResponse?.data?.result) {
            setMonthlyDeals(tasksResponse?.data.result);
          } else {
            console.log("No monthlyDeals found in the response.");
          }
        } else {
          console.log("No companyID found in the response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [companyID, cvrNum]);

  return (
    <div className="mx-auto max-w-8xl items-center justify-between px-6 sm:px-8 py-11">
      <ul className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
        {monthlyDeals?.map((deal) => (
          <li
            key={deal.ID}
            className="overflow-hidden rounded-xl border border-gray-200"
          >
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <div className="text-sm font-medium leading-6 text-gray-900">
                {deal.ORIGINAL_PRODUCT_NAME}
              </div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dd className="text-gray-700">
                  <div>{deal.PRODUCT_DESCRIPTION}</div>
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Beløb</dt>
                <dd className="flex items-start gap-x-2">
                  <div className="font-medium text-gray-900">
                    {deal.PRICE_ACCOUNT} kr.
                  </div>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
