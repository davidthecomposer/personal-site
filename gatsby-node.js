const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const Announcement = path.resolve("./src/templates/Announcement.tsx")
    const ConcertPiece = path.resolve("./src/templates/ConcertPiece.tsx")

    resolve(
      graphql(
        `
          {
            allContentfulAnnouncement {
              nodes {
                url
                order
                title
                buttonText
                mainImages {
                  file {
                    fileName
                    url
                  }
                }
                articleBlurb {
                  articleBlurb
                }
                articleText {
                  raw
                }
                contributors {
                  bio {
                    raw
                  }
                  mainImages {
                    file {
                      fileName
                      url
                    }
                    title
                  }
                  name
                  socialLinks {
                    iconImage {
                      file {
                        fileName
                        url
                      }
                    }
                    url
                  }
                }
              }
              totalCount
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.error(result.errors)
          return reject(result.errors)
        }

        const pageData = result.data.allContentfulAnnouncement.nodes

        pageData.forEach((newsItem, index) => {
          const pathName = newsItem.url

          createPage({
            path: `/news/${pathName}`,
            component: Announcement,
            context: {
              newsItem: newsItem,
              pathName: pathName,
              index,
            },
          })
        })
      }),
      resolve(
        graphql(
          `
            {
              allContentfulConcertPiece {
                nodes {
                  description {
                    raw
                  }
                  small
                  instrumentation
                  id
                  duration
                  key
                  scoreSample {
                    file {
                      url
                    }
                  }
                  title
                  year
                  movements {
                    mvtNumber
                    description {
                      raw
                    }
                    title
                    key
                    time
                    audio {
                      file {
                        fileName
                        url
                        contentType
                      }
                    }
                  }
                  backgroundImages {
                    file {
                      url
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.error(result.errors)
            return reject(result.errors)
          }

          const pageData = result.data.allContentfulConcertPiece.nodes

          pageData.forEach((piece, index) => {
            const pathName = piece.key

            createPage({
              path: `/music/${pathName}`,
              component: ConcertPiece,
              context: {
                concertPiece: piece,
                pathName: pathName,
                index,
              },
            })
          })
        })
      )
    )
  })
}
