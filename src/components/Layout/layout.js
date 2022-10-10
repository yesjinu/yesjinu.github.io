import * as React from "react"
import Header from "./Header";
import Footer from "./Footer";
import Grid from "./Grid";

const Layout = ({ location, title, children }) => {
  
  return (
    <>
      <Header location={location} title={title}/>
      
      <Grid>
        <main className="col-span-full">{children}</main>
      </Grid>
      
      <Footer />
    </>
  )
}

export default Layout
