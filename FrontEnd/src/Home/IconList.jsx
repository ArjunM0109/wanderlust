import * as FaIcons from 'react-icons/fa';

export default function IconList() {
  return (
    <div className="filters d-flex mt-3">
      <div className="filter"> 
        <div><FaIcons.FaFire /></div>
        <p className="ml-2">Trending</p> 
      </div>
      <div className="filter">
        <div><FaIcons.FaBed /></div>
        <p className="ml-2">Rooms</p>
      </div>
      <div className="filter"> 
        <div><FaIcons.FaCity /></div>
        <p className="ml-2">Iconic City</p> 
      </div>
      <div className="filter"> 
        <div><FaIcons.FaMountain /></div>
        <p className="ml-2">Mountain City</p> 
      </div>
      <div className="filter"> 
        <div><FaIcons.FaFortAwesome /></div>
        <p className="ml-2">Castles</p> 
      </div>
       
      <div className="filter"> 
        <div><FaIcons.FaSwimmingPool /></div>
        <p className="ml-2">Amazing Pools</p> 
      </div>
       
      <div className="filter"> 
        <div><FaIcons.FaCampground /></div>
        <p className="ml-2">Camping</p> 
      </div>
       
      
       
    

      <div className="filter"> 
        <div><FaIcons.FaSnowflake /></div>
        <p className="ml-2">Arctic Snow</p> 
      </div> 
    </div>
  );
}
