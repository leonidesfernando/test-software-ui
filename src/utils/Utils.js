
export function validatePeriod(startDate, endDate){
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (end < start) {
    throw new Error("The finalDate must be equal or greater than startDate")
  }
}


export function decrypt(data){
  let binaryString = atob(data);
  let bytes = Uint8Array.from(binaryString, char => char.charCodeAt(0));
  let decodedString = new TextDecoder('utf-8').decode(bytes);

  return  JSON.parse(decodedString)
}
