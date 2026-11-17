import type { RoleData } from './types';

/** 完整名字、拼音缩写优先；模糊匹配保留候选供用户确认。 */
export function findMatchingRoles(roles: RoleData[], query: string): RoleData[] {
  const name = query.trim().toLowerCase();

  if (!name) {
    return [];
  }

  const exact = roles.filter(role => role.roleName.toLowerCase() === name);

  if (exact.length) {
    return exact;
  }

  const acronym = roles.filter(role => role.acronym?.toLowerCase() === name);

  return acronym.length ? acronym : roles.filter(role => role.roleName.toLowerCase().includes(name));
}
