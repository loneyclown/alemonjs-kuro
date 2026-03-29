import React from 'react';

const C = {
    bg: '#0f1115',
    gold: '#d4b163',
    goldDim: 'rgba(212, 177, 99, 0.2)',
    goldBorder: 'rgba(212, 177, 99, 0.4)',
    panelBg: 'rgba(20, 22, 26, 0.6)',
    panelBorder: 'rgba(255, 255, 255, 0.08)',
    panelBorderTop: 'rgba(255, 255, 255, 0.2)',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textDim: '#6d717a',
    star5: '#d4b163',
    star4: '#843fa1',
    chain: ['#666', '#4fc3f7', '#66bb6a', '#9c6cdb', '#e8a640', '#ff7043', '#ef5350']
};
function DarkContainer({ children, width = 1000 }) {
    return (React.createElement("div", { style: {
            width: `${width}px`,
            backgroundColor: C.bg,
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '30px',
            boxSizing: 'border-box',
            color: C.textPrimary,
            fontFamily: "'tttgbnumber', 'Source Han Sans CN', system-ui, sans-serif"
        } }, children));
}
function UserHeader({ name, uid, level, worldLevel, avatarUrl, decoText = 'ROVER RESONANCE CARD' }) {
    return (React.createElement("div", { style: {
            background: `radial-gradient(circle at 100% 0%, rgba(212,177,99,0.15) 0%, transparent 40%),
                     linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
            borderRadius: '0 0 16px 16px',
            padding: '25px 40px',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            border: `1px solid ${C.panelBorder}`,
            borderTop: `1px solid ${C.panelBorderTop}`,
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
        } },
        React.createElement("div", { style: {
                position: 'absolute',
                top: '20px',
                right: '30px',
                fontSize: '14px',
                letterSpacing: '4px',
                color: 'rgba(255,255,255,0.1)',
                fontWeight: 'bold'
            } }, decoText),
        React.createElement("div", { style: {
                width: '100px',
                height: '100px',
                flexShrink: 0,
                marginRight: '30px',
                position: 'relative',
                borderRadius: '50%',
                border: '3px solid #2a2e35',
                backgroundColor: '#222',
                boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '42px',
                fontWeight: 'bold',
                color: C.gold
            } },
            React.createElement("div", { style: {
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    right: '-8px',
                    bottom: '-8px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderLeft: `2px solid ${C.gold}`,
                    transform: 'rotate(-45deg)',
                    boxShadow: `-2px 2px 10px ${C.goldDim}`
                } }),
            avatarUrl ? React.createElement("img", { src: avatarUrl, style: { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' } }) : name[0]),
        React.createElement("div", { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 } },
            React.createElement("div", { style: {
                    display: 'flex',
                    alignItems: 'baseline',
                    marginBottom: '10px',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    paddingBottom: '8px',
                    position: 'relative'
                } },
                React.createElement("div", { style: {
                        position: 'absolute',
                        bottom: '-1px',
                        left: 0,
                        width: '40px',
                        height: '2px',
                        background: C.gold,
                        boxShadow: `0 0 8px ${C.gold}`
                    } }),
                React.createElement("div", { style: {
                        fontSize: '42px',
                        fontWeight: 800,
                        color: '#fff',
                        marginRight: '20px',
                        textShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    } }, name),
                React.createElement("div", { style: {
                        fontSize: '20px',
                        color: C.gold,
                        background: 'rgba(0,0,0,0.4)',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${C.goldDim}`,
                        letterSpacing: '1.5px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                    } },
                    "UID ",
                    uid)),
            (level !== undefined || worldLevel !== undefined) && (React.createElement("div", { style: { display: 'flex', gap: '40px' } },
                level !== undefined && (React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                    React.createElement("div", { style: {
                            fontSize: '30px',
                            fontWeight: 700,
                            color: '#fff',
                            lineHeight: 1.1
                        } }, level),
                    React.createElement("div", { style: { fontSize: '12px', color: C.textDim, fontWeight: 'bold', letterSpacing: '1px', marginTop: '2px' } }, "\u8054\u89C9\u7B49\u7EA7"))),
                worldLevel !== undefined && (React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                    React.createElement("div", { style: {
                            fontSize: '30px',
                            fontWeight: 700,
                            color: '#fff',
                            lineHeight: 1.1
                        } }, worldLevel),
                    React.createElement("div", { style: { fontSize: '12px', color: C.textDim, fontWeight: 'bold', letterSpacing: '1px', marginTop: '2px' } }, "\u7D22\u62C9\u7B49\u7EA7"))))))));
}
function Section({ title, children, extra }) {
    return (React.createElement("div", { style: {
            backgroundColor: C.panelBg,
            borderRadius: '12px',
            border: `1px solid ${C.panelBorder}`,
            padding: '20px 25px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
        } },
        React.createElement("div", { style: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: '15px'
            } },
            React.createElement("div", { style: {
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '1.5px',
                    marginRight: '20px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)'
                } }, title),
            React.createElement("div", { style: {
                    flex: 1,
                    height: '2px',
                    background: `linear-gradient(90deg, ${C.goldBorder}, transparent)`,
                    boxShadow: '0 0 5px rgba(212,177,99,0.3)'
                } }),
            extra && React.createElement("div", { style: { marginLeft: '15px', color: '#888', fontSize: '18px', fontWeight: 'bold' } }, extra)),
        children));
}
function LightContainer({ children, width = 750 }) {
    return (React.createElement("div", { style: {
            width: `${width}px`,
            backgroundColor: '#f4f7f9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: "'tttgbnumber', 'Noto Sans SC', system-ui, sans-serif",
            color: '#2c3e50'
        } }, children));
}
function LightHeader({ title, subtitle, width }) {
    return (React.createElement("div", { style: {
            width: width ?? '100%',
            background: '#121212',
            padding: '20px 30px',
            boxSizing: 'border-box',
            borderBottom: '3px solid #3498db',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        } },
        React.createElement("div", { style: {
                fontSize: '28px',
                fontWeight: 900,
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                letterSpacing: '1px',
                zIndex: 1
            } }, title),
        subtitle && (React.createElement("div", { style: {
                fontSize: '14px',
                color: 'rgba(255,255,255,0.7)',
                zIndex: 1
            } }, subtitle))));
}
function Footer() {
    return (React.createElement("div", { style: {
            textAlign: 'center',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.3)',
            padding: '10px 0 0'
        } }, "Powered by AlemonJS \u00B7 \u9E23\u6F6E\u52A9\u624B"));
}

export { C, DarkContainer, Footer, LightContainer, LightHeader, Section, UserHeader };
