import { CreateBuyerDto } from "@/create-buyer.dto";
import { Either, left, right } from "@/either";
import { UseCaseHandler2 } from "@/usecase2.handler";


export type CreateBuyerUseCaseHandlerStubResponse = Either<any, any>;

export class UseCaseHandlerStub2 extends UseCaseHandler2 {
  #someError = false;

  constructor() {
    super();
  }

  async handle(_props: CreateBuyerDto): Promise<CreateBuyerUseCaseHandlerStubResponse> {
    if (this.#someError)
      return left(new Error(''));

    return right(undefined);
  }

  public emitError(): UseCaseHandlerStub2 {
    this.#someError = true;
    return this;
  }
}
