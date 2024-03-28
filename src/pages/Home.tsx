import React, { useState } from "react";
import AccountLayout from "../layouts/account";
import Articles from "./articles";
import Matches from "./matches";
import News from "./news"; // Import the News component

const Home: React.FC = () => {
  const [showNews] = useState(false);

  return (
    <>
      <div className="w-full dark:bg-black">
        <AccountLayout />
        <div className="w-full">{showNews ? <News /> : <Matches />}</div>
        <div className="w-full">{showNews ? null : <Articles />}</div>
      </div>
    </>
  );
};

export default Home;
