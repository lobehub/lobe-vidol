import { NextResponse } from 'next/server';

const { randomBytes } = require('node:crypto');

const { WebSocket } = require('ws');

const FORMAT_CONTENT_TYPE = new Map([
  ['raw-16khz-16bit-mono-pcm', 'audio/basic'],
  ['raw-48khz-16bit-mono-pcm', 'audio/basic'],
  ['raw-8khz-8bit-mono-mulaw', 'audio/basic'],
  ['raw-8khz-8bit-mono-alaw', 'audio/basic'],

  ['raw-16khz-16bit-mono-truesilk', 'audio/SILK'],
  ['raw-24khz-16bit-mono-truesilk', 'audio/SILK'],

  ['riff-16khz-16bit-mono-pcm', 'audio/x-wav'],
  ['riff-24khz-16bit-mono-pcm', 'audio/x-wav'],
  ['riff-48khz-16bit-mono-pcm', 'audio/x-wav'],
  ['riff-8khz-8bit-mono-mulaw', 'audio/x-wav'],
  ['riff-8khz-8bit-mono-alaw', 'audio/x-wav'],

  ['audio-16khz-32kbitrate-mono-mp3', 'audio/mpeg'],
  ['audio-16khz-64kbitrate-mono-mp3', 'audio/mpeg'],
  ['audio-16khz-128kbitrate-mono-mp3', 'audio/mpeg'],
  ['audio-24khz-48kbitrate-mono-mp3', 'audio/mpeg'],
  ['audio-24khz-96kbitrate-mono-mp3', 'audio/mpeg'],
  ['audio-24khz-160kbitrate-mono-mp3', 'audio/mpeg'],
  ['audio-48khz-96kbitrate-mono-mp3', 'audio/mpeg'],
  ['audio-48khz-192kbitrate-mono-mp3', 'audio/mpeg'],

  ['webm-16khz-16bit-mono-opus', 'audio/webm; codec=opus'],
  ['webm-24khz-16bit-mono-opus', 'audio/webm; codec=opus'],

  ['ogg-16khz-16bit-mono-opus', 'audio/ogg; codecs=opus; rate=16000'],
  ['ogg-24khz-16bit-mono-opus', 'audio/ogg; codecs=opus; rate=24000'],
  ['ogg-48khz-16bit-mono-opus', 'audio/ogg; codecs=opus; rate=48000'],
]);

class Service {
  ws = null;

  executorMap;
  bufferMap;

  timer = null;

  constructor() {
    this.executorMap = new Map();
    this.bufferMap = new Map();
  }

