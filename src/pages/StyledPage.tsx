import { useMemo } from 'react';
import CourseListItem from '../components/Course/CourseListItem';
import { CourseItem } from '../models/CourseItem';
import { buildTree } from '../utilities';

interface StyledPageProps { data: CourseItem[] }

export const StyledPage: React.FC<StyledPageProps> = ({ data }) => {
    const styledTree = useMemo(() => data ? buildTree(data) : [], [data]);
    return <CourseListItem items={styledTree} />;
};