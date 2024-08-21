
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import SummaryApi from "../common"; // Adjust the import path as necessary
// import {jwtDecode} from "jwt-decode"; // Default import for jwtDecode

// const AssignedTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [tokenValid, setTokenValid] = useState(true); // State to handle token validity
//   const token = localStorage.getItem("jwtToken");
//   console.log(token)

//   useEffect(() => {
//     if (!token || typeof token !== "string") {

//       toast.error("Invalid or missing token");
//       setTokenValid(false); // Set token validity to false
//       setLoading(false); // Stop loading
//       return;
//     }
    

//     const fetchTasks = async () => {
//       try {
//         const decoded = jwtDecode(token); // Decode token
//         const userId = decoded?._id; // Adjust according to your token's structure

//         if (!userId) {
//           throw new Error("Invalid token payload");
//         }

//         const response = await fetch(
//           `${SummaryApi.allTasks.url}?traderId=${userId}`,
//           {
//             method: SummaryApi.allTasks.method,
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//             credentials: "include",
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         if (data.success) {
//           setTasks(data.data);
//         } else {
//           toast.error(data.message || "Failed to fetch tasks");
//           setError(data.message || "Failed to fetch tasks");
//         }
//       } catch (error) {
//         setError(error.message || "Error fetching tasks");
//         toast.error(error.message || "Error fetching tasks");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTasks(); // Call async function inside useEffect
//   }, [token]); // Dependency array includes token

//   if (!tokenValid) {
//     return <div>Invalid or missing token.</div>; // Provide fallback UI
//   }

//   if (loading) {
//     return <div>Loading...</div>; // Provide a loading state
//   }

//   return (
//     <div>
//       <h1>Assigned Tasks</h1>
//       {error && <p>{error}</p>} {/* Display error if any */}
//       {tasks.length > 0 ? (
//         tasks.map((task) => (
//           <div key={task._id}>
//             <h2>{task.productName}</h2>
//             <p>{task.remarks}</p>
//             <p>{task.dueDate}</p>
//             <p>{task.status}</p>
//           </div>
//         ))
//       ) : (
//         <p>No tasks assigned yet.</p>
//       )}
//     </div>
//   );
// };

// export default AssignedTasks;
// import React, { useState, useEffect } from "react";
// import SummaryApi from "../common"; // Ensure this points to your API definitions
// import { useSnackbar } from "notistack";

// const AssignedTasks = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch(SummaryApi.current_user.url, {
//           method: SummaryApi.current_user.method,
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await response.json();

//         if (data.success) {
//           setCurrentUser(data.data);
//           if (data.data.email) {
//             fetchAssignedTasks(data.data.email);
//           }
//         } else {
//           console.error("Failed to fetch user details:", data.message);
//           enqueueSnackbar("Failed to fetch user details.", {
//             variant: "error",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         enqueueSnackbar("An error occurred while fetching user details.", {
//           variant: "error",
//         });
//       }
//     };

//     const fetchAssignedTasks = async (userEmail) => {
//       if (!SummaryApi.allTasks || !SummaryApi.allTasks.url) {
//         console.error("API configuration for getTasks is missing.");
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${SummaryApi.allTasks.url}?email=${encodeURIComponent(
//             userEmail
//           )}`,
//           // SummaryApi.allTasks.url,
//           {
//             method: SummaryApi.allTasks.method,
//             headers: {
//               "Content-Type": "application/json",
              
//             },
//           }
//         );

//         if (!response.ok) {
         
//           throw new Error("HTTP error! Status: ${response.status}");
//         }

//         const data = await response.json();
// console.log("API Response Data:", data);
// console.log("Encoded Email:", encodeURIComponent(userEmail));

//         if (data.success) {
//           const tasks = data.tasks || [];
//           const filtered = tasks.filter(
//             (task) => task.traderEmail === userEmail
//           );
//           setFilteredTasks(filtered);
//         } else {
//           console.error("Failed to fetch assigned tasks:", data.message);
//           enqueueSnackbar("Failed to fetch assigned tasks.", {
//             variant: "error",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching assigned tasks:", error);
//         enqueueSnackbar("An error occurred while fetching assigned tasks.", {
//           variant: "error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrentUser();
//   }, [enqueueSnackbar]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };
  
// // const handleStatusChange = async (taskId, userEmail) => {
// //   try {
// //     const response = await fetch(
// //       `${SummaryApi.deleteTaskAndProduct.url}/${taskId}/${encodeURIComponent(
// //         userEmail
// //       )}`,
// //       {
// //         method: SummaryApi.deleteTaskAndProduct.method,
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       }
// //     );

// //     if (!response.ok) {
// //       throw new Error("HTTP error! Status: ${response.status}");
// //     }

// //     setFilteredTasks((prevTasks) =>
// //       prevTasks.filter((task) => task._id !== taskId)
// //     );

// //     enqueueSnackbar("Task and product deleted successfully.", {
// //       variant: "success",
// //     });
// //   } catch (error) {
// //     console.error("Error deleting task and product:", error);
// //     enqueueSnackbar("An error occurred while deleting the task and product.", {
// //       variant: "error",
// //     });
// //   }
// // };


//   if (loading) {
//     return <div className="p-6 text-center">Loading...</div>;
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto mt-5 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Trader Account</h1>
//       {currentUser && (
//         <div>
//           <h2 className="text-xl font-semibold mb-7 text-gray-700">
//             My Email: <span className="text-gray-500">{currentUser.email}</span>
//           </h2>
//           <h1 className="text-lg font-bold mb-6 text-gray-700">
//             Assigned Tasks:
//           </h1>
//           {filteredTasks.length > 0 ? (
//             <ul className="space-y-4">
//               {filteredTasks.map((task) => (
//                 <li
//                   key={task._id}
//                   className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
//                 >
//                   <p className="mb-2 text-gray-800">
//                     <strong>Username:</strong> {task.username}
//                   </p>
//                   <p className="mb-2 text-gray-800">
//                     <strong>User Email:</strong> {task.userEmail}
//                   </p>
//                   <p className="mb-2 text-gray-800">
//                     <strong>User Mobile:</strong> {task.userMobile}
//                   </p>
//                   <p className="mb-2 text-gray-800">
//                     <strong>Location:</strong> {task.location}
//                   </p>
//                   <p className="mb-2 text-gray-800">
//                     <strong>Due Date:</strong> {formatDate(task.dueDate)}
//                   </p>
//                   {/* <button
//                     className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
//                     onClick={() => handleStatusChange(task._id, task.userEmail)}
//                   >
//                     PENDING
//                   </button> */}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No tasks assigned.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignedTasks;
//working code
// import React, { useState, useEffect } from "react";
// import SummaryApi from "../common"; // Ensure this points to your API definitions
// import { useSnackbar } from "notistack";

// const AssignedTasks = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const response = await fetch(SummaryApi.current_user.url, {
//           method: SummaryApi.current_user.method,
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const data = await response.json();

//         if (data.success) {
//           setCurrentUser(data.data);
//           if (data.data.email) {
//             fetchAssignedTasks(data.data.email);
//           }
//         } else {
//           console.error("Failed to fetch user details:", data.message);
//           enqueueSnackbar("Failed to fetch user details.", {
//             variant: "error",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         enqueueSnackbar("An error occurred while fetching user details.", {
//           variant: "error",
//         });
//       }
//     };

//     const fetchAssignedTasks = async (userEmail) => {
//       if (!SummaryApi.allTasks || !SummaryApi.allTasks.url) {
//         console.error("API configuration for getTasks is missing.");
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${SummaryApi.allTasks.url}?email=${encodeURIComponent(userEmail)}`,
//           {
//             method: SummaryApi.allTasks.method,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("API Response Data:", data);
//         console.log("Encoded Email:", encodeURIComponent(userEmail));

//         if (data.success) {
//           const tasks = data.tasks || [];
//           const filtered = tasks.filter(
//             (task) => task.traderEmail === userEmail
//           );
//           setFilteredTasks(filtered);
//         } else {
//           console.error("Failed to fetch assigned tasks:", data.message);
//           enqueueSnackbar("Failed to fetch assigned tasks.", {
//             variant: "error",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching assigned tasks:", error);
//         enqueueSnackbar("An error occurred while fetching assigned tasks.", {
//           variant: "error",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrentUser();
//   }, [enqueueSnackbar]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const handleDelete = async (taskId) => {
//     try {
//       const response = await fetch(
//         // `${SummaryApi.deleteTaskAndProduct.url}/${taskId}`
//         `${SummaryApi.deleteTaskAndProduct.url}/${taskId}/${encodeURIComponent(
//         userEmail
//        )}`,
//         {
//           method: SummaryApi.deleteTaskAndProduct.method,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.success) {
//         setFilteredTasks((prevTasks) =>
//           prevTasks.filter((task) => task._id !== taskId)
//         );
//         enqueueSnackbar("Task deleted successfully.", {
//           variant: "success",
//         });
//       } else {
//         console.error("Failed to delete task:", data.message);
//         enqueueSnackbar("Failed to delete task.", {
//           variant: "error",
//         });
//       }
//     } catch (error) {
//       console.error("Error deleting task:", error);
//       enqueueSnackbar("An error occurred while deleting the task.", {
//         variant: "error",
//       });
//     }
//   };

//   if (loading) {
//     return <div className="p-6 text-center">Loading...</div>;
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto mt-5 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Trader Account</h1>
//       {currentUser && (
//         <div>
//           <h2 className="text-xl font-semibold mb-7 text-gray-700">
//             My Email: <span className="text-gray-500">{currentUser.email}</span>
//           </h2>
//           <h1 className="text-lg font-bold mb-6 text-gray-700">
//             Assigned Tasks:
//           </h1>
//           {filteredTasks.length > 0 ? (
//             <ul className="space-y-4">
//               {filteredTasks.map((task) => (
//                 <li
//                   key={task._id}
//                   className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
//                 >
//                   <p className="mb-2 text-gray-800">
//                     <strong>Username:</strong> {task.username}
//                   </p>
//                   <p className="mb-2 text-gray-800">
//                     <strong>User Email:</strong> {task.userEmail}
//                   </p>
//                   <p className="mb-2 text-gray-800">
//                     <strong>User Mobile:</strong> {task.userMobile}
//                   </p>
//                   <p className="mb-2 text-gray-800">
//                     <strong>Location:</strong> {task.location}
//                   </p>
//                   <p className="mb-2 text-gray-800">
//                     <strong>Due Date:</strong> {formatDate(task.dueDate)}
//                   </p>
//                   <button
//                     className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
//                     onClick={() => handleDelete(task._id)}
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No tasks assigned.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignedTasks;
import React, { useState, useEffect } from "react";
import SummaryApi from "../common"; // Ensure this points to your API definitions
import { useSnackbar } from "notistack";
// import Context from "../context";
const AssignedTasks = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentUser, setCurrentUser] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.success) {
          setCurrentUser(data.data);
          if (data.data.email) {
            fetchAssignedTasks(data.data.email);
          }
        } else {
          console.error("Failed to fetch user details:", data.message);
          enqueueSnackbar("Failed to fetch user details.", {
            variant: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        enqueueSnackbar("An error occurred while fetching user details.", {
          variant: "error",
        });
      }
    };

    const fetchAssignedTasks = async (userEmail) => {
      if (!SummaryApi.allTasks || !SummaryApi.allTasks.url) {
        console.error("API configuration for getTasks is missing.");
        return;
      }

      try {
        const response = await fetch(
          `${SummaryApi.allTasks.url}?email=${encodeURIComponent(userEmail)}`,
          {
            method: SummaryApi.allTasks.method,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);
        console.log("Encoded Email:", encodeURIComponent(userEmail));

        if (data.success) {
          const tasks = data.tasks || [];
          const filtered = tasks.filter(
            (task) => task.traderEmail === userEmail
          );
          setFilteredTasks(filtered);
        } else {
          console.error("Failed to fetch assigned tasks:", data.message);
          enqueueSnackbar("Failed to fetch assigned tasks.", {
            variant: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching assigned tasks:", error);
        enqueueSnackbar("An error occurred while fetching assigned tasks.", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [enqueueSnackbar]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleDelete = async (taskId) => {
    if (!currentUser || !currentUser.email) {
      enqueueSnackbar("User email is missing.", {
        variant: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `${SummaryApi.deleteTaskAndProduct.url}/${taskId}/${encodeURIComponent(
          currentUser.email
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Context.updatePoints(50);
        setFilteredTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
        enqueueSnackbar("Task deleted successfully.", {
          variant: "success",
        });
      } else {
        console.error("Failed to delete task:", data.message);
        enqueueSnackbar("Failed to delete task.", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      enqueueSnackbar("An error occurred while deleting the task.", {
        variant: "error",
      });
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mt-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Trader Account</h1>
      {currentUser && (
        <div>
          <h2 className="text-xl font-semibold mb-7 text-gray-700">
            My Email: <span className="text-gray-500">{currentUser.email}</span>
          </h2>
          <h1 className="text-lg font-bold mb-6 text-gray-700">
            Assigned Tasks:
          </h1>
          {filteredTasks.length > 0 ? (
            <ul className="space-y-4">
              {filteredTasks.map((task) => (
                <li
                  key={task._id}
                  className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm"
                >
                  <p className="mb-2 text-gray-800">
                    <strong>Username:</strong> {task.username}
                  </p>
                  <p className="mb-2 text-gray-800">
                    <strong>User Email:</strong> {task.userEmail}
                  </p>
                  <p className="mb-2 text-gray-800">
                    <strong>User Mobile:</strong> {task.phoneNumber}
                  </p>
                  <p className="mb-2 text-gray-800">
                    <strong>Location:</strong> {task.location}
                  </p>
                  <p className="mb-2 text-gray-800">
                    <strong>Due Date:</strong> {formatDate(task.dueDate)}
                  </p>
                  <button
                    className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tasks assigned.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignedTasks;
