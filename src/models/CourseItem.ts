/**
 * Represents a course item in a course tree structure.
 * 
 * 
 * @property {number} id - ID of the course item.
 * @property {string} name - Display name of the course item.
 * @property {number} parent_id - ID of the parent item (0 if top-level).
 * @property {CourseItem[]} [children] - Optional array of child CourseItems.
 */
export interface CourseItem {
  id: number;
  name: string;
  parent_id: number;
  children?: CourseItem[];
}