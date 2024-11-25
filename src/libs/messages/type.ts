export interface SpeakAudioOptions {
  onError?: (err: Error) => void;
  onStart?: () => void;
  onComplete?: () => void;
}
