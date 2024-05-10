import React from 'react';
import { render } from '@testing-library/react';
import FmNavButtonContent from './fmnavbuttoncontent';

describe('FmNavButtonContent', () => {
  it('renders the text correctly', () => {
    const text = 'Button Text';
    const { getByText } = render(<FmNavButtonContent text={text} icon={<div />} />);
    expect(getByText(text)).toBeInTheDocument();
  });

  it('renders the icon correctly', () => {
    const icon = <svg />;
    const { container } = render(<FmNavButtonContent text="Button Text" icon={icon} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});