import "./css/host.css"

function Host({ data }) {
  const currentHost = data ;

  return (
    
        <div className={ currentHost.titleLength < 25  ? "host" : "host-long-title"} >
          <p className="host-name">{currentHost.host.name}</p>
          <img
            className="host-picture"
            src={currentHost.host.picture}
            alt={currentHost.host.name}
          />
        </div>
      
  );
}

export default Host;