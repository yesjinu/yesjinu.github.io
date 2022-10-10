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
  
  const authorName = data.site.siteMetadata?.author?.name;
  const resumeLink = data.site.siteMetadata?.url?.resume;
  const githubLink = data.site.siteMetadata?.url?.github;
  const linkedinLink = data.site.siteMetadata?.url?.linkedin;
  
  return (
    <footer className="flex flex-col items-center justify-center mt-12 md:space-x-6 md:flex-row">
      <p>Designed by {authorName}</p>
      <div className="flex space-x-2 text-gray">
        <Link to={resumeLink} target="_blank">Resume</Link>
        <Link to={githubLink} target="_blank">GitHub</Link>
        <Link to={linkedinLink} target="_blank">LinkedIn</Link>
      </div>
    </footer>
  )
}

export default Footer;
