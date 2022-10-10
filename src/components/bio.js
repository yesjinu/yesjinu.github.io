/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Grid from "./Layout/Grid";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          slogan
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

  const slogan = data.site.siteMetadata?.slogan
  const author = data.site.siteMetadata?.author;
  const resumeLink = data.site.siteMetadata?.url.resume;

  return (
    <Grid>
      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <p className="font-bold text-3xl">
          {slogan}
        </p>
      </div>
      <div className="flex items-center col-span-1">
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
        <div>
          <Link className="hover:underline font-bold" to={resumeLink}>{author.name}</Link>
          <p>{author.summary}</p>
        </div>
      </div>
    </Grid>
  )
}

export default Bio
