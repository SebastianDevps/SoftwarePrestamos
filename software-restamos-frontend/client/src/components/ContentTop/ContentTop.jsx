import "./ContentTop.css";

const ContentTop = () => {
  return (
    <div className="main-content-top">
        <div className="content-top-left">
            <button type="button" className="sidebar-toggler">
                <img src="" alt="" />
            </button>
        </div>
        <div className="content-top-btns">
            <button type="button" className="search-btn content-top-btn">
                <img src="../../../public/images/logo.png" alt="" />
            </button>
            <button className="notification-btn content-top-btn">
                <img src="../../../public/images/logo.png"  />
                <span className="notification-btn-dot"></span>
            </button>
        </div>
    </div>
  )
}

export default ContentTop
