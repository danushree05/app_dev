import React, { useState } from "react";

// Sample rewards data
const rewardsData = [
  {
    id: 1,
    title: "Coupon",
    image:
      "https://img.freepik.com/premium-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg",
    locked: true,
  },
  {
    id: 2,
    title: "Coupon",
    image:
      "https://img.freepik.com/premium-photo/sneak-peek-stunning-mockup-set-reveals-iphone-14-pro-from-all-angles-antalya-turkey_983420-244481.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721692800&semt=ais_user",
    locked: true,
  },
  {
    id: 3,
    title: "Coupon",
    image:
      "https://t3.ftcdn.net/jpg/00/79/36/04/360_F_79360425_13tH0FGR7nYTNlXWKOWtLmzk7BAikO1b.jpg",
    locked: true,
  },
  {
    id: 4,
    title: "Discount",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToGmavvb0qL2D2KoIVS2L0gIiEz4uSUcGx1g&s",
    locked: true,
  },
  {
    id: 5,
    title: "Discount",
    image:
      "https://5.imimg.com/data5/ECOM/Default/2023/8/333511695/UC/XN/NG/102314478/1691326201977-airpodes-500x500.jpeg",
    locked: true,
  },
  {
    id: 6,
    title: "Discount",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX4XeBXif30Nntgsa2EBf2kEJHHwbNS1-y5A&s",
    locked: true,
  },
];

// RewardCard component
const RewardCard = ({ reward, onClaim }) => {
  return (
    <div className="relative border rounded-lg shadow-md p-4 bg-white">
      {reward.locked && (
        <div className="absolute top-2 left-2 text-yellow-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14H6m4 0v4m0-4v-4m6 4h-4m4 0v4m0-4v-4m0 10h-8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      )}
      <img
        src={reward.image}
        alt={reward.title}
        className="h-32 w-full object-cover mb-4 rounded-lg"
      />
      <h3 className="text-lg font-semibold mb-2">{reward.title}</h3>
      <button
        onClick={() => onClaim(reward)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
      >
        Claim Now
      </button>
    </div>
  );
};

// RewardsPage component
const RewardsPage = () => {
  const [rewards, setRewards] = useState(rewardsData);
  const [claimedRewards, setClaimedRewards] = useState([]);

  const handleClaim = (reward) => {
    if (reward.locked) {
      alert("You have claimed this reward!");
      setClaimedRewards([...claimedRewards, reward]);

      // Optionally, unlock the reward after claiming
      setRewards(
        rewards.map((r) => (r.id === reward.id ? { ...r, locked: false } : r))
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-5 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Rewards Shop</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Available Rewards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} onClaim={handleClaim} />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Claimed Rewards
        </h2>
        {claimedRewards.length === 0 ? (
          <p className="text-gray-500">No rewards claimed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {claimedRewards.map((reward) => (
              <div
                key={reward.id}
                className="relative border rounded-lg shadow-md p-4 bg-gray-50"
              >
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="h-32 w-full object-cover mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold mb-2">{reward.title}</h3>
                <p className="text-green-500">Claimed!</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardsPage;
