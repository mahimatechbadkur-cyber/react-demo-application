import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ShowBookList from '../components/ShowBookList';
import { dataTestIds } from './common/constants';


describe('ShowBookList component', () => {
  it('render ShowBookList and other UI elements', () => {
    render(<ShowBookList />);
    expect(screen.getByTestId(dataTestIds.showBookList)).toBeInTheDocument();
    const image = screen.getAllByRole('img');
    expect(image[0]).toHaveAttribute('alt','Clean Code');
    expect(image[0]).toHaveAttribute('src', expect.stringContaining('/src/assets/CleanCode.png'));
  });
});