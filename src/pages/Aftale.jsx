import { useEffect, useState } from "react";
import Header from "../components/Header";
import InvoiceCard from "../components/InvoiceCard";
import axios from "axios";
import InvoiceTable from "./../components/InvoiceTable";
import { useAppContext } from "../components/AppContext";
import { useParams } from "react-router-dom";

export default function Aftale() {
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

  const [data, setData] = useState([]);
  const tableTitles = [
    {
      id: 1,
      title: "Faktura",
    },
    {
      id: 2,
      title: "Forfaldsdato",
    },
    {
      id: 3,
      title: "Fakturabeløb",
    },
    {
      id: 4,
      title: "Resterende beløb",
    },
    {
      id: 5,
      title: "Status",
    },
  ];

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://keyinsights.agency/get_economics_invoices?customer_number=${cvrNum}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setData(response.data.results); // Update the state with the tasks array
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Header
        title="Din aftale med Conversio"
        description="Få et fuldt overblik over de ydelser, som din aftale med Conversio indeholder. Derudover kan du hurtigt og simpelt hente dine seneste fakturaer og se, hvad status er på den enkelte faktura."
      />
      <InvoiceCard />
      <InvoiceTable
        tableTitles={tableTitles}
        buttonTitle="Se faktura"
        title="Dine fakturaer"
        data={data}
      />
    </>
  );
}
