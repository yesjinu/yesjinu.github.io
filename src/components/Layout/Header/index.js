import {Link} from "gatsby";
import * as React from "react";
import Grid from "../Grid";

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
  
  return (
    <Grid>
      <header className="col-span-full">
        {header}
      </header>
    </Grid>
  )
}

export default Header;
