import { ASIDE } from '../constants/resizeHandle.constant';

const clamp = (v: number) => Math.min(Math.max(v, ASIDE.asideMinWidth), ASIDE.asideMaxWidth);

export { clamp };
