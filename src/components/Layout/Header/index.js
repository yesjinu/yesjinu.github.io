import { Link } from "gatsby"
import * as React from "react"
import Grid from "../Grid"
import Logo from "./Logo"

const Header = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <Grid>
      <Link className="flex items-center space-x-2" to="/">
        <Logo />
        {isRootPath && <p className="text-2xl text-black">{title}</p>}
      </Link>
    </Grid>
  )
}

export default Header
