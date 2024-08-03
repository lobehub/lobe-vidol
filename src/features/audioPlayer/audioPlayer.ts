export class AudioPlayer {
  public readonly audio: AudioContext;
  public bufferSource: AudioBufferSourceNode | undefined;

  public constructor(audio: AudioContext) {
    this.audio = audio;
    this.bufferSource = undefined;
  }

  public async playFromArrayBuffer(buffer: ArrayBuffer, onEnded?: () => void) {
    const audioBuffer = await this.audio.decodeAudioData(buffer);

    this.bufferSource = this.audio.createBufferSource();
    this.bufferSource.buffer = audioBuffer;

    this.bufferSource.connect(this.audio.destination);
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
