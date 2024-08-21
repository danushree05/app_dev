// import React from 'react'
// import CategoryList from '../components/CategoryList'
// // import BannerProduct from '../components/BannerProduct'
// import HorizontalCardProduct from '../components/HorizontalCardProduct'
// import VerticalCardProduct from '../components/VerticalCardProduct'

// const Home = () => {
//   return (
//     <div className='bg-gray-700'>
//       <CategoryList/>
//       {/* <BannerProduct/> */}

//       <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}  className="text-white"/>
//       <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

//       <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
//       <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
//       <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
//       <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
//       <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
//       <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
//       <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
//       <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
//     </div>
//   )
// }

// export default Home
import React from "react";
import CategoryList from "../components/CategoryList";
// import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="bg-gray-600">
      <CategoryList />
      {/* <BannerProduct /> */}

      <HorizontalCardProduct
        category={"airpodes"}
        heading={"Top's Airpodes"}
        headingClassName="text-white"
      />
      <HorizontalCardProduct
        category={"watches"}
        heading={"Popular's Watches"}
        headingClassName="text-white"
      />

      <VerticalCardProduct
        category={"mobiles"}
        heading={"Mobiles"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"Mouse"}
        heading={"Mouse"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"televisions"}
        heading={"Televisions"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & Photography"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"earphones"}
        heading={"Wired Earphones"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"speakers"}
        heading={"Bluetooth Speakers"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"refrigerator"}
        heading={"Refrigerator"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"trimmers"}
        heading={"Trimmers"}
        headingClassName="text-white"
      />
    </div>
  );
};

export default Home;
