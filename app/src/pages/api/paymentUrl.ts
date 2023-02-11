import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import axios from "axios";

type Data = {
  paymentUrl: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // retrieve product data from database
  // ***　Omitted because it is a hackathon　***
  const amount = Number(process.env.NEXT_PUBLIC_PRICE); /* Price */
  const amountType = "USD"; /* Currency of the Price  */
  const orderCode = crypto.randomUUID(); /* Unique per api call  */

  // automatically generated on the merchant management screen
  const authenticationToken = process.env.SLASH_AUTH_TOKEN;
  const hashToken = process.env.SLASH_HASH_TOKEN;

  // encrypto followin Slash's manners
  const raw = orderCode + "::" + amount + "::" + hashToken;
  const hashHex = crypto.createHash("sha256").update(raw, "utf8").digest("hex");

  // call Paument Request API
  const requestObj = {
    identification_token: authenticationToken,
    order_code: orderCode,
    verify_token: hashHex,
    amount: amount,
    amount_type: amountType,
  };
  const paymentRequestUrl = process.env.SLASH_PAYMENT_REQUEST_URL ?? "";
  const result = await axios
    .post(paymentRequestUrl, requestObj)
    .catch((error) => {
      return error.response;
    });

  if (result.status !== 200) {
    return res.status(result.status).json(result.data);
  }

  const paymentUrl = result.data.url;
  const paymentToken = result.data.tokens;

  // save purchaser info to database
  // ***　Omitted because it is a hackathon　***

  // return payment URL
  res.status(200).json({ paymentUrl: paymentUrl });
}
