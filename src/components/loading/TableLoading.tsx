export default function TableLoading() {
  return (
    <div
      role="status"
      className="my-3 border border-gray-200 dividdarke-y divide-gray-200 rounded-sm shadow-sm animate-pulse :divide-gray-700 md:p-6 "
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 bg-gray-300 rounded-full  w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
