const prefix = 'data:alemonjs-kuro';
const kuroKeys = {
    base: (data) => `${prefix}${data ?? ''}`,
    userByUid: (uid, userId) => {
        if (!userId) {
            throw new Error('缺少凭据所属用户');
        }
        return `${prefix}:user:${encodeURIComponent(userId)}:uid:${encodeURIComponent(uid)}`;
    },
    uidByUser: (userId) => `${prefix}:uid:user:${userId}`,
    activeUid: (userId) => `${prefix}:active_uid:user:${userId}`,
    queryCache: (uid, api) => `${prefix}:cache:${uid}:${api}`,
    qrLoginLock: (userId) => `${prefix}:qrlogin:lock:${userId}`
};

export { kuroKeys };
