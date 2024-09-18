export interface OpenAIFunctionCall {
  /** 函数调用的参数 */
  arguments: string;
  /** 函数的名称 */
  name: string;
}

export interface OpenAIToolCall {
  /** 工具调用的函数 */
  function: OpenAIFunctionCall;
  /** 工具调用的唯一标识符 */
  id: string;
  /** 调用的类型，固定为 'function' */
  type: 'function';
}
