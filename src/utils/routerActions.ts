import { history } from '@/utils/history';

export function goBack() {
  history.goBack();
}

export function goTo(link: string) {
  history.push(link);
}

export function replaceWith(link: string) {
  history.replace(link);
}
