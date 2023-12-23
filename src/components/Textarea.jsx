export default function Textarea({ description }) {
  return (
    <>
      {description.length ? (
        <>
          <label
            htmlFor="comment"
            className="text-gray-500 text-sm font-medium"
          >
            Beskrivelse
          </label>
          <div className="mt-2">
            <textarea
              rows={4}
              name="comment"
              id="comment"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-4"
              defaultValue={description}
              readOnly={true}
            />
          </div>
        </>
      ) : (
        <>
          <label
            htmlFor="comment"
            className="text-gray-500 text-sm font-medium"
          >
            Beskrivelse
          </label>
          <div className="mt-2">
            <textarea
              rows={4}
              name="comment"
              id="comment"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </>
      )}
    </>
  );
}
