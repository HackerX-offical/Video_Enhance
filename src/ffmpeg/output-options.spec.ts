import { buildOutputOptions } from './output-options';

describe('buildOutputOptions', () => {
  it('passes filter graph via -vf', () => {
    const opts = buildOutputOptions('scale=1:1');
    expect(opts[0]).toBe('-vf');
    expect(opts[1]).toBe('scale=1:1');
    expect(opts.join(' ')).toContain('libx265');
  });
});
