import Task from './create-task';
import './styles.css';
import 'modern-normalize/modern-normalize.css';

const test = new Task(
    'Get your shit together', 
    'Go get all your shit from everywhere you left it and bring it all together',
    1,
    '23 April 2026'
);
console.log(test);

