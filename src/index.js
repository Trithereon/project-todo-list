import Storage from './storage';
import './styles.css';
import 'modern-normalize/modern-normalize.css';
import EventHandler from './events.js';

Storage.init();
Storage.rebuildFromData();
EventHandler.init();

