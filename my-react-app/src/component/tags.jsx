import './css/tags.css';
function Tags({ data }) {

        return (
        <ul className={data.titleLength < 25 ? "tags" : "long-title-tags"}>
      {data.tags.map((tag, index) => (
        <li className="tag" key={index}>
          {tag}
        </li>
      ))}
    </ul>
          );
    
    }
    
  
  export default Tags;