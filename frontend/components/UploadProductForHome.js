


// import React, { useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import productCategory from "../helpers/productCategory";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from "../helpers/uploadImage";
// import DisplayImage from "./DisplayImage";
// import { MdDelete } from "react-icons/md";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";

// const UploadProductForHome = ({ onClose}) => {
//   const [data, setData] = useState({
//     productName: "",
//     brandName: "",
//     category: "",
//     productImage: [],
//     description: "",
//     price: "",
//     totalamount: "",
//     username: "",
//     location: "",
//   });
//   const [openFullScreen, setOpenFullScreen] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState("");
//   const [uploading, setUploading] = useState(false); // New state to track uploading status
//   const [isEwaste, setIsEwaste] = useState(false); // New state to track if the image is e-waste

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUploadProduct = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const uploadImageCloudinary = await uploadImage(file);
//       setData((prev) => ({
//         ...prev,
//         productImage: [...prev.productImage, uploadImageCloudinary.url],
//       }));

//       // Check if the uploaded image is e-waste
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const response = await fetch("http://127.0.0.1:8000/detect-ewaste/", {
//           method: "POST",
//           body: formData,
//         });
//         const result = await response.json();
//         if (result.isEwaste) {
//           setIsEwaste(true);
//           toast.success("This is e-waste. You can proceed with the upload.");
//         } else {
//           setIsEwaste(false);
//           toast.error("This is not e-waste. Upload disabled.");
//         }
//       } catch (error) {
//         console.error("Error detecting e-waste:", error);
//         toast.error("Error detecting e-waste. Please try again.");
//       }
//     }
//   };

//   const handleDeleteProductImage = (index) => {
//     const newProductImage = [...data.productImage];
//     newProductImage.splice(index, 1);
//     setData((prev) => ({ ...prev, productImage: newProductImage }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);
//     if (isEwaste) {
//       try {
//         const response = await fetch(SummaryApi.uploadProductForHome.url, {
//           method: SummaryApi.uploadProductForHome.method,
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
//         const responseData = await response.json();
//         if (responseData.success) {
//           toast.success(responseData?.message);
//           onClose();
//         } else if (responseData.error) {
//           toast.error(responseData?.message);
//         }
//       } catch (error) {
//         toast.error("Upload not allowed. The item is not classified as e-waste.");
//       }
//     } else {
//       toast.error("Error uploading product. Please try again.");
//     }
//     setUploading(false);
//   };

//   const handleLocationClick = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
//           setData((prev) => ({ ...prev, location }));
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           toast.error("Could not get location. Please enter it manually.");
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by your browser.");
//     }
//   };

//   return (
//     <div className="fixed w-full h-full bg-slate-200 bg-opacity-30 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
//       <div className="bg-white p-4 rounded w-full max-w-xl h-full max-h-[80%] overflow-hidden">
//         <div className="flex justify-between items-center">
//           <h2 className="font-bold text-lg">Upload Product</h2>
//           <div
//             className="w-fit ml-auto text-2xl hover:text-gray-400 cursor-pointer"
//             onClick={onClose}
//           >
//             <IoMdClose />
//           </div>
//         </div>
//         <form
//           className="grid p-4 gap-3 overflow-y-scroll h-full pb-10"
//           onSubmit={handleSubmit}
//         >
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Enter username"
//             name="username"
//             required
//             value={data.username}
//             onChange={handleOnChange}
//             className="p-2 bg-slate-100 border rounded"
//           />

//           <label htmlFor="productName">Product Name:</label>
//           <input
//             type="text"
//             id="productName"
//             placeholder="Enter product name"
//             name="productName"
//             required
//             value={data.productName}
//             onChange={handleOnChange}
//             className="p-2 bg-slate-100 border rounded"
//           />

//           <label htmlFor="brandName">Brand Name:</label>
//           <input
//             type="text"
//             id="brandName"
//             required
//             placeholder="Enter brand name"
//             value={data.brandName}
//             name="brandName"
//             onChange={handleOnChange}
//             className="p-2 bg-slate-100 border rounded"
//           />

//           <label htmlFor="category">Category :</label>
//           <select
//             value={data.category}
//             name="category"
//             required
//             onChange={handleOnChange}
//             className="p-2 bg-slate-100 border rounded"
//           >
//             <option value="">Select category</option>
//             {productCategory.map((el, index) => (
//               <option value={el.value} key={el.value + index}>
//                 {el.label}
//               </option>
//             ))}
//           </select>

//           <label htmlFor="productImage">Product Image:</label>
//           <div className="p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center">
//             <label htmlFor="uploadImage">
//               <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
//                 <span className="text-5xl cursor-pointer">
//                   <FaCloudUploadAlt />
//                 </span>
//                 <p className="text-sm">Upload Product Image</p>
//                 <input
//                   type="file"
//                   required
//                   id="uploadImage"
//                   className="hidden"
//                   onChange={handleUploadProduct}
//                 />
//               </div>
//             </label>
//           </div>
//           <div>
//             {data?.productImage[0] ? (
//               <div className="flex items-center gap-2">
//                 {data.productImage.map((el, index) => (
//                   <div className="relative group" key={index}>
//                     <img
//                       alt={el}
//                       src={el}
//                       width={100}
//                       height={100}
//                       className="bg-slate-100 cursor-pointer"
//                       onClick={() => {
//                         setOpenFullScreen(true);
//                         setFullScreenImage(el);
//                       }}
//                     />
//                     <div
//                       className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
//                       onClick={() => handleDeleteProductImage(index)}
//                     >
//                       <MdDelete />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-red-600 text-sm">
//                 *Please upload product image*
//               </p>
//             )}
//           </div>

//           <label htmlFor="description" className="mt-3">
//             Description:
//           </label>
//           <textarea
//             className="h-28 bg-slate-100 border resize-none p-1"
//             placeholder="Enter product description"
//             rows={3}
//             name="description"
//             onChange={handleOnChange}
//           ></textarea>

//           <label htmlFor="location" className="mt-3">
//             Location:
//           </label>
//           <input
//             type="text"
//             id="location"
//             placeholder="Enter location"
//             name="location"
//             required
//             onClick={handleLocationClick}
//             value={data.location}
//             onChange={handleOnChange}
//             className="p-2 bg-slate-100 border rounded"
//           />

//           <button
//             type="submit"
//             className="px-2 py-2 bg-gray-600 hover:bg-gray-800 text-white mb-10"
//             // disabled={!isEwaste || uploading}
//           >
//             {uploading ? "Uploading..." : "Upload Product"}
//           </button>
//         </form>
//       </div>

//       {openFullScreen && (
//         <DisplayImage
//           onClose={() => setOpenFullScreen(false)}
//           imgUrl={fullScreenImage}
//         />
//       )}
//     </div>
//   );
// };

// export default UploadProductForHome;

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProductForHome = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    totalamount: "",
    username: "",
    userEmail:"",
    phoneNumber:"",
    location: "",
  });
  const [openFullScreen, setOpenFullScreen] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [uploading, setUploading] = useState(false); // New state to track uploading status
  const [isEwaste, setIsEwaste] = useState(false); // New state to track if the image is e-waste

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));

      // Check if the uploaded image is e-waste
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:8000/detect-ewaste/", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (result.isEwaste) {
          setIsEwaste(true);
          toast.success("This is e-waste. You can proceed with the upload.");
        } else {
          setIsEwaste(false);
          toast.error("This is not e-waste. Upload disabled.");
        }
      } catch (error) {
        console.error("Error detecting e-waste:", error);
        toast.error("Error detecting e-waste. Please try again.");
      }
    }
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newProductImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    if (isEwaste) {
      try {
        const response = await fetch(SummaryApi.uploadProductForHome.url, {
          method: SummaryApi.uploadProductForHome.method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if (responseData.success) {
          toast.success(responseData?.message);
          onClose();
        } else if (responseData.error) {
          toast.error(responseData?.message);
        }
      } catch (error) {
        toast.error(
          "Upload not allowed. The item is not classified as e-waste."
        );
      }
    } else {
      toast.error("Error uploading product. Please try again.");
    }
    setUploading(false);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getState(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Could not get location. Please enter it manually.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const getState = (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const state = data.address.state;
        console.log("State:", state);
        setData((prev) => ({ ...prev, location: state }));
        toast.success("Location detected: " + state);
      })
      .catch((error) => {
        console.error("Error fetching the state:", error);
        toast.error(
          "Error fetching the state. Please enter location manually."
        );
      });
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-30 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Upload Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-gray-400 cursor-pointer"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-3 overflow-y-scroll h-full pb-10"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            name="username"
            required
            value={data.username}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="useremail">UserEmail:</label>
          <input
            type="text"
            id="useremail"
            placeholder="Enter useremail"
            name="userEmail"
            required
            value={data.userEmail}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            placeholder="Enter product name"
            name="productName"
            required
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="brandName">Brand Name:</label>
          <input
            type="text"
            id="brandName"
            required
            placeholder="Enter brand name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <label htmlFor="category">Category :</label>
          <select
            value={data.category}
            name="category"
            required
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="">Select category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage">Product Image:</label>
          <div className="p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center">
            <label htmlFor="uploadImage">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-5xl cursor-pointer">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  required
                  id="uploadImage"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </label>
          </div>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      alt={el}
                      src={el}
                      width={100}
                      height={100}
                      className="bg-slate-100 cursor-pointer"
                      onClick={() => {
                        setOpenFullScreen(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-sm">
                *Please upload product image*
              </p>
            )}
          </div>

          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter product description"
            rows={3}
            name="description"
            onChange={handleOnChange}
          ></textarea>

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            required
            placeholder="Enter Phone Number"
            value={data.phoneNumber}
            name="phoneNumber"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="location" className="mt-3">
            Location:
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter location"
            name="location"
            required
            onClick={handleLocationClick}
            value={data.location}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          />

          <button
            type="submit"
            className="px-2 py-2 bg-gray-600 hover:bg-gray-800 text-white mb-10"
            // disabled={!isEwaste || uploading}
          >
            {uploading ? "Uploading..." : "Upload Product"}
          </button>
        </form>
      </div>

      {openFullScreen && (
        <DisplayImage
          onClose={() => setOpenFullScreen(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProductForHome;
