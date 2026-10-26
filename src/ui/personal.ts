import { getProgress } from '../state/store';

/** Fill "{name}" in the learner's own lines with the name she gave at sign-up. */
export function personal(s: string): string {
  return s.includes('{name}') ? s.replaceAll('{name}', getProgress().profile.name.trim() || '…') : s;
}
