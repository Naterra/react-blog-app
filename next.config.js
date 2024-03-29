const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const { styles } = require("@ckeditor/ckeditor5-dev-utils");

module.exports = withSass({
    webpack: (config, { dev }) => {
        config.node = {
            console: true,
            fs: "empty",
            net: "empty",
            tls: "empty"
        };


        config.module.rules.push({
            test: /\.(jpe?g|png|gif|ico|webp|otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            exclude: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
            loaders: ["url-loader"],
        });


        //  ckeditor svg
        config.module.rules.push({
            test: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
            use: ["raw-loader"]
        });

        // 2. ckeditor css
        config.module.rules.push({
            test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
            use: [
                {
                    loader: "style-loader",
                    options: {
                        injectType: "singletonStyleTag"
                    }
                },
                {
                    loader: "postcss-loader",
                    options: styles.getPostCssConfig({
                        themeImporter: {
                            themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
                        },
                        minify: true
                    })
                }
            ]
        });

        return config;
    }
});