export abstract class Mediator {
  public abstract send<T>(command: T): Promise<any>;
}
