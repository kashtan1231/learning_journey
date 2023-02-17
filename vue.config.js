module.exports = {
  publicPath: "",
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/design/_colors.scss";
          @import "@/design/_typography.scss";
        `,
      },
    },
  },
}