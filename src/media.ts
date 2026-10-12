export function isSupportedMediaExtension(filename: string, supported: readonly string[]): boolean {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return supported.includes(ext);
}
