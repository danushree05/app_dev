
// import React, { useEffect, useState } from "react";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";
// import moment from "moment";

// const AllEwasteUploads = () => {
//   const [ewasteUploads, setEwasteUploads] = useState([]);

//   const fetchEwasteUploads = async () => {
//     try {
//       const response = await fetch(SummaryApi.allEwasteUploads.url, {
//         method: SummaryApi.allEwasteUploads.method,
//         credentials: "include",
//       });

//       const dataResponse = await response.json();

//       if (dataResponse.success) {
//         setEwasteUploads(dataResponse.data);
//       } else if (dataResponse.error) {
//         toast.error(dataResponse.message);
//       }
//     } catch (error) {
//       toast.error("Error fetching e-waste uploads.");
//     }
//   };

//   useEffect(() => {
//     fetchEwasteUploads();
//   }, []);

//   return (
//     <div className="bg-white pb-4 p-6">
//       <table className="w-full userTable">
//         <thead>
//           <tr className="bg-black text-white">
//             <th>Sr.</th>
//             <th>Username</th>
//             <th>Location</th>
//             <th>Product Name</th>
//             <th>Category</th>
//             <th>Uploaded At</th>
//             <th>Status</th> {/* Add Status column */}
//             <th>Remarks</th> {/* Add Remarks column */}
//           </tr>
//         </thead>
//         <tbody className="p-50">
//           {ewasteUploads.map((upload, index) => (
//             <tr  key={upload._id}>
//               <td>{index + 1}</td>
//               <td>{upload.username}</td>
//               <td>{upload.location}</td>
//               <td>{upload.productName}</td>
//               <td>{upload.category}</td>
//               <td>{moment(upload.createdAt).format("LL")}</td>
//               <td>{upload.status || "Pending"}</td> {/* Display Status */}
//               <td>{upload.remarks || "No remarks"}</td> {/* Display Remarks */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AllEwasteUploads;
import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";

const AllEwasteUploads = () => {
  const [ewasteUploads, setEwasteUploads] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const fetchEwasteUploads = async () => {
    try {
      const response = await fetch(SummaryApi.allEwasteUploads.url, {
        method: SummaryApi.allEwasteUploads.method,
        credentials: "include",
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        setEwasteUploads(dataResponse.data);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Error fetching e-waste uploads.");
    }
  };

  useEffect(() => {
    fetchEwasteUploads();
  }, []);

  // Group e-waste uploads by location (state)
  const groupedEwasteUploads = ewasteUploads.reduce((groups, upload) => {
    const { location } = upload;
    if (!groups[location]) {
      groups[location] = [];
    }
    groups[location].push(upload);
    return groups;
  }, {});

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...ewasteUploads].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setEwasteUploads(sortedData);
  };

  return (
    <div className="bg-white py-2 px-4">
      <h2 className="font-bold text-lg">All E-Waste Uploads</h2>

      {/* Display E-Waste Uploads by Location */}
      <div className="overflow-x-auto mt-4">
        {Object.keys(groupedEwasteUploads).map((location) => (
          <div key={location} className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{location}</h3>
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    onClick={() => sortData("index")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sr.
                  </th>
                  <th
                    onClick={() => sortData("username")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    onClick={() => sortData("useremail")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Useremail
                  </th>
                  <th
                    onClick={() => sortData("location")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    onClick={() => sortData("phoneNumber")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone Number
                  </th>
                  <th
                    onClick={() => sortData("productName")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product Name
                  </th>
                  <th
                    onClick={() => sortData("category")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    onClick={() => sortData("createdAt")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Uploaded At
                  </th>
                  <th
                    onClick={() => sortData("status")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    onClick={() => sortData("remarks")}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupedEwasteUploads[location].map((upload, index) => (
                  <tr key={upload._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {upload.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {upload.userEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {upload.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {upload.phoneNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {upload.productName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {upload.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {moment(upload.createdAt).format("LL")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {upload.status || "Pending"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {upload.remarks || "No remarks"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEwasteUploads;
