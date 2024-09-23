import { CheckoutMediator } from "@/checkout.mediator";
import { CreateCheckoutUseCaseResponse } from "@/checkout.usecase";
import { CreateBuyerDto } from "@/create-buyer.dto";
import { CreateCheckoutAddressDto } from "@/create-checkout-address.dto";
import { left } from "@/either";
import { Newable } from "@/newable";
import { UseCaseHandler } from "@/usecase.handler";
import { ModuleRef } from "@nestjs/core";
import { UseCaseHandlerStub1 } from "test/usecase1.stub";
import { UseCaseHandlerStub2 } from "test/usecase2.stub";

type CheckoutMediatorStubResponse = CreateCheckoutUseCaseResponse<any>;

export class CreateCheckoutMediatorStub extends CheckoutMediator {
  #hasUsecase1Error = false;
  #response: CheckoutMediatorStubResponse;

  constructor() {
    super(
      new Map<string, Newable<UseCaseHandler>>([
        [CreateBuyerDto.name, UseCaseHandlerStub1],
        [CreateCheckoutAddressDto.name, UseCaseHandlerStub2],
      ]),
      {} as ModuleRef
    );
  }

  async send(_command: unknown): Promise<CheckoutMediatorStubResponse> {
    if (this.#hasUsecase1Error)
      return left(new Error("Error in usecase1 handler"));

    return this.#response;
  }

  public withUsecase1Error(): CreateCheckoutMediatorStub {
    this.#hasUsecase1Error = true;
    return this;
  }

  public addResponse(response: any): CreateCheckoutMediatorStub {
    this.#response = response;
    return this;
  }
}
