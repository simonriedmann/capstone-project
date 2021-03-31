import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { ReactComponent as HeartLogo} from '../assets/heart.svg';
import { ReactComponent as MapLogo} from '../assets/map.svg';
import { ReactComponent as Home} from '../assets/home.svg';


export default function Navigation(){
    return (
          <Nav>
                <NavLink exact to="/">
                  <Home />
                </NavLink>

                <NavLink to="/map">
                  <MapLogo />
                </NavLink>

                <NavLink to="/favoriterestaurants">
                  <HeartLogo />
                </NavLink>
          </Nav>
    )
}


const Nav = styled.nav`
  position: fixed;
  display: flex;
  color: grey;
  background: orange;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;



  a {
    background: orange;
    color: grey;
    padding: 0 0.25rem;
    text-decoration: none;
    display: grid;
    place-content: center;
    &:active {
      background: red;
      color: white;
      transform: scale(1.1);
    }

    svg {
      height: 2rem;
      width: 2rem;
      fill: grey;
    }
  }

  .active {
    background: orange;
    color: white;

    svg {
      fill: white;
      transform: scale(1.2);
    }
  }
`





