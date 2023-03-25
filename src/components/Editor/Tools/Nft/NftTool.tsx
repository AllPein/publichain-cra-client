import React from 'react';
import ReactDOM from 'react-dom';

import { v4 as uuid } from 'uuid';

import { Provider } from '@/application/Provider/Provider';
import { NftToolComponent } from '@/components/NftToolComponent/NftToolComponent';
import { NftState } from '@/types/nft';

export class Nft {
  private data: NftState;
  private container;

  static get toolbox() {
    return {
      title: 'NFT Embed',
      icon: `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">
        <defs>
        </defs>
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 45 90 c -0.893 0 -1.786 -0.23 -2.582 -0.689 l -34.5 -19.919 c -1.593 -0.92 -2.583 -2.634 -2.583 -4.473 V 25.082 c 0 -1.839 0.99 -3.553 2.583 -4.473 l 34.5 -19.918 c 1.593 -0.92 3.573 -0.92 5.165 0 l 34.5 19.918 c 1.593 0.92 2.582 2.634 2.582 4.473 v 39.837 c 0 1.839 -0.989 3.553 -2.582 4.473 l -34.5 19.919 C 46.786 89.77 45.893 90 45 90 z M 45 2 c -0.547 0 -1.094 0.141 -1.583 0.423 l -34.5 19.918 c -0.976 0.564 -1.583 1.614 -1.583 2.741 v 39.837 c 0 1.127 0.606 2.177 1.583 2.74 l 34.5 19.919 c 0.975 0.562 2.19 0.563 3.165 0 l 34.5 -19.919 c 0.976 -0.563 1.582 -1.613 1.582 -2.74 V 25.082 c 0 -1.127 -0.606 -2.177 -1.582 -2.741 l -34.5 -19.918 C 46.094 2.14 45.547 2 45 2 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 33.604 56.96 c -0.339 0 -0.664 -0.174 -0.85 -0.473 L 20.999 37.548 V 55.96 c 0 0.553 -0.448 1 -1 1 s -1 -0.447 -1 -1 V 34.04 c 0 -0.447 0.296 -0.839 0.726 -0.962 c 0.429 -0.124 0.888 0.055 1.124 0.435 l 11.756 18.94 V 34.04 c 0 -0.552 0.448 -1 1 -1 s 1 0.448 1 1 V 55.96 c 0 0.446 -0.296 0.839 -0.726 0.962 C 33.788 56.947 33.696 56.96 33.604 56.96 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 42.104 56.96 c -0.552 0 -1 -0.447 -1 -1 V 34.04 c 0 -0.552 0.448 -1 1 -1 h 8.718 c 0.553 0 1 0.448 1 1 s -0.447 1 -1 1 h -7.718 V 55.96 C 43.104 56.512 42.656 56.96 42.104 56.96 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 50.822 46 h -8.718 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 8.718 c 0.553 0 1 0.448 1 1 S 51.374 46 50.822 46 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 70.001 35.04 H 57.543 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 h 12.458 c 0.553 0 1 0.448 1 1 S 70.554 35.04 70.001 35.04 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
          <path d="M 63.772 56.96 c -0.553 0 -1 -0.447 -1 -1 V 34.04 c 0 -0.552 0.447 -1 1 -1 c 0.553 0 1 0.448 1 1 V 55.96 C 64.772 56.512 64.325 56.96 63.772 56.96 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
      </svg>
      `,
    };
  }

  constructor({ data }) {
    this.data = data;
    this.container = null;
  }

  render() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'flex justify-center my-12';

      const id = uuid();

      const setData = (newData) => {
        this.data = {
          ...newData,
        };
      };

      ReactDOM.render(
        <Provider>
          <NftToolComponent setData={setData} id={id} nft={this.data} />
        </Provider>,
        this.container,
      );
    }
    return this.container;
  }

  save() {
    return {
      ...this.data,
    };
  }
}
