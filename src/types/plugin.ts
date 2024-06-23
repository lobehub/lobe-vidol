import { LobeChatPluginManifest, Meta } from '@lobehub/chat-plugin-sdk';

export interface PluginIndexResponse {
  plugins: LobeChatPluginManifest[];
  schemaVersion: 1;
  tags: string[];
}

export interface Plugin {
  /**
   * 插件 key
   */
  identifier: string;
  /**
   * 插件信息
   */
  manifest: LobeChatPluginManifest;
  /**
   * 插件元数据
   */
  meta: Meta;
}
