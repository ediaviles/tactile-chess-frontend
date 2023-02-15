import { render } from '@testing-library/react';
import Homepage from './Homepage';

test('renders page container', () => {
    render(<Homepage/>);
    expect(screen.getByTestId('container')).toBeInTheDocument();
})