  async connect() {
    const connectionId = randomBytes(16).toString('hex').toLowerCase();
    const url = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4&ConnectionId=${connectionId}`;
    const ws = new WebSocket(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.66 Safari/537.36 Edg/103.0.1264.44',
      },
      host: 'speech.platform.bing.com',
      origin: 'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold',
    });
    return new Promise((resolve, reject) => {
      ws.on('open', () => {
        resolve(ws);
      });
      ws.on('close', (code: string, reason: string) => {
        // 服务器会自动断开空闲超过30秒的连接
        this.ws = null;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        for (const [value] of this.executorMap) {
          value.reject(`连接已关闭: ${reason} ${code}`);
        }
        this.executorMap.clear();
        this.bufferMap.clear();
        console.info(`连接已关闭： ${reason} ${code}`);
      });

      ws.on('message', (message: string, isBinary: boolean) => {
        const pattern = /X-RequestId:(?<id>[\da-z|]*)/;
        if (!isBinary) {
          const data = message.toString();
          if (data.includes('Path:turn.start')) {
            // 开始传输
            const matches = data.match(pattern);
            const requestId = matches?.groups?.id;
            this.bufferMap.set(requestId, Buffer.from([]));
          } else if (data.includes('Path:turn.end')) {
            // 结束传输
            const matches = data.match(pattern);
            const requestId = matches?.groups?.id;

            const executor = this.executorMap.get(requestId);
            if (executor) {
              this.executorMap.delete(matches?.groups?.id);
              const result = this.bufferMap.get(requestId);
              executor.resolve(result);
              console.info(`传输完成：${requestId}……`);
            } else {
              console.info(`请求已被丢弃：${requestId}`);
            }
          }
        } else if (isBinary) {
          const separator = 'Path:audio\r\n';
          const data = message;
          const contentIndex = data.indexOf(separator) + separator.length;

          const headers = data.slice(2, contentIndex).toString();
          const matches = headers.match(pattern);
          const requestId = matches?.groups?.id;

          const content = data.slice(contentIndex);
          let buffer = this.bufferMap.get(requestId);
          if (buffer) {
            buffer = Buffer.concat([buffer, content], buffer.length + content.length);
            this.bufferMap.set(requestId, buffer);
          } else {
            console.info(`请求已被丢弃：${requestId}`);
          }
        }
      });
      ws.on('error', (error: string) => {
        console.error(`连接失败： ${error}`);
        reject(`连接失败： ${error}`);
      });
    });
  }

  async convert(ssml: string, format: string) {
    // @ts-ignore
    if (this.ws === null || this.ws.readyState !== WebSocket.OPEN) {
      console.info('准备连接服务器……');
      const connection = await this.connect();
      // @ts-ignore
      this.ws = connection;
      console.info('连接成功！');
    }
    const requestId = randomBytes(16).toString('hex').toLowerCase();
    const result = new Promise((resolve, reject) => {
      // 等待服务器返回后这个方法才会返回结果
      this.executorMap.set(requestId, {
        reject,
        resolve,
      });
      // 发送配置消息
      const configData = {
        context: {
          synthesis: {
            audio: {
              metadataoptions: {
                sentenceBoundaryEnabled: 'false',
                wordBoundaryEnabled: 'false',
              },
              outputFormat: format,
            },
          },
        },
      };
      const configMessage =
        `X-Timestamp:${new Date()}\r\n` +
        'Content-Type:application/json; charset=utf-8\r\n' +
        'Path:speech.config\r\n\r\n' +
        JSON.stringify(configData);
      // @ts-ignore
      this.ws.send(configMessage, (configError: any) => {
        if (configError) {
          console.error(`配置请求发送失败：${requestId}\n`);
        }

        // 发送SSML消息
        const ssmlMessage =
          `X-Timestamp:${new Date()}\r\n` +
          `X-RequestId:${requestId}\r\n` +
          `Content-Type:application/ssml+xml\r\n` +
          `Path:ssml\r\n\r\n` +
          ssml;
        // @ts-ignore
        this.ws.send(ssmlMessage, (ssmlError: any) => {
          if (ssmlError) {
            console.error(`SSML消息发送失败：${requestId}\n`);
          }
        });
      });
    });

    // 收到请求，清除超时定时器
    if (this.timer) {
      console.info('收到新的请求，清除超时定时器');
      clearTimeout(this.timer);
    }
    // 设置定时器，超过10秒没有收到请求，主动断开连接
    // @ts-ignore
    this.timer = setTimeout(() => {
      // @ts-ignore
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        // @ts-ignore
        this.ws.close(1000);
        this.timer = null;
      }
    }, 10_000);

    const data = await Promise.race([
      result,
      new Promise((resolve, reject) => {
        setTimeout(() => {
          this.executorMap.delete(requestId);
          this.bufferMap.delete(requestId);
          reject('转换超时');
        }, 10_000);
      }),
    ]);
    return data;
  }
}

const service = new Service();

export const POST = async (req: Request) => {
  const { ssml } = await req.json();
  try {
    const format = 'audio-24khz-48kbitrate-mono-mp3';
    if (Array.isArray(format)) {
      throw `无效的音频格式：${format}`;
    }
    if (!FORMAT_CONTENT_TYPE.has(format)) {
      throw `无效的音频格式：${format}`;
    }

    if (ssml === null) {
      throw `转换参数无效`;
    }
    const result = await service.convert(ssml, format);
    return new Response(result as ArrayBuffer);
  } catch (error) {
    return NextResponse.json({ errorMessage: error });
  }
};
