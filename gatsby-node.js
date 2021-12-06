const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const Announcement = path.resolve("./src/templates/Announcement.tsx")

    resolve(
      graphql(
        `
          {
            allContentfulAnnouncement {
              nodes {
                title
                mainImages {
                  file {
                    fileName
                    url
                  }
                }
                articleBlurb {
                  articleBlurb
                }
                contributors {
                  bio {
                    bio
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
        console.log(pageData.contributors)

        pageData.forEach((speaker, index) => {
          const pathName = `${speaker.title.split(" ").join("-")}`.toLowerCase()

          //   createPage({
          //     path: `/${pathName}`,
          //     component: SpeakerPage,
          //     context: { speaker: speaker, allDiscussions: allDiscussions },
          //   });
        })
      })
    )
  })
}
