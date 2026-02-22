
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


export function getFilenameFromContentDisposition(header) {
  if (!header) return null;

  const match = header.match(/filename\*?=([^;]+)/i);
  if (!match) return null;

  let filename = match[1].trim();

  // Remove quotes if present
  if (filename.startsWith('"') && filename.endsWith('"')) {
    filename = filename.slice(1, -1);
  }

  // Decode UTF-8 filenames (filename*)
  if (header.includes("UTF-8''")) {
    try {
      filename = decodeURIComponent(filename);
    } catch {
      // ignore
    }
  }

  return filename || null;
}
