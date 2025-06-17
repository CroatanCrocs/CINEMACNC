'use server'
const SERVER = 'http://silence:8080/api/v1';

import { getAuthToken } from "./get-token";

export async function getUserMeLoader() {

  const authToken = await getAuthToken();
  if (!authToken) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(`${SERVER}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      }
    });
    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.error("Error fetching user me data:", error);
    return { ok: false, data: null, error: error };
  }
}