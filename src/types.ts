export interface Reel {
  id: number;
  title: string;
  imageUrl: string;
  videoUrl: string;
  duration: number;
}

/////////////////////////////////////////////////
// Dialogs
export type DialogDefaultResolveResult = unknown;
export type DialogRejectReason = 'cancel' | 'close';
/////////////////////////////////////////////////
