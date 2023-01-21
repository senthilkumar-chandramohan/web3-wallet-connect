const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    name: 'client',
    target: 'web',
    output: {
        filename: 'bundle.js'
    },
    entry: './src/index.js',
    mode: 'development',
    plugins: [
        new FileManagerPlugin({
            events: {
                onEnd: {
                    copy: [
                        {
                            source: './dist/bundle.js',
                            destination: './public/js/bundle.js',
                            options: {
                                preserveTimestamps: true,
                                overwrite: true,
                            }
                        }
                    ]
                }
            }
        })
    ]
};
