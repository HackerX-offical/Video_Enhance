import { ENCODER } from '../config/defaults';

export function buildMasteringFilterChain(width: number, height: number): string {
  return [
    `scale=${width}:${height}:force_original_aspect_ratio=decrease:flags=${ENCODER.FLAGS}`,
    `pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2`,
    'hqdn3d=1.5:1.5:6:6',
    'cas=0.6',
    'unsharp=3:3:0.8:3:3:0',
    'eq=contrast=1.05:saturation=1.12',
    `format=${ENCODER.PIX_FMT}`,
  ].join(',');
}
