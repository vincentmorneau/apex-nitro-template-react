import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import config from './apexnitro.config.json';

export default [
    {
        input: config.main,
        output: {
            name: config.libraryCode,
            file: `${config.distFolder}/${config.projectName}${
                process.env.BUILD === 'production' ? '.min' : ''
            }.js`,
            format: 'iife',
            sourcemap: process.env.BUILD === 'production' ? false : 'inline',
            globals: {
                apex: 'apex',
                React: 'React',
                ReactDOM: 'ReactDOM',
            },
        },
        external: ['apex', 'React', 'ReactDOM'],
        plugins: [
            replace({
                include: config.main,
                values: {
                    NPM_PACKAGE_PROJECT_NAME: config.projectName,
                    NPM_PACKAGE_PROJECT_VERSION: config.version,
                },
            }),
            postcss({
                extensions: config.cssExtensions,
                plugins: process.env.BUILD === 'production' ? [autoprefixer(), cssnano()] : [],
                extract: `${config.distFolder}/${config.projectName}${
                    process.env.BUILD === 'production' ? '.min' : ''
                }.css`,
            }),
            resolve({
                mainFields: ['main'],
            }),
            commonjs(),
            eslint({ exclude: ['node_modules/**', 'src/styles/**'] }),
            babel({
                babelrc: true,
            }),
            process.env.BUILD === 'production' ? terser() : null,
        ],
    },
];
