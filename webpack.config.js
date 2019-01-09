/****************************************************************************\
 * IMPORTS
\****************************************************************************/
const { resolve } = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const thisPath = __dirname;



/****************************************************************************\
 * UTILS & DEFINITIONS
\****************************************************************************/
const config = {
    target: "web",
    entry: {},
    output: {},
    resolve: {
        alias: {},
        extensions: []
    },
    module: {
        rules: []
    },
    plugins: []
};

const path = (...args) => resolve(thisPath, ...args);
const libs = /(node_modules|bower_components)/g;
const styleLoaders = [MiniCssExtractPlugin.loader, /* "style-loader", */ "css-loader"];



/****************************************************************************\
 * CONFIG
\****************************************************************************/
/// ENTRIES
config.entry["flash"] = "./src/flash.js";

/// OUTPUT
config.output = {
    publicPath: path("dist"),
    filename: "[name].js"
};

/// ALIASES
config.resolve.alias["@"] = path("src");

/// EXTENSIONS
["js", "scss", "sass", "css"]
.map(e => `.${e}`)
.forEach(e => config.resolve.extensions.push(e));

/// RULES
config.module.rules.push({
    test: /\.js$/,
    exclude: libs,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }
});

config.module.rules.push({
    test: /\.css$/,
    exclude: libs,
    use: styleLoaders
});

config.module.rules.push({
    test: /\.s[ac]ss$/,
    exclude: libs,
    use: [...styleLoaders, "sass-loader"]
});

/// PLUGINS
config.plugins.push(new MiniCssExtractPlugin({
    filename: "[name].css"
}));



/****************************************************************************\
 * EXPORT
\****************************************************************************/
module.exports = config;