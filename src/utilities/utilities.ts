import { CourseItem } from "../models/CourseItem";

/**
 * Fetches a list of course items from TopHat.
 *
 * @param {string} searchTerm - The search query.
 * @returns {Promise<CourseItem[]>} A promise resolving to a flat list of CourseItems.
 */
async function fetchCourses (searchTerm: string): Promise<CourseItem[]> {
    const res = await fetch(`https://coursetreesearch-service-sandbox.dev.tophat.com/?query=${searchTerm}`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
};

/**
 * Builds a tree of CourseItems using Array.reduce().
 * 
 * @param {CourseItem[]} apiList - Flat list of CourseItems from the API.
 * @returns {CourseItem[]} A nested tree of CourseItems.
 */
function buildTreeArrayReduce(apiList: CourseItem[]) {
    const modules: CourseItem[] = [];

    const nodeMap = apiList.reduce((node: any, item) => {
        node[item.id] = { ...item, children: [] };
        return node;
    }, {});

    apiList.forEach((item) => {
        if (item.parent_id === 0) {
            modules.push(nodeMap[item.id]);
        } else {
            nodeMap[item.parent_id].children
                .push(nodeMap[item.id]);
        }
    });
    mark(modules);
    return modules;
}

/**
 * Alternative: Builds a tree of CourseItems using a Map.
 *
 * @param {CourseItem[]} apiList - Flat list of CourseItems from the API.
 * @returns {CourseItem[]} - A nested tree of CourseItems.
 */
function buildTree(apiList: CourseItem[]) {
    const map = new Map<number, CourseItem>();
    const modules: CourseItem[] = [];
    apiList.forEach(item => {
        map.set(item.id, { ...item, children: [] });
    });

    map.forEach(node => {
        if (map.has(node.parent_id) && node.parent_id !== 0) {
            map.get(node.parent_id)!.children!.push(node);
        } else {
            modules.push(node);
        }
    });

    mark(modules);
    return modules;
}

/**
 * Recursively prepends hyphens to item names to visually indicate depth in the tree.
 * For example: "Question 1.1" → "- Question 1.1" → "-- Question 1.1" depending on depth.
 * 
 * @param {CourseItem[]} modules - The nested CourseItems to format.
 * @param {number} depth - Current depth level, (default: 0).
 */
function mark(modules: CourseItem[], depth = 0) {
    return modules.forEach(item => {
        item.name = `${'-'.repeat(depth)}${depth ? ' ' : ''}${item.name}`;
        mark(item.children!, depth + 1);
    });
}

export { fetchCourses, buildTree, buildTreeArrayReduce };