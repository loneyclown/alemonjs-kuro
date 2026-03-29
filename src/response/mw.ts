import { EventsEnum } from 'alemonjs';

export default (e: EventsEnum) => {
  console.log('[鸣潮]', e.name);

  return true;
};
