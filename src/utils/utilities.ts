export function isKeyboardEvent(
  event: Event | undefined | null
): event is KeyboardEvent {
  if (!event) {
    return false;
  }

  const {KeyboardEvent} = getWindow(event.target);

  return KeyboardEvent && event instanceof KeyboardEvent;
}

export function getWindow(target: Event['target']): typeof window {
  if (!target) {
    return window;
  }

  if (isWindow(target)) {
    return target;
  }

  if (!isNode(target)) {
    return window;
  }

  return target.ownerDocument?.defaultView ?? window;
}

export function isNode(node: Object): node is Node {
  return 'nodeType' in node;
}

export function isWindow(element: Object): element is typeof window {
  const elementString = Object.prototype.toString.call(element);
  return (
    elementString === '[object Window]' ||
    // In Electron context the Window object serializes to [object global]
    elementString === '[object global]'
  );
}