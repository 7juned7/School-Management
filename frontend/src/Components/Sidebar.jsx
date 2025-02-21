import React from 'react'
import { FiLogOut } from 'react-icons/fi'

const Sidebar = ({menuItems,setActiveSection,role}) => {
  return (
      <aside className="w-64 bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-6">{role} Dashboard</h2>
          <ul>
              {menuItems[role].map((item) => (
                  <li
                      key={item.section}
                      className="mb-4 flex items-center cursor-pointer"
                      onClick={() => setActiveSection(item.section)}
                  >
                      {item.icon} <span className="ml-2">{item.label}</span>
                  </li>
              ))}
              <li className="mt-6 cursor-pointer text-red-400" onClick={() => console.log("Logging out...")}>
                  <FiLogOut className="inline-block mr-2" /> Logout
              </li>
          </ul>
      </aside>
  )
}

export default Sidebar