import { useState } from "react";
import Modal from "./Modal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TaskOverview({
  tasksData,
  taskAccomplices,
  serviceNames,
  tableTitles,
  buttonTitle,
  title,
}) {
  const [isShown, setIsShown] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const [selectedService, setselectedService] = useState("");

  const handleClick = (taskID) => {
    setIsShown(true);
    setModalTask(tasksData[taskID]);
    setselectedService(serviceNames[taskID]); // set the selected task name
  };

  const closeModal = () => {
    setIsShown(false);
  };
  return (
    <>
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 sm:px-8"></div>
      <div className="mt-8 flow-root mx-auto max-w-8xl items-center justify-between px-6 sm:px-8">
        {isShown && (
          <Modal
            modalTask={modalTask}
            closeModal={closeModal}
            tasksData={tasksData}
            taskAccomplices={taskAccomplices}
            serviceNames={serviceNames}
            selectedService={selectedService}
          />
        )}
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
                {tasksData?.map((task, index) => (
                  <tr key={task.id} className="hover:bg-slate-50">
                    <td
                      className={classNames(
                        // if index is not the last task in the array, add a border to the bottom of the row.
                        index !== tasksData.length - 1
                          ? "border-b border-gray-200 "
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm font-medium text-gray-900 sm:table-cell"
                      )}
                    >
                      {/* Get task title from title property */}
                      {task.title.split(":")[1]}
                    </td>
                    <td
                      className={classNames(
                        index !== tasksData.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      )}
                    >
                      {task.responsible.name}{" "}
                      {/* Access the name property of the responsible object */}
                    </td>
                    <td
                      className={classNames(
                        index !== tasksData.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {/* Loop through the accomplices array and display the names */}
                      {taskAccomplices[index].map((name, index) => (
                        <span key={name}>
                          {index < taskAccomplices[index].length - 1 ? (
                            <div className=" w-6 h-6 p-1 bg-indigo-500 bg-opacity-10 rounded-full justify-center items-center gap-2.5 inline-flex">
                              +{taskAccomplices[index].length - 1}{" "}
                            </div>
                          ) : (
                            <span>
                              {name}
                              {index < taskAccomplices[index].length - 1 &&
                                ", "}
                            </span>
                          )}
                        </span>
                      ))}
                    </td>
                    <td
                      className={classNames(
                        index !== tasksData.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      )}
                    >
                      {/* get ydelse from title */}
                      {serviceNames[index]}
                    </td>
                    <td
                      className={classNames(
                        index !== tasksData.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => handleClick(index)}
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
