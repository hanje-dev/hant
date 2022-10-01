/**
 * Creates an instance of the element for the specified tag.
 * @param tagName The name of an element.
 */
function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions
): HTMLElementTagNameMap[K];
/** @deprecated */
function createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(
  tagName: K,
  options?: ElementCreationOptions
): HTMLElementDeprecatedTagNameMap[K];
function createElement(
  tagName: string,
  options?: ElementCreationOptions
): HTMLElement;

function createElement(tagName: string, options?: ElementCreationOptions) {
  // eslint-disable-next-line ban/ban
  const node = document.createElement(tagName, options);
  // TODO: uncomment
  // node.setAttribute('data-zv', __ZENT_VERSION__);
  node.setAttribute('data-zv', '1.0.1');
  return node;
}

export default createElement;
