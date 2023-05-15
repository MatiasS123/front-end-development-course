//import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../style/Navbar.css';
import { useState } from 'react';

const Navbar: React.FC = () => {

  const [open, setOpen] = useState<Boolean>(false);

  const NavBarMenuItem = (properties: {ItemName: string, ItemPath: string}) => {
    return (<Link to={properties.ItemPath} className="NavBarMenuItem">{properties.ItemName}</Link>);
  }

  const NavBarMenu = () => {
    if(open) {
      return (
        <div className="NavBarMenu">
          {NavBarMenuItem({"ItemName":"Customers", "ItemPath":"/customers"})}
          {NavBarMenuItem({"ItemName":"Trainings", "ItemPath":"/trainings"})}
          {NavBarMenuItem({ItemName:"Statistics", "ItemPath":"/statistics"})}
          </div>
      )
    }
  }

  return (
    <div className="Navbar">

        <div className="NavButton">
           
                <button id="NavBarMenuButton" onClick={() => setOpen(!open)}></button>
            {NavBarMenu()}
        </div>

        <div className="LogoContainer">
        </div>

      </div>
  );
};

export default Navbar;