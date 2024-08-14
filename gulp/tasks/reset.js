import del from 'del';
import { filePaths } from '../config/paths.js';

export function reset() {
  return del(filePaths.clean); // Удаляем папку dist перед сборкой
}
