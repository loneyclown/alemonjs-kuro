import React from 'react';
import HTML from './HTML.js';

function CalabashCard({ data }) {
    const { calabash } = data;
    return (React.createElement(HTML, { style: { minWidth: '480px' } },
        React.createElement("div", { style: {
                padding: '24px',
                fontFamily: '"tttgbnumber", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                color: '#ffffff'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '16px',
                    color: '#2d2d2d'
                } },
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } }, "\u6570\u636E\u575E"),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } },
                    "UID: ",
                    data.uid)),
            React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px',
                    display: 'flex',
                    justifyContent: 'space-around'
                } },
                React.createElement("div", { style: { textAlign: 'center' } },
                    React.createElement("div", { style: { fontSize: '24px', fontWeight: 'bold', color: '#e8d5b0' } }, calabash.level),
                    React.createElement("div", { style: { fontSize: '12px', opacity: 0.6, marginTop: '2px' } }, "\u6570\u636E\u575E\u7B49\u7EA7")),
                React.createElement("div", { style: { textAlign: 'center' } },
                    React.createElement("div", { style: { fontSize: '24px', fontWeight: 'bold', color: '#4fc3f7' } }, calabash.baseCatch),
                    React.createElement("div", { style: { fontSize: '12px', opacity: 0.6, marginTop: '2px' } }, "\u57FA\u7840\u5438\u6536\u7387")),
                React.createElement("div", { style: { textAlign: 'center' } },
                    React.createElement("div", { style: { fontSize: '24px', fontWeight: 'bold', color: '#81c784' } }, calabash.strengthenCatch),
                    React.createElement("div", { style: { fontSize: '12px', opacity: 0.6, marginTop: '2px' } }, "\u5F3A\u5316\u5438\u6536\u7387")),
                React.createElement("div", { style: { textAlign: 'center' } },
                    React.createElement("div", { style: { fontSize: '24px', fontWeight: 'bold', color: '#ffb74d' } },
                        calabash.cost,
                        "/",
                        calabash.maxCost),
                    React.createElement("div", { style: { fontSize: '12px', opacity: 0.6, marginTop: '2px' } }, "Cost"))),
            calabash.phantomList && calabash.phantomList.length > 0 && (React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px'
                } },
                React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: '#e8d5b0' } },
                    "\u5DF2\u6536\u96C6\u58F0\u9AB8 (",
                    calabash.phantomList.length,
                    ")"),
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, calabash.phantomList.map((p, i) => (React.createElement("div", { key: i, style: {
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '8px',
                        padding: '8px',
                        width: '85px',
                        textAlign: 'center',
                        boxSizing: 'border-box'
                    } },
                    p.iconUrl && (React.createElement("img", { src: p.iconUrl, style: {
                            width: '40px',
                            height: '40px',
                            borderRadius: '6px',
                            marginBottom: '4px'
                        } })),
                    React.createElement("div", { style: {
                            fontSize: '10px',
                            lineHeight: '1.2',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        } }, p.name),
                    React.createElement("div", { style: { fontSize: '10px', opacity: 0.5 } },
                        "C",
                        p.cost))))))))));
}

export { CalabashCard as default };
