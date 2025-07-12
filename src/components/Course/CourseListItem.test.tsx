import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseListItem from './CourseListItem';
import { CourseItem } from '../../models/CourseItem';

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

describe('CourseListItem', () => {
    it('renders parent items', () => {
        render(<CourseListItem items={mockCourses} />);
        expect(screen.getByText(/Module 13: Chemical Kinetics/i)).toBeInTheDocument();
    });

    it('renders child items on click', async () => {
        render(<CourseListItem items={mockCourses} />);

        const parentItem = screen.getByText(/Module 13: Chemical Kinetics/i);
        fireEvent.click(parentItem);

        const childItem = screen.getByText(/- Slides: Chemical Kinetics/i);
        expect(childItem).toBeInTheDocument();
        fireEvent.click(childItem);

        const grandChildItem = screen.getByText(/-- Question 13.4/i);
        expect(grandChildItem).toBeInTheDocument();

        fireEvent.click(childItem);
        await waitForElementToBeRemoved(() => screen.queryByText(/-- Question 13.4/i));
    });

    it('collapses rendered child items on second click', async () => {
        render(<CourseListItem items={mockCourses} />);

        const parentItem = screen.getByText(/Module 13: Chemical Kinetics/i);
        fireEvent.click(parentItem);

        const childItem = screen.getByText(/- Slides: Chemical Kinetics/i);
        expect(childItem).toBeInTheDocument();
        fireEvent.click(parentItem);
        await waitForElementToBeRemoved(() => screen.queryByText(/- Slides: Chemical Kinetics/i));
    });
});
