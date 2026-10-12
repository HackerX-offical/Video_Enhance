import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import { buildMasteringFilterChain } from './ffmpeg/filter-chain';
import { buildOutputOptions } from './ffmpeg/output-options';
import { globMediaFiles } from './io/glob-media';
import { masteredOutputName } from './pipeline/output-name';
import { ENCODER, RESOLUTIONS, SUPPORTED_EXTENSIONS } from './config/defaults';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora, { Ora } from 'ora';
import ffmpeg from 'fluent-ffmpeg';

/**
 * PRODUCTION-GRADE VIDEO MASTERING UTILITY
 * INDUSTRIAL ENHANCEMENT ENGINE (V1.0.0)
 *
 * CORE PIPELINE:
 * - Lanczos 10-bit Accurate Scaling
 * - High-Quality 3D Denoising (hqdn3d)
 * - Contrast Adaptive Sharpening (CAS)
 * - Color Space Normalization & Enhancement (eq)
 */

class VideoMasterer {
  private spinner: Ora;

  constructor() {
    this.spinner = ora();
  }

  public async initialize(): Promise<void> {
    this.validateEnvironment();
    await this.executeWorkflow();
  }

  private validateEnvironment(): void {
    try {
      execSync('ffmpeg -version', { stdio: 'ignore' });
    } catch (error) {
      console.error(
        chalk.red('[CRITICAL] FFmpeg binary not found in system path. Operation halted.'),
      );
      process.exit(1);
    }
  }

  private async executeWorkflow(): Promise<void> {
    console.log(chalk.bold.white('--------------------------------------------------'));
    console.log(chalk.bold.white('ULTRA-HIGH DEFINITION VIDEO MASTERING ENGINE v1.0'));
    console.log(chalk.bold.white('--------------------------------------------------\n'));

    try {
      const files = this.scanMediaFiles();
      const sourceFile = await this.promptSourceFile(files);
      const targetRes = await this.promptTargetResolution();

      const outputFile = masteredOutputName(sourceFile, targetRes.label);
      const outputPath = path.join(process.cwd(), outputFile);

      await this.handleFileCollision(outputPath, outputFile);

      this.logExecutionDetails(sourceFile, targetRes);

      this.spinner.start(`Initializing Mastering Pipeline [${targetRes.label}]...`);
      this.startMastering(sourceFile, outputPath, targetRes);
    } catch (error: any) {
      console.error(chalk.red(`\n[ERROR] Workflow interrupted: ${error.message}`));
      process.exit(1);
    }
  }

  private scanMediaFiles(): string[] {
    const files = globMediaFiles();

    if (files.length === 0) {
      throw new Error('No supported video files detected in project tree.');
    }

    return files;
  }

  private async promptSourceFile(files: string[]): Promise<string> {
    if (files.length === 1) return files[0];

    const { file } = await inquirer.prompt([
      {
        type: 'list',
        name: 'file',
        message: 'Select source media stream:',
        choices: files.map((f) => ({
          name: `${f} [${(fs.statSync(f).size / (1024 * 1024)).toFixed(2)} MB]`,
          value: f,
        })),
        pageSize: 15,
      },
    ]);

    return file;
  }

  private async promptTargetResolution() {
    const { resolution } = await inquirer.prompt([
      {
        type: 'list',
        name: 'resolution',
        message: 'Select target master resolution:',
        choices: RESOLUTIONS,
        pageSize: 5,
      },
    ]);

    return resolution;
  }

  private async handleFileCollision(outputPath: string, filename: string): Promise<void> {
    if (fs.existsSync(outputPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `Target file '${filename}' already exists. Overwrite?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log(chalk.yellow('\n[INFO] Job cancelled by user to prevent data loss.'));
        process.exit(0);
      }
    }
  }

  private logExecutionDetails(source: string, target: any): void {
    console.log(chalk.dim('\nExecution Metadata:'));
    console.log(chalk.white(`- Source path:   ${source}`));
    console.log(chalk.white(`- Output res:    ${target.w}x${target.h} (${target.label})`));
    console.log(chalk.white(`- Quality:       HEVC 10-bit Master (Slow Profile)`));
    console.log(chalk.white(`- Enhancements:  CAS + 3D-Denoise + Unsharp Mask\n`));
  }

  private startMastering(input: string, output: string, res: any): void {
    const filterStr = buildMasteringFilterChain(res.w, res.h);

    ffmpeg(input)
      .outputOptions(buildOutputOptions(filterStr))
      .output(output)
      .on('progress', (progress) => {
        const percent = progress.percent ? progress.percent.toFixed(1) : '0';
        this.spinner.text = `Processing Frame ${progress.frames} [${percent}% Complete] | FPS: ${progress.currentFps || 0}`;
      })
      .on('error', (error) => {
        this.spinner.fail(`[CRITICAL FAILURE] Pipeline halted: ${error.message}`);
        process.exit(1);
      })
      .on('end', () => {
        this.spinner.succeed(`MASTERING COMPLETE: ${output}`);
        console.log(chalk.bold.green('\nProcess finished successfully.\n'));
        process.exit(0);
      })
      .run();
  }
}

// Initializing Core
const masterer = new VideoMasterer();
masterer.initialize().catch((err) => {
  console.error(chalk.red(`[FATAL] Unexpected error: ${err.message}`));
  process.exit(1);
});
