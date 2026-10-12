import { buildMasteringFilterChain } from './filter-chain';

describe('buildMasteringFilterChain', () => {
  it('includes scale and pad for target resolution', () => {
    const chain = buildMasteringFilterChain(1920, 1080);
    expect(chain).toContain('scale=1920:1080');
    expect(chain).toContain('pad=1920:1080');
    expect(chain).toContain('hqdn3d');
  });
});
