import React from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useState } from 'react';
import { MdOutlineDashboard } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { FiMessageSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Sidebar() {
  const menus = [
    { name: 'Dashboard', link: '/', icon: MdOutlineDashboard, margin: false },
    { name: 'User', link: '/', icon: AiOutlineUser, margin: false },
    { name: 'Minha Agenda', link: '/', icon: FiMessageSquare, margin: true },
    { name: 'Dados Analiticos', link: '/', icon: TbReportAnalytics },
    { name: 'Clientes', link: '/', icon: AiOutlineHeart, margin: false },
    { name: 'Funcionarios', link: '/', icon: AiOutlineUser, margin: false },
  ];

  const [open, setOpen] = useState(true);

  return (
    <div
      className={`bg-[#0e0e0e] min-h-screen ${open ? 'w-72' : 'w-16'} text-gray-100 px-4 duration-500`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus.map((menu, index) => (
          <Link to={menu.link} key={index}>
            <div
              className={`${
                menu.margin && 'mt-5'
              } flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
            >
              <div>
                <menu.icon size={20} />
              </div>

              <h2
                style={{ transitionDelay: `${open ? index * 0.1 : 0}s` }}
                className={`whitespace-pre duration-500 ${
                  !open && 'opacity-0 translate-x-28 overflow-hidden'
                }`}
              >
                {menu.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;