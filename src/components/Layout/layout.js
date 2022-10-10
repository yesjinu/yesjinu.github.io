import * as React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ location, title, children }) => {
  
  return (
    <div className="px-12 py-8">
      <Header location={location} title={title}/>
      
      <main>{children}</main>
      
      <Footer />
    </div>
  )
}

export default Layout
