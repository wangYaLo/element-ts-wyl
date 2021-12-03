export interface raw_type {
  uid: number;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface File_All {
  name: string;
  percentage: number;
  raw: raw_type;
  response: response_All
  size: number;
  status: string;
  uid: number;
}
export interface response_All {
  code: number;
  msg: string | null;
  data: { docuId: string, url: string };
}
