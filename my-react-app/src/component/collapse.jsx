import "./css/collapse.css";
import { useState } from "react";
import Vector from "../assets/arrow-down.svg";

function Collapse({ data, title }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed);
    
  };

  return (
    <div className="about" onClick={handleCollapseClick}>
      <div className="title">
        <h2>{title}</h2>
        <img
          className={isCollapsed ? "vector" : "vector-rotated"}
          src={Vector}
          alt="vector"
        />
      </div>
      <div className={`description ${isCollapsed ? "wrapper" : ""}`}>
          {Array.isArray(data) ? (
           
            data.map((item, index) => <li key={index}>- {item}</li>)
          ) : (
            <p>{data}</p>
          )}
      </div>
    </div>
  );
}

export default Collapse;