export interface FotaFormFormikValues {
  biosversion: string;
  fetch: string;
  manufacturer: string;
  path: string;
  product: string;
  releasedate: string;
  signature: string;
  tooloptions: string;
  vendor: string;
  username: string;
  password: string;
}

export type FotaFormField = keyof FotaFormFormikValues;

export interface FotaPayload extends Record<FotaFormField, string> {
}
