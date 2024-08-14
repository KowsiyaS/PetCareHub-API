import { randomBytes } from "crypto";

const generate_secret_key = () => {
  return randomBytes(128).toString("hex");
};

console.log(generate_secret_key());
