import chapter1 from './docker/chapter1-new.js';
import chapter2 from './docker/chapter2-new.js';
import chapters37 from './docker/chapters3-7.js';
import chapters67 from './docker/chapters6-7.js';

export default {
  id: 'docker',
  name: 'Docker',
  icon: '🐳',
  status: 'learning',
  description: '从零到精通：Docker + PHP/TP6 完整实战路线',
  chapters: [
    chapter1,
    chapter2,
    chapters37.chapter3,
    chapters37.chapter4,
    chapters37.chapter5,
    chapters67.chapter6,
    chapters67.chapter7
  ]
};
