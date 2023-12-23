import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import ToolList from "../components/ToolList";
import { useAppContext } from "../components/AppContext";
import { useParams } from "react-router-dom";

export default function Vaerktoejer() {
  const [data, setData] = useState(null);
  const [toolLinks, setToolLinks] = useState(null);
  // const profileID = 130;
  // const cvrID = 25941330;

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

  // Fetch data from the API based on the different filters
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/tasks.task.list?filter[CLOSED_DATE]=&filter[GROUP_ID]=181&filter[%TITLE][]=SEO | &filter[%TITLE][]=Meta | &filter[%TITLE][]=Ads | &filter[%TITLE][]=Kundeadministration`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const apiUrl = `https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/crm.company.get?ID=${companyID}&FILTER[UF_CRM_5E44004451657]=${cvrNum}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setToolLinks(response.data.result); // Update the state with the tasks array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Header
        title="Værktøjer"
        description="Vi udvikler løbende nye værktøjer, som skal gøre vores arbejde mere effektivt til fordel for din forretning.
Disse værktøjer skal du selvfølgelig også have adgang til. "
      />
      <ToolList data={toolLinks} />
    </>
  );
}
