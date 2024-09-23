import { Injectable } from "@nestjs/common";
import { CreateBuyerDto } from "src/create-buyer.dto";
import { Either, right } from "src/either";
import { UseCaseHandler } from "src/usecase.handler";

@Injectable()
export class UseCaseHandler1 implements UseCaseHandler {
  public async handle(usecase: CreateBuyerDto): Promise<Either<any, any>> {
    // your logic here
    return right(undefined);
  }
}