import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import axios from "axios";
import { ethers } from "ethers";

type Data = {
  paymentUrl: string;
};

const getReferral = (referralCode: string) => {
  // test setting
  if (referralCode === "test1") {
    return {
      rewardAddress: "0xdfe3DDBcB66cbC3a88816C0f876F76b2B60884fe",
      rewardRate: 100,
      cashBackRate: 200,
    };
  } else if (referralCode === "test2") {
    return {
      rewardAddress: "0xDeBeA7Bf019285Cd3ddAd69A6aC1c6E5260d1083",
      rewardRate: 300,
      cashBackRate: 0,
    };
  } else if (referralCode === "test3") {
    return {
      rewardAddress: ethers.constants.AddressZero,
      rewardRate: 0,
      cashBackRate: 500,
    };
  } else {
    return {
      rewardAddress: ethers.constants.AddressZero,
      rewardRate: 0,
      cashBackRate: 0,
    };
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // get request body
  const { referralCode } = req.body;

  // retrieve product data from database
  // ***　Omitted because it is a hackathon　***
  const amount = Number(process.env.NEXT_PUBLIC_PRICE); /* Price */
  const amountType = "USD"; /* Currency of the Price  */
  const orderCode = crypto.randomUUID(); /* Unique per api call  */
  // get referral code from request body
  const referral = getReferral(referralCode);

  // automatically generated on the merchant management screen
  const authenticationToken = process.env.SLASH_AUTH_TOKEN;
  const hashToken = process.env.SLASH_HASH_TOKEN;

  // encrypto followin Slash's manners
  const raw = orderCode + "::" + amount + "::" + hashToken;
  const hashHex = crypto.createHash("sha256").update(raw, "utf8").digest("hex");

  // encode referral code
  const extReserved = ethers.utils.AbiCoder.prototype.encode(
    ["address", "uint256", "uint256"],
    [referral.rewardAddress, referral.rewardRate, referral.cashBackRate]
  );
  console.log(extReserved);

  // call Paument Request API
  const requestObj = {
    identification_token: authenticationToken,
    order_code: orderCode,
    verify_token: hashHex,
    amount: amount,
    amount_type: amountType,
    ext_reserved: extReserved,
    ext_description: referralCode ? `referral code: ${referralCode}` : "",
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
