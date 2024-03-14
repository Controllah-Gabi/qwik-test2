export const hashPassword = async (password: string): Promise<string> => {
  const { createHash } = await import('crypto');
  const hashedPassword: string = createHash('sha256')
    .update(password)
    .digest('hex');
  return hashedPassword;
};
