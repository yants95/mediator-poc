import { CreateCheckoutUseCase } from "src/checkout.usecase";
import { CreateCheckoutDto } from "src/create-checkout.dto";
import { right } from "src/either";
import { CreateCheckoutMediatorStub } from "test/checkout-mediator.stub";

interface Sut {
  sut: CreateCheckoutUseCase;
  mediator: CreateCheckoutMediatorStub;
  checkout: CreateCheckoutDto;
}

const makeSut = (): Sut => {
  const mediator = new CreateCheckoutMediatorStub();
  const checkout = {} as CreateCheckoutDto;
  const sut = new CreateCheckoutUseCase(mediator);

  return {
    sut,
    mediator,
    checkout
  };
};

describe("CheckoutUseCase", () => {
  describe(".buyerHandler", () => {
    it("should call buyerHandler and return right", async () => {
      const { sut, checkout, mediator } = makeSut();
      mediator.addResponse(right({ buyerId: "123" }))
  
      const response = await sut.handle(checkout);
  
      expect(response.isRight()).toBe(true);
    });
  
    it("should call buyerHandler and return left", async () => {
      const { sut, checkout, mediator } = makeSut();
      mediator.withUsecase1Error();
  
      const response = await sut.handle(checkout);
  
      expect(response.isLeft()).toBe(true);
    });
  });
});
