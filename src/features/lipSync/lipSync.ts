import { LipSyncAnalyzeResult } from './lipSyncAnalyzeResult';

const TIME_DOMAIN_DATA_LENGTH = 2048;

export class LipSync {
  public readonly audio: AudioContext;
  public readonly analyser: AnalyserNode;
  public readonly timeDomainData: Float32Array;
  public bufferSource: AudioBufferSourceNode | undefined;

  public constructor(audio: AudioContext) {
    this.audio = audio;
    this.bufferSource = undefined;

    this.analyser = audio.createAnalyser();
    this.timeDomainData = new Float32Array(TIME_DOMAIN_DATA_LENGTH);
  }

  public update(): LipSyncAnalyzeResult {
    this.analyser.getFloatTimeDomainData(this.timeDomainData);

    let volume = 0;
    for (let i = 0; i < TIME_DOMAIN_DATA_LENGTH; i++) {
      volume = Math.max(volume, Math.abs(this.timeDomainData[i]));
    }

    // cook
    volume = 1 / (1 + Math.exp(-45 * volume + 5));
    if (volume < 0.1) volume = 0;

    return {
      volume,
    };
  }

  public async playFromArrayBuffer(buffer: ArrayBuffer, onEnded?: () => void) {
    const audioBuffer = await this.audio.decodeAudioData(buffer);

    this.bufferSource = this.audio.createBufferSource();
    this.bufferSource.buffer = audioBuffer;

    this.bufferSource.connect(this.audio.destination);
    this.bufferSource.connect(this.analyser);
    this.bufferSource.start();
    if (onEnded) {
      this.bufferSource.addEventListener('ended', onEnded);
    }
  }

  public stopPlay() {
    if (this.bufferSource) this.bufferSource.stop();
  }

  public async playFromURL(url: string, onEnded?: () => void) {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    this.playFromArrayBuffer(buffer, onEnded);
  }
}
