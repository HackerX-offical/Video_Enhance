import { isSupportedMediaExtension } from './media';

describe('media', () => {
  it('accepts known video extensions', () => {
    expect(isSupportedMediaExtension('clip.mkv', ['mkv', 'mp4'])).toBe(true);
    expect(isSupportedMediaExtension('clip.txt', ['mkv'])).toBe(false);
  });
});
