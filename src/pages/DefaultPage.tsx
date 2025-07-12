import { useMemo } from 'react';
import { buildTreeArrayReduce } from '../utilities';
import { CourseItem } from '../models/CourseItem';

interface DefaultPageProps { data: CourseItem[] }

export const DefaultPage: React.FC<DefaultPageProps> = ({ data }) => {
  const tree = useMemo(() => data ? buildTreeArrayReduce(data) : [], [data]);
  const renderTree = (nodes: any[], level = 0) =>
    nodes.map(n => (
      <div key={n.id} style={{ marginLeft: level * 12 }}>
        {n.name}
        {renderTree(n.children, level + 1)}
      </div>
    ));
  return <div>{ renderTree(tree) }</div>;
};