import * as React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ location, title, children }) => {
  
  return (
    <>
      <Header location={location} title={title}/>
      
      <main>{children}</main>
      
      <Footer />
    </>
  )
}

export default Layout
