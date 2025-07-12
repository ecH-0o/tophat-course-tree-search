import { CourseItem } from "./models/CourseItem";

async function fetchCourses (searchTerm: string): Promise<CourseItem[]> {
    const res = await fetch(`https://coursetreesearch-service-sandbox.dev.tophat.com/?query=${searchTerm}`);
    return res.json();
};

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

function mark(modules: CourseItem[], depth = 0) {
    return modules.forEach(item => {
        item.name = `${'-'.repeat(depth)}${depth ? ' ' : ''}${item.name}`;
        mark(item.children!, depth + 1);
    });
}

export { fetchCourses, buildTree, buildTreeArrayReduce };