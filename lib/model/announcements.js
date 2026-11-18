const ANN_CATEGORIES = {
    notice: { key: 'notices', title: '游戏公告', command: '#mc公告', eventType: '3', english: 'NEWS BULLETIN' },
    activity: { key: 'activities', title: '活动速递', command: '#mc公告 活动', eventType: '1', english: 'EVENT UPDATES' },
    info: { key: 'infos', title: '游戏资讯', command: '#mc公告 资讯', eventType: '2', english: 'GAME STORIES' }
};
function parseAnnQuery(input) {
    const match = input.trim().match(/^(?:(游戏公告|公告|活动|资讯)\s*)?([1-9]\d*)?$/);
    if (!match) {
        return null;
    }
    const category = match[1] === '活动' ? 'activity' : match[1] === '资讯' ? 'info' : 'notice';
    const index = match[2] ? Number(match[2]) : undefined;
    return index !== undefined && !Number.isSafeInteger(index) ? null : { category, index };
}
function annTimestamp(value) {
    if ((typeof value !== 'number' && typeof value !== 'string') || String(value).trim() === '') {
        return null;
    }
    const number = Number(value);
    const time = number < 1e12 ? number * 1000 : number;
    return number > 0 && Number.isFinite(time) && Number.isFinite(new Date(time).getTime()) ? time : null;
}
function annPostUrl(postId) {
    const id = typeof postId === 'string' ? postId : typeof postId === 'number' && Number.isSafeInteger(postId) ? String(postId) : '';
    return /^\d{1,24}$/.test(id) ? `https://www.kurobbs.com/mc/post/${id}` : null;
}
function sortedAnnouncements(list) {
    const seen = new Set();
    return (Array.isArray(list) ? list : [])
        .filter(item => {
        if (!item || typeof item.postTitle !== 'string' || !item.postTitle.trim()) {
            return false;
        }
        const url = annPostUrl(item.postId);
        if (url && seen.has(url)) {
            return false;
        }
        if (url) {
            seen.add(url);
        }
        return true;
    })
        .sort((a, b) => (annTimestamp(b.publishTime) ?? annTimestamp(b.firstPublishTime) ?? 0) - (annTimestamp(a.publishTime) ?? annTimestamp(a.firstPublishTime) ?? 0));
}
const snapshots = new Map();
function rememberAnnList(scope, category, items, now = Date.now()) {
    for (const [key, value] of snapshots) {
        if (value.expiresAt <= now) {
            snapshots.delete(key);
        }
    }
    const key = `${scope}:${category}`;
    snapshots.delete(key);
    if (snapshots.size >= 100) {
        snapshots.delete(snapshots.keys().next().value);
    }
    snapshots.set(key, { expiresAt: now + 600000, items: [...items] });
}
function getAnnList(scope, category, now = Date.now()) {
    const key = `${scope}:${category}`;
    const value = snapshots.get(key);
    if (!value || value.expiresAt <= now) {
        snapshots.delete(key);
        return null;
    }
    return [...value.items];
}

export { ANN_CATEGORIES, annPostUrl, annTimestamp, getAnnList, parseAnnQuery, rememberAnnList, sortedAnnouncements };
