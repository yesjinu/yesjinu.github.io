import * as React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"

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
  
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          url {
            resume
            github
            linkedin
          }
        }
      }
    }
  `)
  
  
  
  return (
    <div className="max-w-screen-md mx-auto px-8 py-6">
      <header className="global-header">{header}</header>
      <main>{children}</main>
        <footer className="flex flex-col items-center justify-center mt-12 space-x-6 md:flex-row">
          <p>
            Designed by Jinu
          </p>
          <div className="flex space-x-2 text-gray">
            <Link to={data.site.siteMetadata?.url?.resume}>Resume</Link>
            <Link to={data.site.siteMetadata?.url?.github}>Github</Link>
            <Link to={data.site.siteMetadata?.url?.linkedin}>LinkedIn</Link>
          </div>
        </footer>
    </div>
  )
}

export default Layout
