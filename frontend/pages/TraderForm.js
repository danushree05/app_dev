
// import React, { useState } from "react";
// import { CgClose } from "react-icons/cg";
// import { toast } from "react-toastify";
// import SummaryApi from "../common"; // Adjust the path as necessary

// const TraderForm = ({ onClose, fetchTraders }) => {
//   const [trader, setTrader] = useState({
//     name: "",
//     location: "",
//     email: "", // Added email field
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTrader({
//       ...trader,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Parse location string to GeoJSON format
//     const locationString = trader.location; // Format: "Latitude: 10.9358503, Longitude: 76.9527723"
//     const locationParts = locationString.split(", ");
//     const latitude = parseFloat(locationParts[0].split(": ")[1]);
//     const longitude = parseFloat(locationParts[1].split(": ")[1]);

//     const location = {
//       type: "Point",
//       coordinates: [longitude, latitude],
//     };

//     const traderData = {
//       name: trader.name,
//       location: location,
//       email: trader.email, // Include email field
//     };

//     try {
//       const response = await fetch(SummaryApi.allTraders.url, {
//         method: SummaryApi.allTraders.method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(traderData),
//         credentials: "include",
//       });
//       const result = await response.json();
//       if (result.success) {
//         toast.success("Trader added successfully!");
//         fetchTraders();
//         onClose();
//       } else {
//         toast.error("Failed to add trader.");
//       }
//     } catch (error) {
//       console.error("Error adding trader:", error);
//       toast.error("Error adding trader.");
//     }
//   };

//   return (
//     <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
//       <div className="bg-white p-4 rounded w-full max-w-md">
//         <div className="flex justify-between items-center pb-3">
//           <h2 className="font-bold text-lg">Upload Trader</h2>
//           <div className="text-2xl cursor-pointer" onClick={onClose}>
//             <CgClose />
//           </div>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="name">Trader Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={trader.name}
//             onChange={handleChange}
//             required
//             className="p-2 bg-slate-100 border rounded w-full"
//           />
//           <label htmlFor="location" className="mt-3">
//             Location:
//           </label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             value={trader.location}
//             onChange={handleChange}
//             required
//             className="p-2 bg-slate-100 border rounded w-full"
//           />
//           <label htmlFor="email" className="mt-3">
//             Email:
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={trader.email}
//             onChange={handleChange}
//             required
//             className="p-2 bg-slate-100 border rounded w-full"
//           />
//           <button
//             type="submit"
//             className="px-3 py-2 bg-gray-600 text-white mt-4 hover:bg-gray-700"
//           >
//             Add Trader
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TraderForm;
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";
import SummaryApi from "../common"; // Adjust the path as necessary

const TraderForm = ({ onClose, fetchTraders }) => {
  const [trader, setTrader] = useState({
    name: "",
    location: "",
    email: "", // Added email field
    password:"",
  });
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrader({
      ...trader,
      [name]: value,
    });
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          getStateFromCoordinates(latitude, longitude);
          // setTrader({
          //   ...trader,
          //   location: `Latitude: ${latitude}, Longitude: ${longitude}`,
          // });
        },
        (error) => {
          toast.error("Error retrieving location: " + error.message);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };
  const getStateFromCoordinates = (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const state = data.address.state;
        setTrader((prev) => ({ ...prev, location: state })); // Update location to state
        toast.success("Location detected: " + state);
      })
      .catch((error) => {
        console.error("Error fetching the state:", error);
        toast.error(
          "Error fetching the state. Please enter location manually."
        );
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse location string to GeoJSON format
    // const locationString = trader.location; // Format: "Latitude: 10.9358503, Longitude: 76.9527723"
    // const locationParts = locationString.split(", ");
    // const latitude = parseFloat(locationParts[0].split(": ")[1]);
    // const longitude = parseFloat(locationParts[1].split(": ")[1]);

    // const location = {
    //   type: "Point",
    //   coordinates: [longitude, latitude],
    // };

    const traderData = {
      name: trader.name,
      email: trader.email, // Include email field
      password:trader.password,
      location: trader.location,
    };
     console.log("Trader Data to be sent:", traderData);

    try {
      const response = await fetch(SummaryApi.allTraders.url, {
        method: SummaryApi.allTraders.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(traderData),
        credentials: "include",
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Trader added successfully!");
        fetchTraders();
        onClose();
      } else {
        toast.error("Failed to add trader.");
      }
    } catch (error) {
      console.error("Error adding trader:", error);
      toast.error("Error adding trader.");
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-md">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Upload Trader</h2>
          <div className="text-2xl cursor-pointer" onClick={onClose}>
            <CgClose />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Trader Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={trader.name}
            onChange={handleChange}
            required
            className="p-2 bg-slate-100 border rounded w-full"
          />
          <label htmlFor="location" className="mt-3">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={trader.location}
            onChange={handleChange}
            required
            className="p-2 bg-slate-100 border rounded w-full"
          />
          <button
            type="button"
            onClick={handleGeolocation}
            className="px-3 py-2 bg-gray-600 text-white mt-2 hover:bg-gray-700"
          >
            Get Current Location
          </button><br></br>
          <label htmlFor="email" className="mt-3">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={trader.email}
            onChange={handleChange}
            required
            className="p-2 bg-slate-100 border rounded w-full"
          />
          <label htmlFor="password" className="mt-3">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={trader.password}
            onChange={handleChange}
            required
            className="p-2 bg-slate-100 border rounded w-full"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-gray-600 text-white mt-4 hover:bg-gray-700"
          >
            Add Trader
          </button>
        </form>
      </div>
    </div>
  );
};

export default TraderForm;


