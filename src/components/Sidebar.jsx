import { Link } from "react-router-dom"
import "../utils/styles/Sidebar.css"
import logo from "../assets/Logo.svg"

/**
 * Sidebar component
 * @returns JSX element
 */
export const SideBar = () => {
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