import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  // 헤더 높이를 h-16으로 설정합니다.
  // 로고의 높이를 64픽셀로 가정하고, 비율에 맞게 너비를 계산합니다.
  const logoHeight = 60; // 헤더 높이와 동일하게 설정
  const logoWidth = (logoHeight * 1000) / 400;

  return (
    <header className="bg-white shadow-md p-2 h-16">
      {" "}
      {/* 헤더 높이를 h-16으로 조정 */}
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <div className="flex items-center h-full">
          {/* 로고를 헤더 높이에 맞게 조정 */}
          <Image
            src="/logo.png"
            alt="Logo"
            width={logoWidth}
            height={logoHeight}
          />
        </div>
        {/* 네비게이션 메뉴 */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
