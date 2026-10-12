import { masteredOutputName } from './output-name';

describe('masteredOutputName', () => {
  it('embeds resolution label', () => {
    expect(masteredOutputName('/tmp/clip.mov', '4K')).toBe('clip_MASTERED_4K.mp4');
  });
});
