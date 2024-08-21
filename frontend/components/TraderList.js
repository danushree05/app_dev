import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import moment from "moment";

const TraderList = () => {
  const [traders, setTraders] = useState([]);

  const fetchTraders = async () => {
    try {
      const response = await apiService.get("/traders");
      if (response.success) {
        setTraders(response.data);
      }
    } catch (error) {
      console.error("Error fetching traders", error);
    }
  };

  useEffect(() => {
    fetchTraders();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {traders.map((trader, index) => (
            <tr key={trader._id}>
              <td>{index + 1}</td>
              <td>{trader.name}</td>
              <td>{trader.location.coordinates.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TraderList;
