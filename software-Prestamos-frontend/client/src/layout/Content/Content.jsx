import "./Content.css";
import ContentMain from '../../components/ContentMain/ContentMain';
import Navbar from "../../components/navApp/Navbar";

const Content = () => {
  return (
    <div className='main'>
      <Navbar/> 
      <div className="main-2">
        <ContentMain />
      </div>
    </div>
  )
}

export default Content
