import apex from 'apex';

// Example function using the apex library
export function getItemLabel(elementId) {
    return apex.item(elementId).node.textContent;
}
