export class AudioPlayer {
  private static instance: AudioPlayer;
  private audioContext?: AudioContext;
  private audioSource?: AudioBufferSourceNode;
  private isPlaying: boolean = false;

  private constructor() {}

  public static getInstance(): AudioPlayer {
    if (!AudioPlayer.instance) {
      AudioPlayer.instance = new AudioPlayer();
    }
    return AudioPlayer.instance;
  }

  public async play(audioBuffer: ArrayBuffer): Promise<void> {
    // 如果正在播放，先停止当前播放
    this.stop();

    this.audioContext = new AudioContext();
    this.audioSource = this.audioContext.createBufferSource();

    return new Promise((resolve) => {
      this.audioContext!.decodeAudioData(audioBuffer, (buffer) => {
        if (this.audioSource && this.audioContext) {
          this.audioSource.buffer = buffer;
          this.audioSource.connect(this.audioContext.destination);
          this.audioSource.start(0);
          this.isPlaying = true;

          // 播放结束时清理资源
          this.audioSource.onended = () => {
            this.stop();
            resolve();
          };
        }
      });
    });
  }

  public stop(): void {
    if (this.audioSource && this.isPlaying) {
      try {
        this.audioSource.stop();
      } catch (e) {
        // 忽略已经停止的错误
      }
    }

    if (this.audioContext) {
      this.audioContext.close();
    }

    this.audioSource = undefined;
    this.audioContext = undefined;
    this.isPlaying = false;
  }

  public isCurrentlyPlaying(): boolean {
    return this.isPlaying;
  }
}
