import "./ContentMain.scss";
import Cards from "../Cards/Cards";
import Tables from "../Table/Tables";

const ContentMain = () => {
  return (
    <div className="main-content">
      <br />
      <div className="content-card">
        <Cards/>
      </div>
      <div className="bg">
      </div>
      {/*<div className="table">
      <Tables/>
      </div>*/}
  </div>
  );
}

export default ContentMain;
