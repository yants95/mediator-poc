import { CheckoutMediator } from "@/checkout.mediator";
import { CreateBuyerDto } from "@/create-buyer.dto";
import { CreateCheckoutAddressDto } from "@/create-checkout-address.dto";
import { Newable } from "@/newable";
import { UseCaseHandler } from "@/usecase.handler";
import { UseCaseHandler1 } from "@/usecase1.handler";
import { UseCaseHandler2 } from "@/usecase2.handler";
import { ModuleRef } from "@nestjs/core";
import { UseCaseHandlerStub1 } from "test/usecase1.stub";
import { UseCaseHandlerStub2 } from "test/usecase2.stub";
import { vi } from "vitest";

interface Sut {
  sut: CheckoutMediator;
  usecase1: UseCaseHandler1;
  usecase2: UseCaseHandler2;
}

const makeSut = (): Sut => {
  const usecase1 = {} as UseCaseHandler1;
  const usecase2 = {} as UseCaseHandler2;
  const moduleRefMock = { get: vi.fn() };

  const sut = new CheckoutMediator(
    new Map<string, Newable<UseCaseHandler>>([
      [CreateBuyerDto.name, UseCaseHandlerStub1],
      [CreateCheckoutAddressDto.name, UseCaseHandlerStub2]
    ]),
    moduleRefMock as unknown as ModuleRef
  );

  moduleRefMock.get = vi.fn().mockReturnValue(usecase1);

  return {
    sut,
    usecase1,
    usecase2
  };
};

describe("CreateCheckoutMediator", () => {
  describe(".usecase1", () => {
    it("should be able to call usecase1 and return right", async () => {
      const { sut } = makeSut();
      const buyer = {} as CreateBuyerDto;
  
      const response = await sut.send(buyer);
  
      expect(response.isRight()).toBe(true);
    });
  
    it("should be able to call usecase1 and return left", async () => {
      const { sut } = makeSut();
      const buyer = {} as CreateBuyerDto;
      // mock usecase1 error here
  
      const response = await sut.send(buyer);
  
      expect(response.isLeft()).toBe(true);
    });
  });
});
