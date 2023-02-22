import { Box, Checkbox, FormControlLabel, IconButton, TextField, Typography } from "@mui/material";
import PrimaryButton from "./PrimaryButton";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import valid from "card-validator";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import * as paymentData from "../features/paymentData/paymentDataSlice";
import * as cart from "../features/cart/cartSlice";
import React, { useState } from "react";
import Swal from "sweetalert2";
import PaymentIcon from "./PaymentIcon";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IPaymentFormProps {
  setIsOpened?: React.Dispatch<React.SetStateAction<boolean>>;
}

const paymentSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .max(30, "enter less than 30 symbols")
    .required("required"),
  cardNumber: yup
    .string()
    .required("required")
    .transform((value: string) => value.split(" ").join(""))
    .length(16, "enter 16 digits")
    .test("test-card-number", "Credit Card is invalid", value => {
      return valid.number(value).isValid;
    }),
  expirationDate: yup
    .string()
    .required("required")
    .transform((value: string) => value.split("/").join(""))
    .length(4, "format must be MM/YY")
    .test("test-expiration-date", "date is not valid", value => valid.expirationDate(value).isValid),
  cvv: yup
    .string()
    .required("required")
    .length(3, "enter 3 digits"),
})
type FormData = yup.InferType<typeof paymentSchema>;


const PaymentForm = ({ setIsOpened }: IPaymentFormProps) => {
  const { name, cardNumber, expirationDate, cvv } = useAppSelector(state => state.paymentData);
  const dispatch = useAppDispatch();

  const initialCardType = valid.number(cardNumber).card?.type;

  const [isCvvHidden, setisCvvHidden] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [cardType, setCardType] = useState<string | null>(initialCardType ? initialCardType : null);

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      name,
      cardNumber,
      expirationDate,
      cvv,
    }
  });
  const onSubmit = (data: FormData) => {
    setIsOpened && setIsOpened(false);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "The payment was successful",
      showConfirmButton: false,
      timer: 1500,
    });
    isChecked ? dispatch(paymentData.set(data)) : dispatch(paymentData.clear());
    dispatch(cart.clear());
  };

  const cardHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = valid.number(e.target.value).card?.type;
    setCardType(type ? type : null);
  }

  return (
    <form style={{ padding: "40px 30px" }} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" fontWeight="500" mb="15px">
        Your payment details
      </Typography>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            fullWidth label="NAME"
            variant="standard"
            inputProps={{ style: { fontSize: "16px" } }}
            sx={{ mb: "15px" }}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cardNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <Box position="relative" mb="15px">
            <InputMask mask="9999 9999 9999 9999" maskChar="" value={value} onChange={(e) => {cardHandleChange(e); onChange(e)}} onBlur={onBlur}>
              {/* @ts-ignore */}
              {(inputProps) =>
                <TextField
                  {...inputProps}
                  fullWidth label="CARD NUMBER"
                  variant="standard"
                  inputProps={{ style: { fontSize: "16px" } }}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                />
              }
            </InputMask>
            <Box
              position="absolute"
              top="17px"
              right="10px"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              width="34px"
              height="22px"
              borderRadius="4px"
              bgcolor="rgb(241 245 249)"
              sx={{
                opacity: cardType ? 1 : 0,
                "& > svg": {
                  maxHeight: "18px",
                  width: "28px",
                }
              }}>
                {cardType && <PaymentIcon type={cardType} />}
            </Box>
          </Box>
        )}
      />

      <Box display="flex" gap="35px" sx={{ mb: "20px" }}>
        <Controller
          control={control}
          name="expirationDate"
          render={({ field: { onChange, onBlur, value } }) => (
            <InputMask
              mask="99/99"
              maskChar=""
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            >
              {/* @ts-ignore */}
              {(inputProps) =>
                <TextField
                  {...inputProps}
                  fullWidth label="MM/YY"
                  variant="standard"
                  inputProps={{ style: { fontSize: "16px" } }}
                  error={!!errors.expirationDate}
                  helperText={errors.expirationDate?.message}
                />
              }
            </InputMask>
          )}
        />

        <Controller
          control={control}
          name="cvv"
          render={({ field: { onChange, onBlur, value } }) => (
            <Box position="relative" width="100%">
              <InputMask
                mask="999"
                maskChar=""
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              >
                {/* @ts-ignore */}
                {(inputProps) =>
                  <TextField
                    {...inputProps}
                    fullWidth label="CVC"
                    type={isCvvHidden ? "password" : "text"}
                    variant="standard"
                    inputProps={{ style: { fontSize: "16px" } }}
                    error={!!errors.cvv}
                    helperText={errors.cvv?.message}
                  />
                }
              </InputMask>

              <IconButton onClick={() => setisCvvHidden(!isCvvHidden)} sx={{ position: "absolute", top: "13px", right: "-2px" }}>
                {isCvvHidden ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          )}
        />
      </Box>
      <Box mb="15px">
        <FormControlLabel control={<Checkbox checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />} label="Save my card for future purchases" />
      </Box>
      <PrimaryButton type="submit">Pay now</PrimaryButton>
    </form>
  )
}

export default PaymentForm;
