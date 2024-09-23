import { Either } from "src/either";

export abstract class UseCaseHandler {
  public abstract handle(usecase: any): Promise<Either<any, any>>;
}
