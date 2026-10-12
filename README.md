# Video_Enhance

FFmpeg-driven interactive CLI for upscale, denoise, and HEVC mastering.

## Why this exists

Batch video pipelines need repeatable filter chains. This tool wraps common mastering
steps for local, authorized media you own or are licensed to process.

## Features

- Interactive workflow for scale, CAS, and encode presets
- Extension and path helpers with unit tests
- Prettier + Jest in CI

## Install

```bash
git clone https://github.com/HackerX-offical/Video_Enhance.git
cd Video_Enhance
npm install
```

## Quick start

```bash
npm start
```

## Output

Processed video files next to inputs; console progress from FFmpeg invocations.

## Develop

```bash
npm test
npm run format:check
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for module layout and extension points.

## Ethics

Use only on systems and content you are **authorized** to test. See
[SECURITY.md](./SECURITY.md).

## License

Licensed under the [HackerX License](./LICENSE). Redistributions must retain copyright,
license text, and [NOTICE](./NOTICE) attribution per the license terms.
