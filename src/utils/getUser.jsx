/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */
import { cache } from 'react';

export const getUser = cache(async (id) => {
  const user = await db.user.findUnique({ id });
  return user;
});
