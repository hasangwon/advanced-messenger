export interface GlobalTypes {
  auth: AuthInterface;
  config: ConfigInterface;
  info: InfosInterface;
}

export interface AuthInterface {
  currentUser: string;
  accessToken: string;
}
export interface ConfigInterface {
  loadingProgress: string;
  isLoaded: boolean;
}

export interface TimerInterface {
  min: number;
  sec: number;
}

export interface InfosInterface {
  userKey: string;
  userName: string;
  userTelNumber: string;
}
