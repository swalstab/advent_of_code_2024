import { daysData } from "../config/daysData";
import { getResult } from "../utils/utils";

self.onmessage = (e) => {
  try {
    const { day, part, inputContent } = e.data;
    const script = daysData[Number(day)]?.[`part${part}`];
    const result = getResult(inputContent, script);

    self.postMessage({ success: true, result });
  } catch (err) {
    self.postMessage({
      success: false,
      error: err.message,
    });
  }
};
