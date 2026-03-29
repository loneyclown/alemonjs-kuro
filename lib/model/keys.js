const prefix = 'data:alemonjs-kuro';
const kuroKeys = {
    base: (data) => `${prefix}${data ?? ''}`,
    userByUid: (uid) => `${prefix}:user:uid:${uid}`,
    uidByUser: (userId) => `${prefix}:uid:user:${userId}`,
    activeUid: (userId) => `${prefix}:active_uid:user:${userId}`,
    queryCache: (uid, api) => `${prefix}:cache:${uid}:${api}`,
    qrLoginLock: (userId) => `${prefix}:qrlogin:lock:${userId}`
};

export { kuroKeys };
