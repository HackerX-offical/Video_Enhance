import { ENCODER } from '../config/defaults';

export function buildOutputOptions(filterStr: string): string[] {
  return [
    '-vf',
    filterStr,
    `-c:v ${ENCODER.V_CODEC}`,
    `-tag:v ${ENCODER.TAG}`,
    `-preset ${ENCODER.PRESET}`,
    `-crf ${ENCODER.CRF}`,
    '-x265-params',
    ENCODER.X265_PARAMS,
    `-c:a ${ENCODER.A_CODEC}`,
    '-movflags +faststart',
  ];
}
