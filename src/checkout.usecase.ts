import { Inject, Injectable } from "@nestjs/common";
import { CreateBuyerDto } from "src/create-buyer.dto";
import { CreateCheckoutDto } from "src/create-checkout.dto";
import { Either, right } from "src/either";
import { Mediator } from "src/mediator";

export type CreateCheckoutUseCaseResponse<R> = Either<any, R>;

@Injectable()
export class CreateCheckoutUseCase {
  constructor(@Inject(Mediator) private readonly mediator: Mediator) {}

  async handle(dto: CreateCheckoutDto): Promise<CreateCheckoutUseCaseResponse<void>> {
    const buyer = new CreateBuyerDto(dto.buyer.props);
    await this.mediator.send<CreateBuyerDto>(buyer);

    return right(undefined);
  }
}
