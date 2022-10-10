import * as React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"
import Footer from "./Footer";

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
    <div className="max-w-screen-md mx-auto px-8 py-6">
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
