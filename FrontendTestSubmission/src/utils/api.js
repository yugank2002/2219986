import { log } from "../../../logging_middleware/index";
import { API_BASE, STACK, PACKAGE } from "../config/constants";

export const fetchAllUrls = async () => {
  try {
    const res = await fetch(`${API_BASE}/urls`);
    const data = await res.json();
    await log(STACK, "info", PACKAGE, "Fetched all URLs");
    return data;
  } catch (error) {
    await log(STACK, "error", PACKAGE, "Failed to fetch URLs");
    throw error;
  }
};
