module.exports = {
    css: {
      loaderOptions: {
        sass: {
          additionalData: `
            @import "@/sass/app.scss";
          `
        }
      }
    }
  };