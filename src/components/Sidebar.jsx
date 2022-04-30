import { Link } from "react-router-dom"
import "../utils/styles/Sidebar.css"
import logo from "../assets/Logo.svg"
import { useEffect, useState } from "react"

/**
 * Sidebar component, for desktop and mobile
 * @returns JSX element
 */
export const SideBar = () => {
    //Const to check and change window's size and open.close the mobile navbar
    const [isDesktop, setDesktop] = useState(window.innerWidth > 590);
    const [navContent, ToggleNavContent] = useState(false)

    /**
     * Function to update window's/screen's size
     */
    const updateMedia = () => {
      setDesktop(window.innerWidth > 590);
    }
  
    useEffect(() => {
        //Event listener for screen size
      window.addEventListener("resize", updateMedia);
      return () => window.removeEventListener("resize", updateMedia);      
    });

    //Navbar for mobile
    if(!isDesktop) { 
        return(
            <nav onClick={() => ToggleNavContent(!navContent)}>
                <div className="nav-logo-wrapper">
                    <img alt="Circle products logo" src={logo} />
                </div>
                <div className={`${navContent ? "toggle-navbar-close" : "toggle-navbar-open"}`}></div>

                {navContent &&
                <div className="nav-links-wrapper">
                    <div className="nav-links-block">
                        <ul>
                            <li><Link to="/">Dashboard</Link></li>
                            <li className="active"><Link to="/">Products management</Link></li>
                            <li><Link to="/">Employees management</Link></li>
                        </ul>
                    </div>

                    <div className="nav-links-block-separator"></div>

                    <div className="nav-links-block">
                        <Link to="/home">Logout</Link>
                    </div>
                </div>
                }
            </nav>
        
        )
    }


    //Tablet & desktop navbar
    return(
        <nav>
            <div className="nav-logo-wrapper">
                <img alt="Circle products logo" src={logo} />
            </div>
            <div className="nav-links-wrapper">
                <div className="nav-links-block">
                    <ul>
                        <li><Link to="/">Dashboard</Link></li>
                        <li className="active"><Link to="/">Products management</Link></li>
                        <li><Link to="/">Employees management</Link></li>
                    </ul>
                </div>

                <div className="nav-links-block-separator"></div>

                <div className="nav-links-block">
                    <Link to="/home">Logout</Link>
                </div>
            </div>
        </nav>
    )
}