const toMetaDescription = (markdown?: string | null): string | undefined => {
  if (!markdown) return undefined;
  const plain = markdown
    .replace(/[#*_~`>[\]!|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > 155 ? `${plain.slice(0, 152)}…` : plain;
};

export { toMetaDescription };
