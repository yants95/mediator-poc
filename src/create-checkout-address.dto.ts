export interface CreateCheckoutAddressDtoProps {
  readonly fullName: string;
  readonly cellphone: string;
  readonly email: string;
  readonly documentNumber: string;
  readonly ipAddress: string
}

export class CreateCheckoutAddressDto {
  public constructor(public props: CreateCheckoutAddressDtoProps) {}
}
