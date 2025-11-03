// Signature entity types

export enum SignatureColor {
  Black = 'black',
  Blue = 'blue',
  Red = 'red',
  White = 'white',
  SageGreen = 'sage_green',
}

export enum SyncStatus {
  Pending = 'pending',
  Synced = 'synced',
  Failed = 'failed',
}

export enum SignatureStatus {
  Active = 'active',
  SoftDeleted = 'soft_deleted',
  PermanentlyDeleted = 'permanently_deleted',
}

export interface SignatureLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Signature {
  id: string;
  userId?: string;
  celebrityName: string;
  signatureImagePath: string;
  signatureColor: SignatureColor;
  backgroundColor?: string;
  capturedAt: Date;
  location?: SignatureLocation;
  syncStatus: SyncStatus;
  cloudImageUrl?: string;
  deletedAt?: Date;
  status: SignatureStatus;
}

export interface SignatureFormData {
  celebrityName: string;
  signatureColor: SignatureColor;
  captureLocation: boolean;
}

export interface CanvasPath {
  points: { x: number; y: number }[];
  color: SignatureColor;
}

export interface SignatureCreateInput {
  celebrityName: string;
  signatureImagePath: string;
  signatureColor: SignatureColor;
  backgroundColor?: string;
  location?: SignatureLocation;
}
