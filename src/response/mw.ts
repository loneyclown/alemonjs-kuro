import { EventsEnum } from 'alemonjs';

export default (e: EventsEnum) => {
  console.log('mhy', e.name);

  // 放行
  return true;
};
