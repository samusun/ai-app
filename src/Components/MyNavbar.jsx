import { faBars, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "@mantine/core";
import React, { useState } from "react";

function MyNavbar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="bg-gray-500">
      <div className="w-48 h-48" onClick={() => setIsVisible(!isVisible)}>
        🏋🏻‍♂️
      </div>
      {isVisible && <Navbar width={{ base: 60 }} height={500}></Navbar>}
    </div>
  );
}

export default MyNavbar;
