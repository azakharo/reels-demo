export interface BackendReel {
  id: number;
  title: string;
  image: {
    uri: string;
  };
  video: {
    uri: string;
  };
  duration?: number;
}

export interface GetReelsBackendResponseData {
  object: BackendReel[];
}
