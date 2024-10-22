import React, { useState } from "react";

const Sidebar = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Dummy data for technology details
  const techDetails = [
    { id: 2, name: "Tech-Info New", href: "/section1" },
    { id: 3, name: "Change Password", href: "/changePassword" },
    { id: 4, name: "Logout", href: "/" },
    {
      id: 5,
      name: "Section",
      dropdown: [
        { id: 6, name: "Section1", href: "/Section1" },
        { id: 7, name: "Section2", href: "/Section2" },
        { id: 8, name: "Section3", href: "/Section3" },
        { id: 9, name: "Section4", href: "/Section4" },
      ],
    },
  ];

  const handleTechClick = (tech) => {
    setSelectedTech(tech);
    // Toggle dropdown if it's the section with dropdown
    if (tech.dropdown) {
      setDropdownOpen(!dropdownOpen);
    } else {
      setDropdownOpen(false); // Close dropdown if another item is clicked
    }
  };

  return (
    <div className="bg-gray-800 text-white w-1/7 py-8 sticky top-0">
      <div className="px-8">
        <ul>
          {techDetails.map((tech) => (
            <li key={tech.id} className="py-2 ">
              <div
                className={`cursor-pointer transition-colors duration-200 ${
                  selectedTech && selectedTech.id === tech.id
                    ? "font-bold bg-gray-600"
                    : "hover:bg-gray-400"
                }`}
                onClick={() => handleTechClick(tech)}
              >
                <a href={tech.href} className="block px-2 py-1">
                  {tech.name}
                </a>
              </div>
              {/* Render dropdown if it exists */}
              {tech.dropdown && dropdownOpen && (
                <ul className="ml-4 mt-2 bg-gray-700 rounded">
                  {tech.dropdown.map((subTech) => (
                    <li key={subTech.id} className="py-1">
                      <a
                        href={subTech.href}
                        className="block px-2 py-1 transition-colors duration-200 hover:bg-gray-400"
                      >
                        {subTech.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
