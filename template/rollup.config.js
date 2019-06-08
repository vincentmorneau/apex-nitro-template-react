import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import config from './apexnitro.config.json';

const NODE_ENV = process.env.BUILD || "development";

export default [
    {
        input: config.main,
        output: {
            name: config.libraryCode,
            file: `${config.distFolder}/${config.projectName}${
                NODE_ENV === 'production' ? '.min' : ''
            }.js`,
            format: 'iife',
            sourcemap: !(NODE_ENV === 'production'),
            globals: {
                apex: 'apex'
            },
        },
        external: [
            'apex'
        ],
        plugins: [
            replace({
                "APEX_NITRO_PROJECT_NAME": JSON.stringify(config.projectName),
                "APEX_NITRO_PROJECT_VERSION": JSON.stringify(config.version || "1.0.0"),
                "process.env.NODE_ENV": JSON.stringify('production')
            }),
            postcss({
                plugins: NODE_ENV === 'production' ? [autoprefixer(), cssnano()] : [],
                extract: true
            }),
            resolve(),
            babel({
                babelrc: true,
            }),
            commonjs(),
            globals(),
            NODE_ENV === 'production' ? terser() : null
        ],
    },
];
