import {Link} from "gatsby";
import * as React from "react";

const Header = ({location, title}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const header = isRootPath ? (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  ) : (
    <Link className="header-link-home" to="/">
      {title}
    </Link>
  )
  
  return <header className="global-header">{header}</header>
  
}

export default Header;
