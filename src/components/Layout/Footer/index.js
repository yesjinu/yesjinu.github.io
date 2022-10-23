import { graphql, Link, useStaticQuery } from "gatsby"
import * as React from "react"
import Grid from "../Grid"

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

  const authorName = data.site.siteMetadata?.author?.name
  const resumeLink = data.site.siteMetadata?.url?.resume
  const githubLink = data.site.siteMetadata?.url?.github
  const linkedinLink = data.site.siteMetadata?.url?.linkedin

  return (
    <Grid>
      <footer
        className={`col-span-full flex flex-col items-center justify-center mt-12 md:space-x-6 md:flex-row`}
      >
        <p>Designed by {authorName}</p>
        <div className="flex space-x-2 text-gray">
          <Link className="hover:underline" to={resumeLink} target="_blank">
            Resume
          </Link>
          <Link className="hover:underline" to={githubLink} target="_blank">
            GitHub
          </Link>
          <Link className="hover:underline" to={linkedinLink} target="_blank">
            LinkedIn
          </Link>
        </div>
      </footer>
    </Grid>
  )
}

export default Footer
