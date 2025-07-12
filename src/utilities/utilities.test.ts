import { CourseItem } from '../models/CourseItem';
import { buildTree, buildTreeArrayReduce, fetchCourses } from './utilities';

const flatData: CourseItem[] = [
    { id: 210, name: 'Module 13: Chemical Kinetics', parent_id: 0 },
    { id: 212, name: 'Slides: Chemical Kinetics', parent_id: 210 },
    { id: 216, name: 'Question 13.4', parent_id: 212 },
    { id: 211, name: 'Reading Assignment: Chemical Kinetics', parent_id: 210 }
];

describe('utilities', () => {
    it('buildTree correctly nests children', () => {
        const result = buildTree(flatData);
        expect(result.length).toBe(1);
        expect(result[0].children?.length).toBe(2);
        expect(result[0].children?.[0].children?.[0].name).toContain('Question');
    });

    it('buildTreeArrayReduce correctly nests children', () => {
        const result = buildTreeArrayReduce(flatData);
        expect(result.length).toBe(1);
        expect(result[0].children?.length).toBe(2);
        expect(result[0].children?.[0].children?.[0].name).toContain('Question');
    });

    it('mark() prepends dashes by depth', () => {
        const result = buildTreeArrayReduce(flatData);
        expect(result[0].name).toBe('Module 13: Chemical Kinetics');
        expect(result[0].children?.[0].name).toBe('- Slides: Chemical Kinetics');
        expect(result[0].children?.[0].children?.[0].name).toBe('-- Question 13.4');
    });

    it('fetchCourses makes an API call and returns parsed data', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(flatData),
        });
        const data = await fetchCourses('Kinetics');
        expect(fetch).toHaveBeenCalledWith('https://coursetreesearch-service-sandbox.dev.tophat.com/?query=Kinetics');
        expect(data).toEqual(flatData);
    });
});
