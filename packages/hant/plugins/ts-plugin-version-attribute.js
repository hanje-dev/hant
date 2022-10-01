"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const pkg = require("../package.json");
// keep it short, it bloats code
const VERSION_ATTRIBUTE_NAME = 'data-zv';
function htmlElementTransformer(_program) {
    function createVisitor(ctx) {
        const visitor = (node) => {
            if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
                const { tagName } = node;
                if (ts.isIdentifier(tagName) && isNativeHtmlTag(tagName.text)) {
                    const attributes = ts.factory.createJsxAttributes([].concat(node.attributes.properties, ts.factory.createJsxAttribute(ts.factory.createIdentifier(VERSION_ATTRIBUTE_NAME), ts.factory.createStringLiteral(pkg.version))));
                    if (ts.isJsxOpeningElement(node)) {
                        return ts.factory.updateJsxOpeningElement(node, node.tagName, node.typeArguments, attributes);
                    }
                    else if (ts.isJsxSelfClosingElement(node)) {
                        return ts.factory.updateJsxSelfClosingElement(node, node.tagName, node.typeArguments, attributes);
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
exports.default = htmlElementTransformer;
function isNativeHtmlTag(tagName) {
    return tagName.toLowerCase() === tagName;
}
