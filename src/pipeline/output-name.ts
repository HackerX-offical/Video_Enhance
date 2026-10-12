import path from 'path';

export function masteredOutputName(sourceFile: string, label: string): string {
  return `${path.parse(sourceFile).name}_MASTERED_${label}.mp4`;
}
