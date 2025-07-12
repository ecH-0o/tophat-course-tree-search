import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseSearch from './CourseSearch';
import { useQuery } from '@tanstack/react-query';
import { CourseItem } from '../../models/CourseItem';

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

jest.mock('notistack', () => ({
    enqueueSnackbar: jest.fn(),
}));

const mockCourses: CourseItem[] = [
    {
        id: 210,
        name: 'Module 13: Chemical Kinetics',
        parent_id: 0,
        children: [
            {
                id: 212,
                name: '- Slides: Chemical Kinetics',
                parent_id: 210,
                children: [
                    {
                        id: 216,
                        name: '-- Question 13.4',
                        parent_id: 212,
                        children: [],
                    },
                ],
            },
            {
                id: 211,
                name: '- Reading Assignment: Chemical Kinetics',
                parent_id: 210,
                children: [],
            },
        ],
    },
];

describe('CourseSearch', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not search on empty string and shows an error message', () => {
        const mockRefetch = jest.fn();

        (useQuery as jest.Mock).mockReturnValue({
            data: null,
            status: 'idle',
            refetch: mockRefetch,
        });

        render(<CourseSearch mode="default" />);

        const seacrchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(seacrchButton);

        expect(screen.getByText(/please enter the search term/i)).toBeInTheDocument();
        expect(mockRefetch).not.toHaveBeenCalled();
    });

    it('searches on "chemical"', () => {
        const mockRefetch = jest.fn();
        const searchValue = 'chemistry';

        (useQuery as jest.Mock).mockReturnValue({
            data: mockCourses,
            status: 'success',
            refetch: mockRefetch,
        });

        render(<CourseSearch mode="default" />);

        const input = screen.getByRole('textbox', { name: /search/i });
        fireEvent.change(input, { target: { value: searchValue } });

        const seacrchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(seacrchButton);

        expect(screen.getByText(/Module 13: Chemical Kinetics/i)).toBeInTheDocument();
        expect(mockRefetch).toHaveBeenCalled();
    });

    it('renders Default Page with default mock items', () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: mockCourses,
            status: 'success',
            refetch: jest.fn(),
        });

        render(<CourseSearch mode="default" />);
        expect(screen.getByText(/Module 13: Chemical Kinetics/i)).toBeInTheDocument();
    });

    it('renders Styled Page with styled mock items', () => {
        (useQuery as jest.Mock).mockReturnValue({
            data: mockCourses,
            status: 'success',
            refetch: jest.fn(),
        });

        render(<CourseSearch mode="styled" />);
        expect(screen.getByText(/Module 13: Chemical Kinetics/i)).toBeInTheDocument();
    });
});
