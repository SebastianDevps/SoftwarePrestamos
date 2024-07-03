import React from 'react';
import Sidebar from '../../layout/Sidebar/Sidebar';
import Content from '../../layout/Content/Content';

const Home = () => {
    return (
        <div className='min-h-screen bg-customMain grid grid-cols-1 lg:grid-cols-5'>
            <div className='col-span-1 lg:col-span-1'>
                <Sidebar />  
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <Content />
            </div>
        </div>
    );
}

export default Home;
