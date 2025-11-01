// Soft delete utility functions

import { SignatureStatus } from '@/types/signature.types';
import { SOFT_DELETE_RETENTION_DAYS } from './constants';

export const markAsDeleted = <T extends { status?: string }>(
  item: T
): T & { deletedAt: Date; status: SignatureStatus } => {
  return {
    ...item,
    deletedAt: new Date(),
    status: SignatureStatus.SoftDeleted,
  };
};

export const isPermanentlyDeleted = (item: {
  deletedAt?: Date | string;
}): boolean => {
  if (!item.deletedAt) {
    return false;
  }

  const deletedDate = new Date(item.deletedAt);
  const now = new Date();
  const daysSinceDeleted = Math.floor(
    (now.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysSinceDeleted >= SOFT_DELETE_RETENTION_DAYS;
};

export const filterActiveitems = <
  T extends { status?: string; deletedAt?: Date },
>(
  items: T[]
): T[] => {
  return items.filter(
    (item) =>
      item.status === SignatureStatus.Active ||
      (!item.status && !item.deletedAt)
  );
};

export const filterSoftDeleted = <T extends { status?: string }>(
  items: T[]
): T[] => {
  return items.filter((item) => item.status === SignatureStatus.SoftDeleted);
};

export const canRestore = (item: { deletedAt?: Date | string }): boolean => {
  if (!item.deletedAt) {
    return false;
  }

  return !isPermanentlyDeleted(item);
};

export const restoreItem = <T extends { status?: string; deletedAt?: Date }>(
  item: T
): Omit<T, 'deletedAt'> & { status: SignatureStatus } => {
  const { deletedAt: _deletedAt, ...rest } = item;
  return {
    ...rest,
    status: SignatureStatus.Active,
  };
};

export const getDaysUntilPermanentDeletion = (deletedAt: Date): number => {
  const now = new Date();
  const daysSinceDeleted = Math.floor(
    (now.getTime() - deletedAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const daysRemaining = SOFT_DELETE_RETENTION_DAYS - daysSinceDeleted;
  return Math.max(0, daysRemaining);
};
