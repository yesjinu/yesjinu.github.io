import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
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
    <div className="max-w-screen-md mx-auto px-6" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer className="sm:flex-col flex justify-center">
        Designed by Jinu
        <div>
          <Link to="">Resume</Link>
          <Link to="">Github</Link>
          <Link to="">LinkedIn</Link>
        </div>
      </footer>
    </div>
  )
}

export default Layout
