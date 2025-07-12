export interface CourseItem {
  id: number;
  name: string;
  parent_id: number;
  children?: CourseItem[];
}