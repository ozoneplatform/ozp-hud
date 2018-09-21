var path = require("path");
var webpack = require("webpack");

var ENV = process.env.NODE_ENV || "development";

module.exports = {
    // This is the main file that should include all other JS files
    entry: "./app/js/main.js",
    target: "web",
    debug: true,
    cache: true,
    output: {
        path: path.join(__dirname, "dist/assets"),
        publicPath: "dist/assets",
        // If you want to generate a filename with a hash of the content (for cache-busting)
        // filename: "main-[hash].js",
        filename: "main.js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        alias: {
            react$: "react/addons",
            jquery$: "jquery/dist/jquery",
            bootstrap$: "bootstrap-sass/assets/javascripts/bootstrap",
            "ozp-react-commons": "ozp-react-commons/app/js",
            bootstrapjs$: "bootstrap/dist/js/bootstrap.js",
            tour$: "bootstrap-tour/build/js/bootstrap-tour.js"
        },
        // Tell webpack to look for required files in bower and node
        modulesDirectories: ['bower_components', './node_modules'],
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            loader: "jsxhint-loader",
            exclude: /node_modules|bower_components|gulp|dist/
        }],
        loaders: [
            { test: /\.css/, loader: "style-loader!css-loader" },
            { test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
            { test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
            { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
            {
                test: /\.jsx?$/,
                loader: "jsx-loader?insertPragma=React.DOM!babel-loader?experimental&optional=runtime",
                include: [
                    path.join(__dirname, 'app/js'),
                    path.join(__dirname, 'node_modules/ozp-react-commons/app/js')
                ]
            }
        ],
        noParse: /\.min\.js/
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify(ENV),
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    externals: {
        OzoneConfig: 'OzoneConfig'
    }
};
