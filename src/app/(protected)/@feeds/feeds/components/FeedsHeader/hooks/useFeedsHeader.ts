import { startTransition, useCallback, useEffect, useState } from 'react';
import { COOKIES } from '@/core/constants/cookies.constant';
import { resizeCookiesAction } from '@/shared/actions/actions/feedsHeader.action';
import { themeCookiesAction } from '@/shared/actions/actions/theme.action';
import { THEME, THEME_ATTRIBUTE } from '@/shared/components/Theme/constants/theme.constant';
import { ASIDE } from '@/shared/constants/resizeHandle.constant';
import type { TTheme } from '@/shared/components/Theme/models/theme.model';
import type { ComponentRef } from 'react';

const useFeedsHeader = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof document === 'undefined') return false;
    const aside = document.querySelector<ComponentRef<'aside'>>('aside[aria-label="Recent"]');
    return aside?.hasAttribute(ASIDE.dataAside) ?? false;
  });

  const [theme, setTheme] = useState<NonNullable<TTheme>>(() => {
    if (typeof document === 'undefined') return THEME.light;
    return (document.documentElement.getAttribute(THEME_ATTRIBUTE) as TTheme) ?? THEME.light;
  });

  useEffect(() => {
    const html = document.querySelector<ComponentRef<'html'>>('html');

    if (!html) return undefined;

    const observer = new MutationObserver(() => {
      setTheme(html.getAttribute(THEME_ATTRIBUTE) as NonNullable<TTheme>);
    });

    observer.observe(html, { attributes: true, attributeFilter: [THEME_ATTRIBUTE] });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const aside = document.querySelector<ComponentRef<'aside'>>('aside[aria-label="Recent"]');
    if (!aside) return undefined;

    const observer = new MutationObserver(() => {
      setIsCollapsed(aside.hasAttribute(ASIDE.dataAside));
    });

    observer.observe(aside, { attributes: true, attributeFilter: [ASIDE.dataAside] });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggle = () => {
    const aside = document.querySelector<ComponentRef<'aside'>>('aside[aria-label="Recent"]');
    if (!aside) return;

    if (aside.hasAttribute(ASIDE.dataAside)) {
      aside.removeAttribute(ASIDE.dataAside);
      startTransition(async () => {
        await resizeCookiesAction(COOKIES.asideCollapsed);
      });
    } else {
      aside.setAttribute(ASIDE.dataAside, '');
      startTransition(async () => {
        await resizeCookiesAction(COOKIES.asideCollapsed, 'true');
      });
    }
  };

  const toggleTheme = useCallback(() => {
    const html = document.querySelector<ComponentRef<'html'>>('html');
    if (html) {
      let attribute: TTheme;
      const themeAttribute = html.getAttribute(THEME_ATTRIBUTE) as TTheme;

      if (themeAttribute === THEME.dark) {
        attribute = THEME.light;
      } else {
        attribute = THEME.dark;
      }

      startTransition(async () => {
        await themeCookiesAction(attribute);
      });

      html.setAttribute(THEME_ATTRIBUTE, attribute);
    }
  }, []);

  return { toggle, toggleTheme, isCollapsed, theme } as const;
};

export { useFeedsHeader };
