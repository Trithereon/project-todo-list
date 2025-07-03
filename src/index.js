import Task from './task';
import Project from './project';
import './styles.css';
import 'modern-normalize/modern-normalize.css';

// Tests
const testTask = new Task(
    'Get your **** together', 
    'Go get all your **** from everywhere you left it and bring it all together',
    'High',
    '23 April 2026'
);

const testProject = new Project('Unassigned tasks');

console.log('Adding a task to Project...');
testProject.addTask(testTask);
console.log(testProject);

console.log('Modifying task title... (uses getTaskById to get task object)');
testProject.updateTask(
    testTask.id, 
    {title: 'Modified title successfully'}
);
console.log(testTask);
console.log(testProject);

console.log('Now deleting the task...');
testProject.deleteTask(testTask.id);
console.log("Testing getTaskList() below...")
console.log(testProject.getTaskList());

// End of tests
