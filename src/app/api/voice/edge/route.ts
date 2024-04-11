import { EdgeSpeechTTS } from '@lobehub/tts';
import { Buffer } from 'node:buffer';

// Instantiate EdgeSpeechTTS
const tts = new EdgeSpeechTTS({ locale: 'en-US' });

export const POST = async (req: Request) => {
  const { message, pitch, speed, style, voice } = await req.json();
  // Create speech synthesis request payload
  const payload = {
    input: message,
    options: {
      voice: voice || 'en-US-GuyNeural',
      style,
      pitch: (pitch - 1) / 2,
      rate: speed - 1,
    },
  };

  // Call create method to synthesize speech
  const response = await tts.create(payload);
  const mp3Buffer = Buffer.from(await response.arrayBuffer());

  return new Response(mp3Buffer);
};
