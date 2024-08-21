// src/pages/Dashboard.js

import React from "react";
import { Line, Bar, Pie, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadarController,
  RadialLinearScale,
} from "chart.js";
import { useSnackbar } from "notistack";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadarController,
  RadialLinearScale
);

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  // Example data for charts
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "E-Waste Collection Trends",
        data: [50, 75, 65, 90, 85, 110, 130],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "E-Waste Items Collected",
        data: [10, 20, 15, 30, 25, 40, 45],
        backgroundColor: "rgba(54,162,235,0.6)",
      },
      {
        label: "E-Waste Items Pending",
        data: [5, 10, 8, 12, 15, 20, 25],
        backgroundColor: "rgba(255,99,132,0.6)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Recycled", "Pending", "In Process"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const radarChartData = {
    labels: [
      "Efficiency",
      "Collection Reach",
      "Recycling Rate",
      "Customer Satisfaction",
      "Innovation",
    ],
    datasets: [
      {
        label: "Service Performance",
        data: [4, 5, 4, 4, 3],
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        E-Waste Trading Dashboard
      </h1>

      {/* Line Chart Section */}
      <div className="mb-8">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            E-Waste Collection Trends
          </h2>
          <div className="h-80">
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
                    },
                  },
                },
                scales: {
                  x: { grid: { display: false }, ticks: { color: "#888" } },
                  y: { grid: { color: "#e0e0e0" }, ticks: { color: "#888" } },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="mb-8">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            E-Waste Collection Overview
          </h2>
          <div className="h-80">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
                    },
                  },
                },
                scales: {
                  x: { grid: { display: false }, ticks: { color: "#888" } },
                  y: { grid: { color: "#e0e0e0" }, ticks: { color: "#888" } },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="mb-8">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            E-Waste Status Distribution
          </h2>
          <div className="h-80">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="mb-8">
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Service Performance Metrics
          </h2>
          <div className="h-80">
            <Radar
              data={radarChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
                    },
                  },
                },
                scales: {
                  r: {
                    grid: { color: "#e0e0e0" },
                    angleLines: { color: "#e0e0e0" },
                    ticks: { color: "#888" },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Example Button */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md"
        onClick={() =>
          enqueueSnackbar("Action performed successfully!", {
            variant: "success",
          })
        }
      >
        Perform Action
      </button>
    </div>
  );
};

export default Dashboard;
