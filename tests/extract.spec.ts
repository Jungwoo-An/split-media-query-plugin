import { expect } from 'chai';
import extract from '../lib/extract';

describe('extract', () => {
  it('should split media query css into multiple css', () => {
    const TEST_CSS = `
      .test {
        font-size: 14px;
      }

      @media (max-width: 767px) {
        font-size: 10px;
      }

      @media (min-width: 768px) and (max-width: 1023px) {
        font-size: 11px;
      }

      @media (min-width: 1024px) {
        font-size: 12px;
      }

      @media (min-width: 768px) and (max-width: 1023px) {
        color: red;
      }

      @media (min-width: 1024px) {
        color: blue;
      }
    `;

    const extractedCSS = extract(TEST_CSS);

    expect(extractedCSS.length).to.eq(3);
    expect(extractedCSS).to.deep.eq([
      {
        stylesheet: '@media (max-width:767px){font-size: 10px;}',
        query: '@media (max-width:767px);',
      },
      {
        stylesheet:
          '@media (min-width:768px) and (max-width:1023px){font-size: 11px;}@media (min-width:768px) and (max-width:1023px){color: red;}',
        query: '@media (min-width:768px) and (max-width:1023px);',
      },
      {
        stylesheet:
          '@media (min-width:1024px){font-size: 12px;}@media (min-width:1024px){color: blue;}',
        query: '@media (min-width:1024px);',
      },
    ]);
  });
});
