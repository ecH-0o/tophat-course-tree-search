import { useState } from 'react';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { CourseItem } from '../../models/CourseItem';


interface CourseListItemProps {
  items: CourseItem[];
}

export const CourseListItem: React.FC<CourseListItemProps> = ({ items }) => {
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});
  const handleToggle = (id: number) => {
    setOpenMap(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <List>
      {items.map(item => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = Boolean(openMap[item.id]);
        return (
          <div key={item.id}>
            <ListItemButton onClick={() =>
              hasChildren && handleToggle(item.id)
            }>
              <ListItemText primary={item.name} />
              {hasChildren ?
                isOpen ? <ExpandLess /> : <ExpandMore />
                : null}
            </ListItemButton>
            {hasChildren && (
              <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <List sx={{ pl: 4 }}>
                  <CourseListItem items={item.children!} />
                </List>
              </Collapse>
            )}
          </div>
        )
      })}
    </List>
  );
};

export default CourseListItem;