import { Format, getConfigValue, useMessage, ResultCode, logger } from 'alemonjs';

function createCommandMarkdown(content) {
    const markdown = Format.createMarkdown();
    markdown.addTitle(content.title).addNewline();
    for (const section of content.sections) {
        markdown.addSubtitle(section.title).addNewline();
        for (const command of section.commands) {
            markdown.addText(`${command.label}：`);
            markdown.addButton(command.command, { type: 'command', data: command.command, autoEnter: command.autoEnter ?? true, commandTarget: false });
            markdown.addNewline();
        }
        markdown.addNewline();
    }
    if (content.navigation?.length) {
        markdown.addDivider();
        for (const command of content.navigation) {
            markdown.addButton(command.label, { type: 'command', data: command.command, autoEnter: command.autoEnter ?? true, commandTarget: false });
            markdown.addNewline();
        }
    }
    if (content.note) {
        markdown.addNewline().addText(content.note);
    }
    return Format.create().addMarkdown(markdown);
}
async function trySendCommandMarkdown(event, content) {
    const config = getConfigValue();
    if (config['alemonjs-kuro']?.markdown?.enabled !== true || event.Platform !== 'qq-bot') {
        return false;
    }
    const [message] = useMessage(event);
    if (config['qq-bot']?.markdownToText === true) {
        const format = Format.create().addText('[鸣潮] Markdown帮助已开启，请先将 qq-bot.markdownToText 改为 false 后重试。');
        await message.send({ format });
        return true;
    }
    try {
        const results = await message.send({ format: createCommandMarkdown(content) });
        if (results.some(result => result.code === ResultCode.Ok)) {
            return true;
        }
    }
    catch {
    }
    logger.warn('[鸣潮] Markdown帮助发送失败，回退图片；请检查QQ自定义Markdown权限。');
    return false;
}

export { createCommandMarkdown, trySendCommandMarkdown };
