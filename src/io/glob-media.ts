import { sync as globSync } from 'glob';
import { SUPPORTED_EXTENSIONS } from '../config/defaults';

export function globMediaFiles(cwd: string = process.cwd()): string[] {
  const pattern = `**/*.{${SUPPORTED_EXTENSIONS.join(',')}}`;
  return globSync(pattern, { cwd, nocase: true });
}
