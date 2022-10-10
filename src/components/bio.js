/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          url {
            resume
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author;
  const resume = data.site.siteMetadata?.resume;

  return (
    <div className="flex items-center place-items-end">
      <StaticImage
        className="mr-4 rounded-full"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/jinu-bio.jpg"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
        <a className="text-3xl" href={resume}>
            @<span className="hover:underline">{author.name}</span>
        </a>
    </div>
  )
}

export default Bio
