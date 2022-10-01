"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const css_compiler_constants_1 = require("./css-compiler-constants");
const pkg = require("../package.json");
/**
 * Define compiler constants here.
 *
 * Keys are variables names, these variables will be replaced by their value during compile.
 *
 * Value type must be correct, don't use a string for a number constant.
 */
console.log(pkg.version);
const BuiltinConstants = {
    __ARROW_OFFSET_HORIZONTAL__: css_compiler_constants_1.CSS_ARROW_OFFSET_HORIZONTAL + css_compiler_constants_1.CSS_ARROW_SIZE / 2,
    __ARROW_OFFSET_VERTICAL__: css_compiler_constants_1.CSS_ARROW_OFFSET_VERTICAL + css_compiler_constants_1.CSS_ARROW_SIZE / 2,
    __ZENT_VERSION__: pkg.version,
};
const hasOwn = Object.prototype.hasOwnProperty;
function compilerConstantsTransformer(_program) {
    function createVisitor(ctx) {
        const visitor = (node) => {
            if (ts.isIdentifier(node)) {
                const { text: idName } = node;
                if (hasOwn.call(BuiltinConstants, idName)) {
                    const value = BuiltinConstants[idName];
                    console.log('------------------------');
                    console.log('------------------------');
                    console.log(value);
                    console.log('------------------------');
                    console.log('------------------------');
                    if (typeof value === 'string') {
                        return ts.factory.createStringLiteral(value);
                    }
                    else if (typeof value === 'number') {
                        return ts.factory.createNumericLiteral(value);
                    }
                    else {
                        throw new Error(`unknow constant type ${value}`);
                    }
                }
            }
            return ts.visitEachChild(node, visitor, ctx);
        };
        return visitor;
    }
    return (ctx) => {
        return (src) => {
            return ts.visitNode(src, createVisitor(ctx));
        };
    };
}
exports.default = compilerConstantsTransformer;
