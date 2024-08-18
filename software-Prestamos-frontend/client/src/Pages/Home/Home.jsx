import React, { useState } from 'react';
import Content from '../../components/Content';

const Home = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className='flex bg-customMain flex-col'>
            <div className={`${isSidebarCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-16rem)]'} transition-width duration-300`}>
                <Content />
            </div>
        </div>
    );
}

export default Home;
