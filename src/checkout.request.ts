import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreateCheckoutDto } from "src/create-checkout.dto";

export class CreateCheckoutRequest {
  @IsNotEmpty()
  @ValidateNested()
  public buyer!: any;

  public toDto(ipAddress: string): CreateCheckoutDto {
    return {
      buyer: {
        ...this.buyer,
        ipAddress,
      },
    };
  }
}
