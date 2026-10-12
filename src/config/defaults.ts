export interface ResolutionConfig {
  name: string;
  value: { w: number; h: number; label: string };
}

export const SUPPORTED_EXTENSIONS = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv'];

export const RESOLUTIONS: ResolutionConfig[] = [
  { name: '8K Ultra HD (7680x4320)', value: { w: 7680, h: 4320, label: '8K' } },
  { name: '4K Ultra HD (3840x2160)', value: { w: 3840, h: 2160, label: '4K' } },
  { name: '2K QHD (2560x1440)', value: { w: 2560, h: 1440, label: '2K' } },
  { name: '1080p Full HD (1920x1080)', value: { w: 1920, h: 1080, label: '1080p' } },
];

export const ENCODER = {
  PRESET: 'slow',
  CRF: 16,
  V_CODEC: 'libx265',
  A_CODEC: 'copy',
  PIX_FMT: 'yuv420p10le',
  TAG: 'hvc1',
  FLAGS: 'lanczos+accurate_rnd+bitexact',
  X265_PARAMS: 'aq-mode=3:strong-intra-smoothing=0:psy-rd=2.0:psy-rdoq=1.0:rd=4',
};
