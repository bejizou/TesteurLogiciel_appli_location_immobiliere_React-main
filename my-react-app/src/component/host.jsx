import "./css/component.css"
import Rates from "./rating";

function Host({ data }) {
  const currentHost = data ;

  return (
    <div className="hostRating" >
        <div className={ currentHost.titleLength < 25  ? "host" : "host-long-title"} >
          <p className="host-name">{currentHost.host.name}</p>
          <img
            className="host-picture"
            src={currentHost.host.picture}
            alt={currentHost.host.name}
          />
        </div>
        <div>
          <Rates data={data} />
        </div>
      </div>
       

  );
}

export default Host;