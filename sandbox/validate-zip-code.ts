"use server";

export async function validateZipCode(zipcode: string): Promise<boolean> {
  console.log("validateZipCode", zipcode);
  return /^\d{5}$/.test(zipcode) && zipcode.startsWith("9");
}
