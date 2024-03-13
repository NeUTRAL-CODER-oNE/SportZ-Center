import React from "react"; 
import AccountLayout from "../layouts/account";
import Articles from "./articles";
import Matches from "./matches";

const Home: React.FC = () => {
  return (
    <div className="dark:bg-black">
      <AccountLayout />
      <div className="w-full">
          {<Matches />}
        </div>
        <br />
        <div className="w-full">
          {<Articles />}
        </div>
      </div>

  );
};

export default Home;
