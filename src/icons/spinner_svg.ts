// The MIT License (MIT)
//
// Copyright (c) 2024 Camptocamp SA
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {svg, SVGTemplateResult} from 'lit';

/**
 * Get the spinner SVG content.
 * @param size The size of the spinner.
 * @returns The spinner SVG content.
 */
export default function (size?: string): string {
  const attributes = size ? ` height="${size}" width="${size}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"${attributes}><circle cx="256" cy="48" r="48" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="109.17" cy="108.313" r="43" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="46.537" cy="257.328" r="38" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="108.028" cy="403.972" r="33" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="255.794" cy="463.935" r="28" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="402.894" cy="402.936" r="23" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="463.623" cy="256.106" r="18" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/></svg>`;
}

/**
 * Get the spinner SVG content as a lit SVGTemplateResult.
 * @param size The size of the spinner.
 * @returns The spinner SVG content as a lit SVGTemplateResult.
 */
export function litIcon(size?: string): SVGTemplateResult {
  const internal = svg`<circle cx="256" cy="48" r="48" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="109.17" cy="108.313" r="43" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="46.537" cy="257.328" r="38" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="108.028" cy="403.972" r="33" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="255.794" cy="463.935" r="28" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="402.894" cy="402.936" r="23" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/><circle cx="463.623" cy="256.106" r="18" style="opacity:1;fill-opacity:1;stroke:#000;stroke-width:0;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"/>`;
  if (size) {
    return svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="${size}" width="${size}">${internal}</svg>`;
  } else {
    return svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${internal}</svg>`;
  }
}
