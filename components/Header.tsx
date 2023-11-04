import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Design thinking engineering project Group: 5
        </h1>
        <h2 className="text-lg">Bodhi</h2>
      </div>
    </header>
  );
};

export default Header;
