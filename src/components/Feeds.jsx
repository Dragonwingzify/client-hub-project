import axios from "axios";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Feeds({ selectedID }) {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    comment: "", // Track the comment state
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  // Submit the form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (state.comment.trim() !== "") {
      let requestData = JSON.stringify({
        TASKID: selectedID,
        FIELDS: {
          POST_MESSAGE: state.comment,
        },
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/task.commentitem.add",
        headers: {
          "Content-Type": "application/json",
          Cookie: "BITRIX_SM_SALE_UID=0",
        },
        data: requestData,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          // Update the comment input field and refresh data
          setState({ comment: "" });
          refreshData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const refreshData = () => {
    const apiUrl = `https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/task.commentitem.getlist?taskId=${selectedID}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.result); // Update the state with the tasks array
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    refreshData();
  }, [selectedID]);

  return (
    <>
      <ul className="space-y-6">
        <div className="my-2">Kommentarer</div>
        {data.map((task, taskIdx) => (
          <li key={task.ID} className="relative flex gap-x-3">
            <div
              className={classNames(
                taskIdx === task.POST_MESSAGE.length ? "h-5" : "-bottom-6",
                "absolute left-1 top-0 flex w- justify-center"
              )}
            >
              <div className="w-px bg-gray-200" />
            </div>
            {task.POST_MESSAGE ? (
              <>
                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300 absolute left-0.5" />
                </div>
                <div className="rounded-md p-3 ring-1 ring-inset ring-gray-200 w-full">
                  <div className="flex gap-x-1">
                    <div className="py-0.5 text-xs leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">
                        {task.AUTHOR_NAME}
                      </span>{" "}
                      kommenterede
                    </div>
                    {/* insert date here */}
                    <time
                      dateTime={task.POST_DATE.split("T")[0]}
                      className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                    >
                      {task.POST_DATE.split("T")[0] + ":"}
                    </time>
                  </div>
                  <p className="text-sm leading-6 text-gray-500">
                    {task.POST_MESSAGE}
                  </p>
                </div>
              </>
            ) : (
              // If the activity type is not a comment, maybe display something else here?
              <></>
            )}
          </li>
        ))}
      </ul>

      {/* New comment form */}
      <div className="mt-6 flex gap-x-3">
        <div className="h-1.5 w-1.5 rounded-full bg-black ring-1 ring-gray-300 relative top-0 left-0.5"></div>
        <form
          action="#"
          onSubmit={handleSubmit}
          method="post"
          className="relative flex-auto"
        >
          <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600">
            <textarea
              rows={4}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 px-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Læg en kommentar til teamet..."
              onChange={handleChange}
              value={state.comment}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center"></div>
            </div>
            <button
              type="submit"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Læg kommentar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
