import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Page from '../src/app/page'
 
describe('Page', () => {
  it("should create an HTMLDivElement", async () => {
    const div = render(<Page />).container;
    div instanceof HTMLDivElement;
  });
})