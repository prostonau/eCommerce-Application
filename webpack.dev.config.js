// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // contentBase: path.resolve(__dirname, '../dist'),
        static: path.resolve(__dirname, '../dist'),
    },
};
