import { useRef, type ComponentRef } from 'react';

const useMenuListVirtual = () => {
  const menuRef = useRef<ComponentRef<'div'>>(null);
  const innerRef = useRef<ComponentRef<'div'>>(null);

  return { menuRef, innerRef } as const;
};

export { useMenuListVirtual };
