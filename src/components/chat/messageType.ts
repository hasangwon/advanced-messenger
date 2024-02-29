export interface messageDataType {
  content: string;
  createdAt: number;
  id: string;
  see: boolean;
  type: 'text' | 'image' | 'video' | 'file';
  user?: any;
  files?: {
    name: string;
    link: string;
    extension: string;
  }[];
  videos?: {
    name: string;
    link: string;
    extension: string;
    thumbnail: string;
  }[];
  images?: {
    name: string;
    link: string;
    extension: string;
  }[];
}

export interface messageEventType {
  onClickPlayVideo?: (event: unknown) => void;
  onClickShowImage?: (event: unknown) => void;
}

export interface messageComponentType extends messageEventType {
  msgCard: messageDataType;
  hospitalName?: string;
  preMsgCard?: messageDataType;
  nextMsgCard?: messageDataType;
  read?: boolean;
}
