import type { MihoyoGame } from '@src/model/mihoyo/types';

// ─── 游戏类型检测 ────────────────────────────────────

const SR_REG = /星铁|星穹铁道|崩铁|崩坏星穹铁道/;
const ZZZ_REG = /绝区零|zzz/i;

export const resolveGame = (text: string): MihoyoGame => {
  if (SR_REG.test(text)) {
    return 'sr';
  }

  if (ZZZ_REG.test(text)) {
    return 'zzz';
  }

  return 'gs';
};

// ─── Mihoyo 挂载数据（纯可序列化对象） ──────────────

export interface MihoyoContext {
  /** 当前消息推断的游戏类型 */
  game: MihoyoGame;
  /** 是否原神 */
  isGs: boolean;
  /** 是否星穹铁道 */
  isSr: boolean;
  /** 是否绝区零 */
  isZzz: boolean;
}
