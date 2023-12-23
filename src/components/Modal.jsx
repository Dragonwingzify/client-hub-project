import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Textarea from "./Textarea";
import Feeds from "./Feeds";
import VerticalNavigation from "./VerticalNavigation";
import xMark from "../assets/logos/xmark.svg";
import axios from "axios";

export default function Modal({
  modalTask,
  closeModal,
  tasksData,
  taskAccomplices,
  serviceNames,
  selectedService,
}) {
  // modalTask
  const [open, setOpen] = useState(true);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    const apiUrl = `https://crm.conversio.dk/rest/130/n2g9z5nu82y1uvdz/tasks.task.get?taskId=${modalTask.id}`;
    axios
      .get(apiUrl)
      .then((response) => {
        // Check if the response contains the task and its description
        const task = response.data?.result;
        if (response.data.result.task.description) {
          setDescription(response.data.result.task.description);
        } else {
          console.log("Task or description not found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching tasksData:", error);
      });
  }, []);

  function handleClick() {
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal} static>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-50"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-50"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleClick}
          />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-50"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-50"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="mx-auto rounded-lg sm:max-h-[600px] bg-white pb-4 pt-5 text-left shadow-xl transition-all sm:w-full max-w-8xl overflow-y-scroll px-6 sm:px-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="justify-between flex items-center">
                  <div className="text-gray-500 text-sm font-medium ">
                    Opgave
                  </div>
                  <button onClick={closeModal}>
                    <img
                      src={xMark}
                      alt="close window"
                      className="border border-gray-200 p-2.5 rounded-md"
                    />
                  </button>
                </div>
                <Dialog.Title as="h3" className="text-gray-800 text-base mt-2">
                  {modalTask.title.split(":")[1]}
                </Dialog.Title>
                <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-12 gap-16">
                  <div className="col-span-full sm:col-span-9">
                    <div>
                      <Textarea
                        description={description}
                        taskID={modalTask.id}
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <Feeds
                        tasksData={tasksData}
                        serviceNames={serviceNames}
                        selectedService={selectedService}
                        selectedID={modalTask.id}
                      />
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-3">
                    <VerticalNavigation
                      tasksData={tasksData}
                      taskAccomplices={taskAccomplices}
                      serviceNames={serviceNames}
                      selectedService={selectedService}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
