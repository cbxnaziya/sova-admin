import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";

export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
  {/* Metric Item Start */}
  <div className="rounded-2xl border border-gray-200  p-2 bg-white dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-40">
    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-xl dark:bg-gray-800">
      <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
    </div>

    <div className="flex items-center justify-center mt-0">
      <div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total Active Users
        </span>
        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
          3,782
        </h4>
      </div>
      {/* <Badge color="success">
        <ArrowUpIcon />
        11.01%
      </Badge> */}
    </div>
  </div>
  {/* Metric Item Start */}
  <div className="rounded-2xl border border-gray-200  p-2 bg-white dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-40">
    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-xl dark:bg-gray-800">
      <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
    </div>

    <div className="flex items-center justify-center mt-0">
      <div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total Inactive Users
        </span>
        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
          1,782
        </h4>
      </div>
      {/* <Badge color="success">
        <ArrowUpIcon />
        11.01%
      </Badge> */}
    </div>
  </div>
  {/* Metric Item Start */}
  <div className="rounded-2xl border border-gray-200  p-2 bg-white dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-40">
    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-xl dark:bg-gray-800">
    <BoxIconLine className="text-gray-800 dark:text-white/90" />
    </div>

    <div className="flex items-center justify-center mt-0">
      <div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total Designs
        </span>
        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
         82
        </h4>
      </div>
      {/* <Badge color="success">
        <ArrowUpIcon />
        11.01%
      </Badge> */}
    </div>
  </div>
  {/* Metric Item Start */}
  <div className=" rounded-2xl border border-gray-200  p-2 bg-white dark:border-gray-800 dark:bg-white/[0.03] md:p-6 h-40">
    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-xl dark:bg-gray-800">
    <BoxIconLine className="text-gray-800 dark:text-white/90" />
    </div>

    <div className="flex items-center justify-center mt-0">
      <div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Total Orders
        </span>
        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
          2,782
        </h4>
      </div>
      {/* <Badge color="success">
        <ArrowUpIcon />
        11.01%
      </Badge> */}
    </div>
  </div>



{/* 
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
            Total InActive Users
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
           Users
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div> */}
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
