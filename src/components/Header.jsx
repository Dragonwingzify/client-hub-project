export default function Header({ title, description }) {
  return (
    <div className="bg-white">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 sm:px-8 py-11">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <div className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            {title}
          </div>
          <p className="mt-6 leading-6 text-slate-500 text-sm font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
