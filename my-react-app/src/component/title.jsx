import '../component/css/title.css';
import Tags from './tags';
import Host from './host';
import Rates from './rating';


function Title({ data }) {
    const currentHostInformation = data ;
  
    
    return (
      
          <div className="informationx">
            
            <p className= "information-title"  title= {currentHostInformation.title}>{currentHostInformation.title}</p>
            <p className="information-location">{currentHostInformation.location}</p>
           
          
          </div>
          
        
    );
  }
  
  export default Title;