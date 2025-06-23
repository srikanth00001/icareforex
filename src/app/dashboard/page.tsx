"use client";

import React, { useState, useEffect } from "react";
import ClientLayout from "../components/Layout/Layout";
import dynamic from "next/dynamic";
import ReactCountryFlag from "react-country-flag";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Transaction data (no change)
const transactionData = [
  { id: "1", description: "Receive money from Annette Black", date: "16 Jun 2025 9:10 am", amount: "$68.71", status: "Progress" },
  { id: "2", description: "Payment for Courtney Henry", date: "15 Jun 2025 8:10 am", amount: "$85.21", status: "Completed" },
  { id: "3", description: "Payment for Theresa Webb", date: "14 Jun 2025 7:10 am", amount: "$52.17", status: "Failed" },
  { id: "4", description: "Payment for Fast food", date: "13 Jun 2025 6:10 am", amount: "$25.18", status: "Completed" },
  { id: "5", description: "Payment for Fitness", date: "12 Jun 2025 5:10 am", amount: "$43.84", status: "Progress" },
];

const DashboardPage = () => {
  const mensCount = 1000;
  const womensCount = 1162;
  const kidsCount = 581;

  const totalPeople = mensCount + womensCount + kidsCount;

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const chartData = {
    series: [mensCount, womensCount, kidsCount].map(
      (count) => (count / totalPeople) * 100
    ),
    options: {
      chart: {
        type: "radialBar",
        height: 300,
        background: "transparent",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "50%",
            background: "transparent",
          },
          track: {
            background: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            strokeWidth: "50%",
          },
          dataLabels: {
            name: { show: false },
            value: {
              show: true,
              fontSize: "14px",
              color: isDarkMode ? "#e2e8f0" : "#374151",
              offsetY: 6,
              formatter: (val) => `${Number(val).toFixed(1)}%`,
            },
            total: {
              show: true,
              label: "Total",
              formatter: () => totalPeople.toLocaleString(),
              color: isDarkMode ? "#e2e8f0" : "#374151",
              fontSize: "18px",
              fontWeight: 1200,
              offsetY: 0,
            },
          },
        },
      },
      labels: ["Mens", "Womens", "Kids"],
      colors: ["rgba(0, 167, 111, 0.8)", "rgba(255, 171, 0, 0.8)", "rgba(255, 86, 48, 0.8)"],
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          gradientToColors: ["#00a76f", "#ffab00", "#ff5630"],
          stops: [0, 100],
        },
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        fontWeight: 500,
        labels: { colors: isDarkMode ? "#e2e8f0" : "#374151" },
        markers: { width: 10, height: 10 },
      },
      theme: { mode: "light" },
      responsive: [
        {
          breakpoint: 768,
          options: { chart: { height: 250 }, legend: { position: "bottom" } },
        },
      ],
    },
  };

  // Table data for Best Salesman
  const tableData = [
    { id: "1", seller: "Jayvion Simon", email: "jayvion@email.com", product: "CAP", country: "Germany", total: "$83.74", rank: "Top 1", status: "Active" },
    { id: "2", seller: "Lucian O'Brien", email: "lucian@email.com", product: "Branded shoes", country: "UK", total: "$97.14", rank: "Top 2", status: "Active" },
    { id: "3", seller: "Deja Brady", email: "deja@email.com", product: "Headphone", country: "France", total: "$68.71", rank: "Top 3", status: "Active" },
    { id: "4", seller: "Harrison Stein", email: "harrison@email.com", product: "Cell phone", country: "South Korea", total: "$85.21", rank: "Top 4", status: "Active" },
    { id: "5", seller: "Reece Chung", email: "reece@email.com", product: "Earrings", country: "USA", total: "$52.17", rank: "Top 5", status: "Active" },
  ];

  // Helper function to get ISO 2-letter country code
  const getCountryCode = (countryName) => {
    switch (countryName) {
      case "Germany": return "DE";
      case "UK": return "GB";
      case "France": return "FR";
      case "South Korea": return "KR";
      case "USA": return "US";
      default: return ""; // Fallback for unsupported countries
    }
  };

  return (
    <ClientLayout>
      <div className="mt-10 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold flex items-center">
              Welcome back, Jaydon Frankie 👋
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              If you are going to use a passage of Lorem Ipsum, you need to be sure
              there isn't anything.
            </p>
            <button className="mt-4 bg-gradient-to-r from-green-500 to-green-600 dark:from-blue-600 dark:to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 dark:hover:from-blue-700 dark:hover:to-blue-600">
              Go now
            </button>
          </div>

          {/* Featured App Section */}
          <div className="bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0 sm:mr-4">
                <span className="text-green-500 dark:text-green-300 text-sm uppercase">
                  Featured App
                </span>
                <h3 className="text-xl font-semibold mt-2">
                  The Rise of Remote Work: Benefits, Ch...
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  The aroma of freshly brewed coffee filled the air, awak...
                </p>
              </div>
              <div className="w-24 h-24 bg-gray-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-500 dark:text-gray-400">Icon</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Total Active Users
            </h3>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                18,765
              </span>
              <span className="ml-2 text-green-500 dark:text-green-400 flex items-center text-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                +2.6% last 7 days
              </span>
            </div>
            <div className="mt-4 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                [Graph Placeholder]
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Total Installed
            </h3>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                4,876
              </span>
              <span className="ml-2 text-green-500 dark:text-green-400 flex items-center text-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                +0.2% last 7 days
              </span>
            </div>
            <div className="mt-4 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                [Graph Placeholder]
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Downloads
            </h3>
            <div className="flex items-center mt-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                678
              </span>
              <span className="ml-2 text-red-500 dark:text-red-400 flex items-center text-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                -0.1% last 7 days
              </span>
            </div>
            <div className="mt-4 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">
                [Graph Placeholder]
              </span>
            </div>
          </div>
        </div>

        {/* Downloads by Operating System Section */}
        <div className="bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-950 p-6 rounded-lg shadow-md mb-6"> {/* Added mb-6 for spacing */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2 sm:mb-0">
              Current Downloads by Operating System
            </h3>
            <div className="flex items-center">
              <span className="text-green-500 dark:text-green-400 mr-2 text-sm">
                +43% than last year
              </span>
              <select className="border rounded-lg p-1 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-sm">
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sale by Gender and Best Salesman Section (Side-by-side on large screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"> {/* New grid container */}
          {/* Sale by Gender Section */}
          <div className="bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-950 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Sale by Gender
            </h3>
            <div className="mt-4 flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-1/2">
                <Chart
                  options={chartData.options}
                  series={chartData.series}
                  type="radialBar"
                  height={300}
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col space-y-4 mt-4 md:mt-0 md:pl-6">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2 bg-gray-400"></span>
                  <span className="text-gray-700 dark:text-gray-200 font-bold text-sm sm:text-base">
                    Total: {totalPeople.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: "rgba(0, 167, 111, 0.8)" }}
                  ></span>
                  <span className="text-green-600 dark:text-green-400 font-medium text-sm sm:text-base">
                    Mens: {mensCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: "rgba(255, 171, 0, 0.8)" }}
                  ></span>
                  <span className="text-yellow-600 dark:text-yellow-400 font-medium text-sm sm:text-base">
                    Womens: {womensCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: "rgba(255, 86, 48, 0.8)" }}
                  ></span>
                  <span className="text-red-600 dark:text-red-400 font-medium text-sm sm:text-base">
                    Kids: {kidsCount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Best Salesman Table Section */}
          <div className="bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-950 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Best Salesman</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Seller</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Country</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {tableData.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          <img
                            src={`https://i.pravatar.cc/40?img=${row.id}`}
                            alt={row.seller}
                            className="h-8 w-8 rounded-full flex-shrink-0"
                          />
                          <span className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>{row.seller}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{row.product}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          {getCountryCode(row.country) && (
                            <ReactCountryFlag
                              countryCode={getCountryCode(row.country)}
                              svg
                              style={{
                                width: '1.5em',
                                height: '1.5em',
                                marginRight: '8px'
                              }}
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{row.total}</td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.rank === "Top 1" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                          row.rank === "Top 2" ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" :
                          row.rank === "Top 3" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" :
                          row.rank === "Top 4" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" :
                          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {row.rank}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="mt-6 bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-950 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Recent transitions</h3>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {transactionData.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{transaction.description}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{transaction.date}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{transaction.amount}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === "Progress" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                        transaction.status === "Completed" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">View all</a>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default DashboardPage;