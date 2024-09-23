import { Body, Controller, Post, Ip } from "@nestjs/common";
import { CreateCheckoutRequest } from "src/checkout.request";
import { CreateCheckoutUseCase } from "src/checkout.usecase";

@Controller({ path: "checkout", version: "1" })
export class CreateCheckoutController {
  constructor(private readonly usecase: CreateCheckoutUseCase) {}

  @Post('/checkout')
  async handle(@Body() body: CreateCheckoutRequest, @Ip() ip: string): Promise<void> {
    await this.usecase.handle(body.toDto(ip));
  }
}
