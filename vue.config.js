const { defineConfig } = require('@vue/cli-service');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
        ],
    },
    css: {
        extract: true, 
    },
});