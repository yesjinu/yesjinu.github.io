import * as React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ location, title, children }) => {
  
  return (
    <div className="max-w-screen-md mx-auto px-8 py-6">
      <Header location={location} title={title}/>
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
