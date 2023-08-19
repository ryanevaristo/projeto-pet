import React from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { useState } from 'react';
import { MdOutlineDashboard } from 'react-icons/md';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineUser, AiFillSnippets } from 'react-icons/ai';
import { FiMessageSquare, FiUser, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
//create toggle sidebar


function Sidebar() {
  const menus = [
    { name: 'Dashboard', link: '/', icon: MdOutlineDashboard, margin: false },
    // { name: 'User', link: '/', icon: AiOutlineUser, margin: false },
    { name: 'Minha Agenda', link: '/scheduler', icon: FiMessageSquare, margin: true },
    { name: 'Meus Clientes', link: '/clients', icon: FiUsers },
    { name: 'Novo Cliente', link: '/clients/new', icon: FiUser },
    { name: 'Dados Analiticos', link: '/Analytics', icon: TbReportAnalytics },
    { name: 'Serviços', link: '/petservices', icon: AiFillSnippets },
    //{ name: 'Clientes', link: '/Clients', icon: AiOutlineHeart, margin: false },
    { name: 'Funcionarios', link: '/funcionarios', icon: AiOutlineUser, margin: false },
  ];

  const [open, setOpen] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div
      className={`bg-[#222] min-h-screen ${open ? 'w-72' : 'w-16'} ${isMobile ? '' : ''} text-gray-100 px-4 duration-500`}
    >
      <div className="flex justify-end py-3">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="relative flex flex-col gap-4 mt-4">
        {menus.map((menu, index) => (
          <Link to={menu.link} key={index}>
            <div
              className={`${menu.margin && 'mt-5'
                } flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer`}
            >
              <div>
                <menu.icon size={20} />
              </div>

              <h2
                style={{ transitionDelay: `${open ? index * 0.1 : 0}s` }}
                className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'
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