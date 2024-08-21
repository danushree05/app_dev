
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import UploadProductForHome from "../components/UploadProductForHome";

const Hero = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleUploadMessage = (message) => {
    setUploadMessage(message);
  };

  const handleSearch = () => {
    fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setSearchResults(data);
          const { lat, lon } = data[0];
          setSelectedPosition([parseFloat(lat), parseFloat(lon)]);
        }
      });
  };

  useEffect(() => {
    if (map && selectedPosition) {
      map.setView(selectedPosition, 13);
    }
  }, [map, selectedPosition]);

  const SearchBox = () => {
    return (
      <div className="search-box">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for e-waste centers"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="text-center text-black p-[300px_0] bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-4xl text-white font-bold mb-4">
            Welcome to E-Waste Management
          </h2>
          <p className="text-lg mb-4 text-white">
            Streamline your e-waste management, collaborate effectively, and
            achieve a sustainable future with our powerful tools.
          </p>
          <button
            className="px-4 py-2 bg-slate-100 text-black font-bold rounded"
            onClick={() => setShowUploadForm(true)}
          >
            Upload Product
          </button>
          {showUploadForm && (
            <div className="flex justify-center mt-8">
              <UploadProductForHome
                onClose={() => setShowUploadForm(false)}
                onMessage={handleUploadMessage}
              />
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-b from-gray-600 to-gray-800 p-12 text-white">
        <div className="flex justify-center">
          <img
            src="https://www.ey.com/content/dam/ey-unified-site/ey-com/en-us/insights/climate-change-sustainability-services/images/ey-waste-bin-full-of-e-waste.jpg"
            alt="E-Waste Bin"
            className="max-w-[80%] rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl mb-4">Earn Rewards by Recycling</h2>
          <p className="text-lg">
            Our platform revolutionizes e-waste management by providing seamless
            tools for efficient recycling and sustainable practices.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-b from-gray-800 to-gray-600 p-12 text-white">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl mb-4">AI-Powered E-Waste Detection</h2>
          <p className="text-lg">
            Implement an AI model to detect and classify e-waste from uploaded
            images. Users can upload photos to identify e-waste easily.
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/38/Detected-with-YOLO--Schreibtisch-mit-Objekten.jpg"
            alt="Object Detection"
            className="max-w-[80%] rounded"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-b from-gray-600 to-gray-800 p-12 text-white">
        <div className="flex justify-center">
          <img
            src="https://www.telecomreview.com/images/stories/2021/04/Smart_waste_management_using_AI_and_machine_learning-article.jpg"
            alt="Smart Waste Management"
            className="max-w-[80%] rounded"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl mb-4">Network with Traders and Collectors</h2>
          <p className="text-lg">
            Develop a network of e-waste collectors and traders. Users can find
            the nearest collector through our platform, ensuring convenient and
            efficient e-waste disposal, promoting proper recycling and reducing
            environmental impact.
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-gray-800 to-black p-16 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <img
                src="https://img.freepik.com/premium-vector/man-using-phone-his-hand_373887-1585.jpg"
                alt="Upload e-waste image"
                className="max-w-full w-full h-56 mb-4 rounded object-cover"
              />
              <h1 className="text-xl font-bold mb-2">Upload e-waste image</h1>
              <p>Upload your e-waste images to detect and classify them.</p>
            </div>
            <div className="text-center">
              <img
                src="https://www.ecsenvironment.com/wp-content/uploads/2021/06/Untitled-design-2.png"
                alt="Connect with nearest trader"
                className="max-w-full w-full h-56 mb-4 rounded object-cover"
              />
              <h1 className="text-xl font-bold mb-2">
                Connect with Nearest Trader
              </h1>
              <p>
                Our platform makes it easy for you to schedule e-waste pickups
                and manage your team's time efficiently.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://etimg.etb2bimg.com/thumb/msid-94680824,imgsize-21488,width-1200,height=765,overlay-ethrsea/news/industry/hierarchy-of-employees-needs-designing-the-perfect-employee-rewards-and-recognition-program.jpg"
                alt="Based on rewards purchase items"
                className="max-w-full w-full h-56 mb-4 rounded object-cover"
              />
              <h1 className="text-xl font-bold mb-2">
                Based on Rewards Purchase Items
              </h1>
              <p>
                Points can be used as discounts on new electronics purchased
                from our platform, encouraging e-waste recycling.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-black to-gray-800 p-16 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold mb-4">E-Waste Detection Map</h2>
              <p className="text-lg">
                Locate the nearest recycling centers and manage e-waste
                efficiently with our interactive map feature.
              </p>
              <SearchBox />
            </div>
            <div>
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: "300px", width: "100%" }}
                whenCreated={setMap}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {selectedPosition && (
                  <Marker position={selectedPosition}>
                    <Popup>Search Result</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
      {uploadMessage && (
        <div className="fixed bottom-0 right-0 p-4 bg-gray-800 text-white">
          {uploadMessage}
        </div>
      )}
    </>
  );
};

export default Hero;
