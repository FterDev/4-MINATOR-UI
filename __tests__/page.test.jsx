import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
  it("should create an HTMLDivElement", async () => {
    const div = render(<Page />).container;
    div instanceof HTMLDivElement;
  });
})