import { CreateBuyerDto } from "@/create-buyer.dto";
import { Either, left, right } from "@/either";
import { UseCaseHandler1 } from "@/usecase1.handler";


export type CreateBuyerUseCaseHandlerStubResponse = Either<any, any>;

export class UseCaseHandlerStub1 extends UseCaseHandler1 {
  #buyerAlreadyExistsError = false;

  constructor() {
    super();
  }

  async handle(_props: CreateBuyerDto): Promise<CreateBuyerUseCaseHandlerStubResponse> {
    if (this.#buyerAlreadyExistsError)
      return left(new Error(''));

    return right(undefined);
  }

  public emitBuyerAlreadyExistsError(): UseCaseHandlerStub1 {
    this.#buyerAlreadyExistsError = true;
    return this;
  }
}
