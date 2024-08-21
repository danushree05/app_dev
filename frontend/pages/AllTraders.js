
// import React, { useState, useEffect } from "react";
// import TraderForm from "./TraderForm";
// import { toast } from "react-toastify";
// import SummaryApi from "../common";
// import AssignModal from "./AssignModal"; // Import the modal

// const AllTraders = () => {
//   const [openUploadTrader, setOpenUploadTrader] = useState(false);
//   const [traders, setTraders] = useState([]);
//   const [openAssignModal, setOpenAssignModal] = useState(false);
//   const [selectedTrader, setSelectedTrader] = useState(null);
//   const [users, setUsers] = useState([]);

//   const fetchTraders = async () => {
//     try {
//       const response = await fetch(SummaryApi.allTraderss.url, {
//         method: SummaryApi.allTraderss.method,
//         credentials: "include",
//       });
//       const data = await response.json();
//       if (data.success) {
//         setTraders(data.data);
//       } else {
//         console.error("Failed to fetch traders:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching traders:", error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(SummaryApi.allEwasteUploads.url, {
//         method: SummaryApi.allEwasteUploads.method,
//         credentials: "include",
//       });
//       const data = await response.json();
//       if (data.success) {
//         setUsers(data.data);
//       } else {
//         console.error("Failed to fetch users:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTraders();
//     fetchUsers();
//   }, []);

//   // Group traders by location (state)
//   const groupedTraders = traders.reduce((groups, trader) => {
//     const { location } = trader;
//     if (!groups[location]) {
//       groups[location] = [];
//     }
//     groups[location].push(trader);
//     return groups;
//   }, {});

//   const handleAssign = (traderId) => {
//     setSelectedTrader(traderId);
//     setOpenAssignModal(true);
//   };

//   const handleAssignmentSubmit = async (traderId, userId, status, remarks) => {
//     try {
//       const response = await fetch(SummaryApi.assignTraders.url, {
//         method: SummaryApi.assignTraders.method,
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ traderId, userId, status, remarks }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         toast.success("Assignment successful.");
//         fetchUsers(); // Refresh the user data
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Error assigning user.");
//     }
//   };

//   return (
//     <div>
//       <div className="bg-white py-2 px-4 flex justify-between items-center">
//         <h2 className="font-bold text-lg">All Traders</h2>
//         <button
//           className="border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white transition-all py-1 px-3 rounded-full"
//           onClick={() => setOpenUploadTrader(true)}
//         >
//           Upload Trader
//         </button>
//       </div>

//       {/* Display Traders by Location */}
//       <div className="overflow-x-auto mt-4">
//         {Object.keys(groupedTraders).map((location) => (
//           <div key={location} className="mb-8">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">{location}</h3>
//             <table className="min-w-full divide-y divide-gray-200 bg-white">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Email
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {groupedTraders[location].map((trader) => (
//                   <tr key={trader._id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {trader.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {trader.email}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => handleAssign(trader._id)}
//                         className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//                       >
//                         Assign
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>

//       {/* Upload Trader Form */}
//       {openUploadTrader && (
//         <TraderForm
//           onClose={() => setOpenUploadTrader(false)}
//           fetchTraders={fetchTraders}
//         />
//       )}

//       {/* Assign Modal */}
//       {openAssignModal && (
//         <AssignModal
//           users={users}
//           traderId={selectedTrader}
//           onClose={() => setOpenAssignModal(false)}
//           onSubmit={handleAssignmentSubmit}
//         />
//       )}
//     </div>
//   );
// };

// export default AllTraders;
import React, { useState, useEffect } from "react";
import TraderForm from "./TraderForm";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import AssignModal from "./AssignModal"; // Import the modal

const AllTraders = () => {
  const [openUploadTrader, setOpenUploadTrader] = useState(false);
  const [traders, setTraders] = useState([]);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const fetchTraders = async () => {
    try {
      const response = await fetch(SummaryApi.allTraderss.url, {
        method: SummaryApi.allTraderss.method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setTraders(data.data);
      } else {
        console.error("Failed to fetch traders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching traders:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(SummaryApi.allEwasteUploads.url, {
        method: SummaryApi.allEwasteUploads.method,
        credentials: "include",
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        console.error("Failed to fetch users:", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTraders();
    fetchUsers();
  }, []);

  // Group traders by location (state)
  const groupedTraders = traders.reduce((groups, trader) => {
    const { location } = trader;
    if (!groups[location]) {
      groups[location] = [];
    }
    groups[location].push(trader);
    return groups;
  }, {});

  const handleAssign = (trader) => {
    setSelectedTrader(trader._id);
    setSelectedLocation(trader.location.toLowerCase()); // Save the location for filtering
    setOpenAssignModal(true);
  };

  const handleAssignmentSubmit = async (traderId, userId, status, remarks) => {
    try {
      const response = await fetch(SummaryApi.assignTraders.url, {
        method: SummaryApi.assignTraders.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ traderId, userId, status, remarks }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Assignment successful.");
        fetchUsers(); // Refresh the user data
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error assigning user.");
    }
  };

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Traders</h2>
        <button
          className="border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenUploadTrader(true)}
        >
          Upload Trader
        </button>
      </div>

      {/* Display Traders by Location */}
      <div className="overflow-x-auto mt-4">
        {Object.keys(groupedTraders).map((location) => (
          <div key={location} className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{location}</h3>
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupedTraders[location].map((trader) => (
                  <tr key={trader._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {trader.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {trader.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAssign(trader)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Upload Trader Form */}
      {openUploadTrader && (
        <TraderForm
          onClose={() => setOpenUploadTrader(false)}
          fetchTraders={fetchTraders}
        />
      )}

      {/* Assign Modal */}
      {openAssignModal && (
        <AssignModal
          users={users.filter(
            (user) => user.location.toLowerCase() === selectedLocation
          )} // Filter users by trader's location
          traderId={selectedTrader}
          onClose={() => setOpenAssignModal(false)}
          onSubmit={handleAssignmentSubmit}
        />
      )}
    </div>
  );
};

export default AllTraders;
