const path = require("path")
require("dotenv").config()

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
}

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.davidhalcampbell.com",
    title: "David Campbell",
    description: "David Campbell Music News and Compositions",
    image: path.join(__dirname, "src/assets/svg/logo.svg"),
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/ContextStore.tsx`),
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-plugin-svgr`,
      options: {
        prettier: true,
        svgo: true,
        memo: true,
        svgoConfig: {
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  // disable plugins
                  cleanupIDs: false,
                  prefixIds: false,
                  removeViewBox: false,
                },
              },
            },
            "removeUselessDefs",
            "removeDimensions",
            "removeRasterImages",
            "reusePaths",
          ],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `David Campbell Website`,
        short_name: `David Campbell`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/svg/logo.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        components: path.join(__dirname, "src/components"),
        src: path.join(__dirname, "src"),
        styles: path.join(__dirname, "src/assets/styles"),
        pages: path.join(__dirname, "src/pages"),
        fonts: path.join(__dirname, "src/assets/fonts"),
        hooks: path.join(__dirname, "src/utils/hooks"),
        images: path.join(__dirname, "src/assets/images"),
        svg: path.join(__dirname, "src/assets/svg"),
        assets: path.join(__dirname, "src/assets"),
        sections: path.join(__dirname, "src/sections"),
        types: path.join(__dirname, "src/types"),
        templates: path.join(__dirname, "src/templates"),
        forms: path.join(__dirname, "src/components/forms"),
        buttons: path.join(__dirname, "src/components/buttons"),
        utils: path.join(__dirname, "src/utils"),
        data: path.join(__dirname, "src/assets/data"),
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: contentfulConfig.spaceId,
        accessToken: contentfulConfig.accessToken,
      },
    },
    {
      resolve: "gatsby-plugin-contentful-optional-fields",
      options: {
        optionalFields: {
          ContentfulAnnouncement: {
            order: "Int",
          },
          ContentfulConcertPiece: {
            audio: {},
          },
          ContentfulMediaPiece: {
            video: {},
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-tsconfig-paths`,
      options: {
        configFile: `${__dirname}/tsconfig.json`,
        silent: true,
      },
    },
  ],
}
