import React from 'react';
import './Home.css';
import Sidebar from '../../layout/Sidebar/Sidebar';
import Content from '../../layout/Content/Content';

const Home = () => {
    return (
        <div className='app'>
            <div className="side">
                <Sidebar />
            </div>

            <Content />
        </div>
    );
}

export default Home;
