import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Content from '../../components/Content';

const Home = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className='min-h-screen bg-customMain flex'>
            <div className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
                <Sidebar />
                {/* <button
                    className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={toggleSidebar}
                >
                    {isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
                </button> */}
            </div>
            <div className={`${isSidebarCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-16rem)]'} transition-width duration-300`}>
                <Content />
            </div>
        </div>
    );
}

export default Home;
