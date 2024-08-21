// import React, { useState, useEffect } from "react";
// import SummaryApi from "../common";
// import { useSnackbar } from "notistack";

// const MyProfile = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [traderDetails, setTraderDetails] = useState(null);
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
//             await fetchAssignedTasks(data.data.email);
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
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchAssignedTasks = async (userEmail) => {
//       try {
//         const response = await fetch(
//           `${SummaryApi.getTaskByUserEmail.url}?email=${encodeURIComponent(
//             userEmail
//           )}`,
//           {
//             method: SummaryApi.getTaskByUserEmail.method,
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("HTTP error! Status: ${response.status}");
//         }

//         const data = await response.json();
//         console.log("Assigned Tasks Data:", data);

//         if (data.success) {
//           const tasks = data.tasks || [];
//           const matchingTask = tasks.find(
//             (task) => task.userEmail === userEmail
//           );

//           if (matchingTask) {
//             const traderEmail = matchingTask.email;
//             console.log("Matched Trader Email:", traderEmail);

//             if (traderEmail) {
//               await fetchTraderDetails(traderEmail);
//             } else {
//               console.warn(
//                 "Trader email is not available in the matched task."
//               );
//             }
//           } else {
//             console.warn("No tasks found for this user.");
//             enqueueSnackbar("No tasks found for this user.", {
//               variant: "info",
//             });
//           }
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
//       }
//     };

//     const fetchTraderDetails = async (traderEmail) => {
//       try {
//         const response = await fetch(SummaryApi.allTraderss.url, {
//           method: SummaryApi.allTraderss.method,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!response.ok) {
//           throw new Error("HTTP error! Status: ${response.status}");
//         }

//         const result = await response.json();
//         console.log("API Response Data:", result); // Log the entire response

//         if (result.success) {
//           const traders = result.data || []; // Correctly access the data field
//           console.log("Fetched Traders:", traders); // Log all fetched traders

//           const matchingTrader = traders.find(
//             (trader) => trader.email.toLowerCase() === traderEmail.toLowerCase()
//           );

//           if (matchingTrader) {
//             setTraderDetails(matchingTrader);
//             console.log("Set Trader Details:", matchingTrader);
//           } else {
//             console.warn("Trader not found for email:", traderEmail);
//             enqueueSnackbar("Trader not found.", { variant: "warning" });
//           }
//         } else {
//           console.error("Failed to fetch trader details:", result.message);
//           enqueueSnackbar("Failed to fetch trader details.", {
//             variant: "error",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching trader details:", error);
//         enqueueSnackbar("An error occurred while fetching trader details.", {
//           variant: "error",
//         });
//       }
//     };

//     fetchCurrentUser();
//   }, [enqueueSnackbar]);

//   if (loading) {
//     return <div className="p-6 text-center">Loading...</div>;
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto mt-5 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">My Profile</h1>
//       {currentUser && (
//         <div>
//           <h2 className="text-xl font-semibold mb-7 text-gray-700">
//             My Email: <span className="text-gray-500">{currentUser.email}</span>
//           </h2>
//           {traderDetails ? (
//             <div>
//               <h1 className="text-lg font-bold mb-6 text-gray-700">
//                 Assigned Trader Details:
//               </h1>
//               <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
//                 <p className="mb-2 text-gray-800">
//                   <strong>Trader Name:</strong> {traderDetails.name}
//                 </p>
//                 <p className="mb-2 text-gray-800">
//                   <strong>Trader Email:</strong> {traderDetails.email}
//                 </p>
//                 <p className="mb-2 text-gray-800">
//                   <strong>Location:</strong> {traderDetails.location}
//                 </p>
//                 {/* <p className="mb-2 text-gray-800">
//                   <strong>Mobile Number:</strong>{" "}
//                   {traderDetails.TraderMobileNumber}
//                 </p> */}
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-500">No trader assigned.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyProfile
import React, { useState, useEffect } from "react";
import SummaryApi from "../common";
import { useSnackbar } from "notistack";

const MyProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentUser, setCurrentUser] = useState(null);
  const [traderDetails, setTraderDetails] = useState(null);
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
            await fetchAssignedTasks(data.data.email);
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
      } finally {
        setLoading(false);
      }
    };

    const fetchAssignedTasks = async (userEmail) => {
      try {
        const response = await fetch(
          `${SummaryApi.getTaskByUserEmail.url}?email=${encodeURIComponent(
            userEmail
          )}`,
          {
            method: SummaryApi.getTaskByUserEmail.method,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Assigned Tasks Data:", data);

        if (data.success) {
          const tasks = data.tasks || [];
          const matchingTask = tasks.find(
            (task) => task.userEmail === userEmail
          );

          if (matchingTask) {
            const traderEmail = matchingTask.traderEmail; // Corrected here
            console.log("Matched Trader Email:", traderEmail);

            if (traderEmail) {
              await fetchTraderDetails(traderEmail);
            } else {
              console.warn(
                "Trader email is not available in the matched task."
              );
            }
          } else {
            console.warn("No tasks found for this user.");
            enqueueSnackbar("No tasks found for this user.", {
              variant: "info",
            });
          }
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
      }
    };

    const fetchTraderDetails = async (traderEmail) => {
      try {
        const response = await fetch(SummaryApi.allTraderss.url, {
          method: SummaryApi.allTraderss.method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response Data:", result);

        if (result.success) {
          const traders = result.data || [];
          console.log("Fetched Traders:", traders);

          const matchingTrader = traders.find(
            (trader) => trader.email.toLowerCase() === traderEmail.toLowerCase()
          );

          if (matchingTrader) {
            setTraderDetails(matchingTrader);
            console.log("Set Trader Details:", matchingTrader);
          } else {
            console.warn("Trader not found for email:", traderEmail);
            enqueueSnackbar("Trader not found.", { variant: "warning" });
          }
        } else {
          console.error("Failed to fetch trader details:", result.message);
          enqueueSnackbar("Failed to fetch trader details.", {
            variant: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching trader details:", error);
        enqueueSnackbar("An error occurred while fetching trader details.", {
          variant: "error",
        });
      }
    };

    fetchCurrentUser();
  }, [enqueueSnackbar]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto mt-5 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">My Profile</h1>
      {currentUser && (
        <div>
          <h2 className="text-xl font-semibold mb-7 text-gray-700">
            My Email: <span className="text-gray-500">{currentUser.email}</span>
          </h2>
          {traderDetails ? (
            <div>
              <h1 className="text-lg font-bold mb-6 text-gray-700">
                Assigned Trader Details:
              </h1>
              <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                <p className="mb-2 text-gray-800">
                  <strong>Trader Name:</strong> {traderDetails.name}
                </p>
                <p className="mb-2 text-gray-800">
                  <strong>Trader Email:</strong> {traderDetails.email}
                </p>
                <p className="mb-2 text-gray-800">
                  <strong>Location:</strong> {traderDetails.location}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No trader assigned.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;

