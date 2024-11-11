/* eslint-disable typescript-sort-keys/interface */
export interface JWTPayload {
  /**
   * password
   */
  accessCode?: string;
  /**
   *
   * If provider need multi keys like bedrock,
   * this will be used as the checker whether to use frontend key
   */
  apiKey?: string;
  /**
   * Represents the endpoint of provider
   */
  endpoint?: string;

  azureApiVersion?: string;

  awsAccessKeyId?: string;
  awsRegion?: string;
  awsSecretAccessKey?: string;
  awsSessionToken?: string;

  wenxinAccessKey?: string;
  wenxinSecretKey?: string;
}
/* eslint-enable */
