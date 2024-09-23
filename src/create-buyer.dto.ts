export interface CreateCheckoutBuyerDtoProps {
  readonly fullName: string;
  readonly cellphone: string;
  readonly email: string;
  readonly documentNumber: string;
  readonly ipAddress: string
}

export class CreateBuyerDto {
  public constructor(public props: CreateCheckoutBuyerDtoProps) {}
}
