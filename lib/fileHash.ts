import { MD5 } from "crypto-js";

export const hashFromFile = async (file: File) => {
  const hash = await new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const fileContent = event.target!.result;
      const checksum = MD5(fileContent as string).toString();
      resolve(checksum);
    };
    fileReader.onerror = function (event) {
      reject(event.target!.error);
    };
    fileReader.readAsText(file);
  });
  return hash;
};
