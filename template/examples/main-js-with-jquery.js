import apex from 'apex';

const $ = apex.jQuery;

// Example function using jquery
export function clickAButton(elementId) {
    console.log('clicking button');
    $(`#${elementId}`).trigger('click');
}
