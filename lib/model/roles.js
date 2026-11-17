function findMatchingRoles(roles, query) {
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

export { findMatchingRoles };
