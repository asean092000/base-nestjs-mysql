export interface BaseInterface<T = any> extends Function {
  new (...args: any[]): T;
}
