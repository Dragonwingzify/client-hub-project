import { useParams } from "react-router-dom";
import Header from "../components/Header";
import TaskOverview from "../components/TaskOverview";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../components/AppContext";

export default function Opgaver() {
  const [data, setData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  // const { urlID } = useParams();
  // const companyID = urlID.split("-")[0];
  // const cvrNum = urlID.split("-")[1];
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

  const tableTitles = [
    {
      id: 1,
      title: "Opgave",
    },
    {
      id: 2,
      title: "Ansvarlig person",
    },
    {
      id: 3,
      title: "Øvrige",
    },
    {
      id: 4,
      title: "Ydelse",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/crm.company.list?FILTER[ID]=${companyID}&FILTER[UF_CRM_5E44004451657]=${cvrNum}&SELECT[]=UF_CRM_5E44004451657&SELECT[]=UF_CRM_1678093258&SELECT[]=UF_CRM_1677746370&SELECT[]=UF_CRM_1579080612&SELECT[]=UF_CRM_1578405857&SELECT[]=UF_CRM_1579516799&SELECT[]=UF_CRM_1584430041&SELECT[]=UF_CRM_1631609793128&SELECT[]=UF_CRM_1673947323586&SELECT[]=UF_CRM_1579614581`;
        const response = await axios.get(apiUrl);
        setData(response.data.result);

        // Fetch tasks data based on UF_CRM_1579614581
        const groupID = response.data.result[0]?.UF_CRM_1579614581; // Ensure UF_CRM_1579614581 exists
        if (groupID) {
          const tasksApiUrl = `https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/tasks.task.list?filter[CLOSED_DATE]=&filter[GROUP_ID]=${groupID}&filter[%TITLE][]=SEO | &filter[%TITLE][]=Meta | &filter[%TITLE][]=Ads | &filter[%TITLE][]=MA/E-mail | &filter[%TITLE][]=Bing | &filter[%TITLE][]=Pricerunner | &filter[%TITLE][]=DataFeedWatch | &filter[%TITLE][]=Affiliate | &filter[%TITLE][]=Kundeadministration`;
          const tasksResponse = await axios.get(tasksApiUrl);
          // Check if tasksResponse.data.result.tasks contains the expected tasks
          if (tasksResponse.data.result.tasks) {
            setTasksData(tasksResponse.data.result.tasks);
          } else {
            console.log("No tasks found in the response.");
          }
        } else {
          console.log("No groupID found in the response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [companyID, cvrNum]);

  if (tasksData?.length > 0) {
    const serviceNames = tasksData.map((taskName) => {
      const task = taskName.title.split(":")[1].split(" | ")[0].trim();
      switch (task) {
        case "SEO":
          return "SEO";
        case "Meta":
          return "Paid Social";
        case "Social":
          return "Paid Social";
        case "Ads":
          return "Google Ads";
        case "MA/E-mail":
          return "Marketing Automation";
        case "Bing":
          return "Microsoft Ads";
        case "Pricerunner":
          return "Pricerunner";
        case "DataFeedWatch":
          return "Google Ads";
        case "Affiliate":
          return "Affiliate";
        case "Kundeadministration":
          return "Kundeadministration";
        default:
          return "Ingen ydelse";
      }
    });

    const taskAccomplices = tasksData.map((task) => {
      const accomplicesData = task.accomplicesData;
      if (accomplicesData) {
        const accompliceNames = Object.values(accomplicesData).map(
          (accomplice) => accomplice.name
        );
        return accompliceNames;
      }
      return []; // Return an empty array if accomplicesData is undefined or null
    });

    //Get the task ids
    const taskIDS =
      Array.isArray(tasksData) && tasksData.map((task) => task.id);

    return (
      <>
        <Header
          title="Dine opgaver hos Conversio"
          description="Få et øjeblikkeligt overblik over de opgaver og ydelser, du har i gang hos Conversio. Du har mulighed for at orientere dig om status, kommentarer og deadlines samtidig med, at du kan kommunikere tilbage til dine specialister på hver opgave."
        />
        <TaskOverview
          tasksData={tasksData}
          setTasksData={setTasksData}
          taskAccomplices={taskAccomplices}
          taskIDS={taskIDS}
          serviceNames={serviceNames}
          tableTitles={tableTitles}
          buttonTitle="Se opgave"
        />
      </>
    );
  } else {
    console.log("Data is undefined or empty.");
  }
}
