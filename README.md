# Video Mastering Engine (v1.0.0)

This is an industrial-grade high-resolution video upscaling and enhancement utility written in TypeScript. It leverages advanced FFmpeg filtering logic to elevate standard definition content into professional 4K/8K formats with enhanced texture retention and color precision.

## Advanced Visual Pipeline
The engine applies the following processing sequence to ensure per-pixel perfection during upscaling:

1.  **Lanczos Mastering Scale**: Precise pixel interpolation using accurate-rounding and bit-exact flags.
2.  **3D Denosing (hqdn3d)**: High-quality spatial and temporal denoising to strip sensor artifacts while preserving legitimate surface textures.
3.  **Contrast Adaptive Sharpening (CAS)**: Perceptual detail reconstruction that enhances the "pop" of the video without inducing sharpening halos or ringing.
4.  **Chroma Normalization (eq)**: 5% contrast and 12% saturation normalization to align with modern HDR-capable displays.
5.  **10-bit Mastering (H.265 x265)**: Output encoded at 10-bit depth (HDR Ready) for smooth gradients and minimal blocking artifacts.

## Usage Guide
Ensure you have FFmpeg installed (`brew install ffmpeg`) and in your system PATH.

### Installation
```bash
npm install
```

### Execution
Run the engine in interactive mode:
```bash
npm start
```

## Technical Dependencies
- TypeScript 5.x
- FFmpeg (libx265 enabled)
- Inquirer (Interactive CLI)
- Chalk & Ora (Status Logic)

## Performance Advisory
Enhancement and upscaling to 8K is a high-intensity computational task. For full-length feature films, ensure sufficient thermal headroom and disk space (HEVC Masters can reach 50GB+ depending on source complexity).
