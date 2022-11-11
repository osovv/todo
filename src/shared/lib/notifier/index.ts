type Listener = (_: void) => void;

export class Notifier {
  listeners: Set<Listener>;

  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener: Listener) {
    this.notify();
    this.listeners.add(listener);
    return () => this.listeners.delete(listener) as unknown as void;
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}
