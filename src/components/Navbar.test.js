import { render } from '@testing-library/react';
import Navbar from './Navbar';

test('renders page container', () => {
    render(<Navbar/>);
    expect(screen.getByTestId('navbar-container')).toBeInTheDocument();
})