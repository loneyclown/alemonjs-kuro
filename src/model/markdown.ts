import { Format, ResultCode, getConfigValue, logger, useMessage, type EventsEnum } from 'alemonjs';

export interface MarkdownCommand {
  label: string;
  command: string;
  /** 有待填写的参数时只填入输入框，不自动发送 */
  autoEnter?: boolean;
}

export interface CommandMarkdown {
  title: string;
  sections: { title: string; commands: MarkdownCommand[] }[];
  navigation?: MarkdownCommand[];
  note?: string;
}

/** 使用框架原生 Markdown 按钮，指令前缀不参与宿主的二次改写。 */
export function createCommandMarkdown(content: CommandMarkdown) {
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

/** 返回 false 时由调用方继续发送图片；目前只启用已对接点击协议的 QQ 平台。 */
export async function trySendCommandMarkdown(event: EventsEnum, content: CommandMarkdown): Promise<boolean> {
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
  } catch {
    // 失败时仍由图片帮助提供可用入口，不记录上游响应或消息内容。
  }
  logger.warn('[鸣潮] Markdown帮助发送失败，回退图片；请检查QQ自定义Markdown权限。');

  return false;
}
