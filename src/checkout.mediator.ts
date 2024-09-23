import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { Newable } from "@/newable";
import { Either, left, right } from "@/either";
import { Mediator } from "@/mediator";
import { UseCaseHandler } from "@/usecase.handler";

export type CheckoutMediatorResponse = Either<any, any>;

@Injectable()
export class CheckoutMediator implements Mediator {
  public constructor(
    private readonly handlers: Map<string, Newable<UseCaseHandler>>,
    private readonly moduleRef: ModuleRef
  ) {}

  async send(command: any): Promise<CheckoutMediatorResponse> {
    const handlerClass = this.handlers.get(command.constructor.name);
    const handler = this.moduleRef.get(handlerClass, { strict: false });
    const response = await handler.handle(command);
    if (response.isLeft()) return left(response.value);

    return right(response.value);
  }
}
