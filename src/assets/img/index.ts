// ─── 元素图标 ────────────────────────────────────────
import anemo from './element/anemo.png';
import cryo from './element/cryo.png';
import dendro from './element/dendro.png';
import electro from './element/electro.png';
import geo from './element/geo.png';
import hydro from './element/hydro.png';
import multi from './element/multi.png';
import pyro from './element/pyro.png';

/** 元素名称 → 图标路径 (中文 key) */
export const ELEMENT_ICONS: Record<string, string> = {
  风: anemo,
  冰: cryo,
  草: dendro,
  雷: electro,
  岩: geo,
  水: hydro,
  火: pyro,
  物理: multi
};

/** 元素名称 → 图标路径 (英文 key) */
export const ELEMENT_ICONS_EN: Record<string, string> = {
  Anemo: anemo,
  Cryo: cryo,
  Dendro: dendro,
  Electro: electro,
  Geo: geo,
  Hydro: hydro,
  Pyro: pyro,
  Physical: multi
};

// ─── UI 图标 ─────────────────────────────────────────
import iconAbyss from './icon/abyss.png';
import iconLedger from './icon/ledger.png';
import iconPaimon from './icon/paimon.png';
import iconRole from './icon/role.png';
import iconSign from './icon/sign.png';
import iconTeam from './icon/team.png';
import iconWeapon from './icon/weapon.png';
import iconTcg from './icon/七圣召唤.png';
import iconPrimogem from './icon/原石.png';
import iconCheckin from './icon/打卡.png';
import iconGuide from './icon/攻略.png';
import iconStarglitter from './icon/星辉.png';
import iconResin from './icon/树脂.png';
import iconMiyoushe from './icon/米游社.png';
import iconFate from './icon/纠缠之缘.png';
import iconBind from './icon/绑定账号.png';
import iconStats from './icon/统计.png';
import iconRecord from './icon/记录.png';
import iconHelp from './icon/问号.png';

export const UI_ICONS = {
  abyss: iconAbyss,
  ledger: iconLedger,
  paimon: iconPaimon,
  role: iconRole,
  sign: iconSign,
  team: iconTeam,
  weapon: iconWeapon,
  resin: iconResin,
  primogem: iconPrimogem,
  starglitter: iconStarglitter,
  fate: iconFate,
  miyoushe: iconMiyoushe,
  help: iconHelp,
  bind: iconBind,
  record: iconRecord,
  stats: iconStats,
  guide: iconGuide,
  checkin: iconCheckin,
  tcg: iconTcg
} as const;

// ─── 背景与装饰 ──────────────────────────────────────
import bgWebp from './other/bg.webp';
import bg105 from './other/bg105.png';
import bg3 from './other/bg3.png';
import bg4 from './other/bg4.png';
import bg5 from './other/bg5.png';
import fill from './other/fill.png';
import genshinLogo from './other/原神.png';

export const BG_IMAGES = {
  bg: bgWebp,
  bg3,
  bg4,
  bg5,
  bg105,
  fill,
  genshinLogo
} as const;

// ─── 世界探索地图 ────────────────────────────────────
import chasm from './other/层岩巨渊.png';
import nodKalei from './other/挪德卡莱.png';
import oldSea from './other/旧日之海.png';
import fontaine from './other/枫丹.png';
import chenyu from './other/沉玉谷.png';
import enkanomiya from './other/渊下宫.png';
import liyue from './other/璃月.png';
import inazuma from './other/稻妻.png';
import natlan from './other/纳塔.png';
import mondstadt from './other/蒙德.png';
import ancientMountain from './other/远古圣山.png';
import dragonspine from './other/雪山.png';
import sumeru from './other/须弥.png';

/** 地区中文名 → 图标路径 */
export const REGION_ICONS: Record<string, string> = {
  蒙德: mondstadt,
  璃月: liyue,
  稻妻: inazuma,
  须弥: sumeru,
  枫丹: fontaine,
  纳塔: natlan,
  雪山: dragonspine,
  龙脊雪山: dragonspine,
  渊下宫: enkanomiya,
  层岩巨渊: chasm,
  层岩巨渊·地下矿区: chasm,
  沉玉谷: chenyu,
  旧日之海: oldSea,
  挪德卡莱: nodKalei,
  远古圣山: ancientMountain
};
