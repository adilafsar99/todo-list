import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: './src/app.js',
    output: {
        filename: '[name].js',
        path: path.resolve(import.meta.dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/todo.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};