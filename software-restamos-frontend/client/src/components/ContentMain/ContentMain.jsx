import "./ContentMain.scss";
import Cards from "../Cards/Cards";
import Tables from "../Table/Tables";

const ContentMain = () => {
  return (
    <div className="main-content">
      <div className="e">
        <br />
      </div>
      <div className="content-grid">
        <Cards/>
        {/*<Tables/> */}

      </div>
      <div className="bg">

      </div>
    </div>
  );
}

export default ContentMain;
