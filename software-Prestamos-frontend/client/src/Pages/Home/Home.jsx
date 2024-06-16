import React, { useEffect } from 'react';
import Sidebar from '../../layout/Sidebar/Sidebar';
import Content from '../../layout/Content/Content';

const Home = () => {
    
    return (
        <div className='min-h-screen grid grid-col-1 lg:grid-cols-5'>
            <div className=' col-span-1'>
                <Sidebar/>  
            </div>
            <div className='col-span-4'>
                <Content/>
            </div>
        </div>
    );
}

export default Home;
