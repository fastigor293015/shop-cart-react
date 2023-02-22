import * as icons from "../icons";
import { SvgIcon } from "@mui/material";

export enum PaymentIcons {
  amex = "AmericanExpressIcon",
  dinersclub = "DinersClubIcon",
  jcb = "JcbIcon",
  maestro = "MaestroIcon",
  mastercard = "MasterCardIcon",
  unionpay = "UnionPayIcon",
  visa = "VisaIcon",
}

interface IPaymentIconProps {
  type: string;
}

const PaymentIcon = ({ type }: IPaymentIconProps) => {
  const paymentSystemsIcons = {
    'american-express': PaymentIcons.amex,
    'diners-club': PaymentIcons.dinersclub,
    jcb: PaymentIcons.jcb,
    maestro: PaymentIcons.maestro,
    mastercard: PaymentIcons.mastercard,
    unionpay: PaymentIcons.unionpay,
    visa: PaymentIcons.visa,
  };

  return (
    // @ts-ignore
    <SvgIcon component={icons[paymentSystemsIcons[type]]} />
  )

}

export default PaymentIcon;
