import {graphql, Link, useStaticQuery} from "gatsby";
import * as React from "react";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author {
            name
          }
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
    <footer className="flex flex-col items-center justify-center mt-12 md:space-x-6 md:flex-row">
      <p>Designed by {data.site.siteMetadata?.author?.name}</p>
      <div className="flex space-x-2 text-gray">
        <Link to={data.site.siteMetadata?.url?.resume} target="_blank">Resume</Link>
        <Link to={data.site.siteMetadata?.url?.github} target="_blank">Github</Link>
        <Link to={data.site.siteMetadata?.url?.linkedin} target="_blank">LinkedIn</Link>
      </div>
    </footer>
  )
}

export default Footer;
