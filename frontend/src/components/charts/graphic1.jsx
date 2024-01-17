import React from 'react';

const GraphicOne = () => {
  return (
    <div className="col-span-80 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-20 shadow-default dark:border-meta-9 dark:bg-white sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex flex-wrap w-full gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="flex items-center justify-center w-full h-4 mt-1 mr-2 border rounded-full max-w-4 border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="flex items-center justify-center w-full h-4 mt-1 mr-2 border rounded-full max-w-4 border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full max-w-45">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="px-3 py-1 text-xs font-medium text-black rounded bg-custom shadow-card hover:bg-black dark:text-white dark:hover:bg-boxdr">
              Day
            </button>
            <button className="px-3 py-1 text-xs font-medium text-black rounded bg-custom shadow-card hover:bg-black dark:text-white dark:hover:bg-boxdr">
              Week
            </button>
            <button className="px-3 py-1 text-xs font-medium text-black rounded bg-custom hover:shadow-card hover:bg-black dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>
      <div>
        <div id="chartOne" className="-ml-5"></div>
      </div>
    </div>
  );
}

export default GraphicOne;
