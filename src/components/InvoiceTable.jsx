import { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InvoiceTable({
  data,
  tableTitles,
  buttonTitle,
  title,
}) {
  const [pdfUrl, setPdfUrl] = useState("");

  const handlePdfDownload = async (task, pdfUrl) => {
    const fileName = `Faktura-${task.bookedInvoiceNumber}.pdf`; // Provide a valid file name

    try {
      const urlWithParams = `https://keyinsights.agency/download_economics_invoice?pdf_url=${encodeURIComponent(
        pdfUrl
      )}`;
      const response = await fetch(urlWithParams, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const blob = await response.blob();
      const aElement = document.createElement("a");
      aElement.setAttribute("download", fileName);
      const href = URL.createObjectURL(blob);
      aElement.href = href;
      aElement.setAttribute("target", "_blank");
      aElement.click();
      URL.revokeObjectURL(href);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  function RenderStatus(task, isLastRow) {
    return (
      <>
        {task.type === "paid" ? (
          <td
            className={`whitespace-nowrap px-3 py-4 text-sm text-green-800  w-0 ${
              isLastRow ? "" : "border-b border-gray-200"
            }`}
          >
            <div className="rounded-full border border-green-200 justify-center items-center inline-flex px-2 py-1.5 bg-green-50 ">
              Betalt
            </div>
          </td>
        ) : task.type === "unpaid" ? (
          <td
            className={`whitespace-nowrap px-3 py-4 text-sm text-gray-800 ${
              isLastRow ? "" : "border-b border-gray-200"
            }`}
          >
            <div className="rounded-full border border-zinc-300 justify-center items-center inline-flex px-2 py-1.5">
              Ikke betalt
            </div>
          </td>
        ) : task.type === "overdue" ? (
          <td
            className={`whitespace-nowrap px-3 py-4 text-sm text-red-800 ${
              isLastRow ? "" : "border-b border-gray-200"
            }`}
          >
            <div className="rounded-full border border-red-200 justify-center items-center inline-flex px-2 py-1.5 bg-red-50">
              Overskredet betaling
            </div>
          </td>
        ) : (
          <td
            className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${
              isLastRow ? "" : "border-b border-gray-200"
            }`}
          >
            {task.type}
          </td>
        )}
      </>
    );
  }

  return (
    <>
      <div className="mx-auto flex items-center justify-between px-6 sm:px-8"></div>
      <div className="mt-8 flow-root mx-auto max-w-8xl items-center justify-between px-6 sm:px-8">
        <div className="-mx-4 -my-2">
          <div className="border-t border-zinc-200 py-8 mx-auto"></div>
          <div className="text-gray-800 text-2xl font-semibold">{title}</div>
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  {/* Loop through the table titles */}
                  {tableTitles.map((title) => (
                    <th
                      key={title.id} // Add a unique key to each <th> element
                      scope="col"
                      className=" sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      {title.title}
                    </th>
                  ))}

                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {data?.map((task, index) => (
                  <tr
                    key={task.bookedInvoiceNumber}
                    className="hover:bg-slate-50"
                  >
                    <td
                      className={classNames(
                        // if index is not the last task in the array, add a border to the bottom of the row.
                        index !== data.length - 1
                          ? "border-b border-gray-200 "
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm font-medium text-gray-900 sm:table-cell"
                      )}
                    >
                      {/* Get task title from title property */}
                      {task.bookedInvoiceNumber}
                    </td>
                    <td
                      className={classNames(
                        index !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      )}
                    >
                      {task.dueDate}{" "}
                      {/* Access the name property of the responsible object */}
                    </td>
                    <td
                      className={classNames(
                        index !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {/* Loop through the accomplices array and display the names */}
                      {task.grossAmountInBaseCurrency} {" kr."}
                    </td>
                    <td
                      className={classNames(
                        index !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {task.remainderInBaseCurrency}
                      {" kr."}
                    </td>
                    {RenderStatus(task, index === data.length - 1)}
                    <td
                      className={classNames(
                        index !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          const currentPdfUrl = task.pdf_download;
                          setPdfUrl(currentPdfUrl);
                          handlePdfDownload(task, currentPdfUrl);
                        }}
                        className="rounded-md border px-3 py-2 text-center text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                      >
                        {buttonTitle}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
