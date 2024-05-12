import "./ContentMain.css";
import Cards from "../Cards/Cards";
import Tables from "../Table/Tables";

const ContentMain = () => {
  return (
    <div className="main-content-holder">
        <div className="content-grid-one">
            <Cards />
            <Tables/>
        </div>
        
    </div>
  )
}

export default ContentMain
