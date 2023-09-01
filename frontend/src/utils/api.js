/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") })

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://localhost:5002";
// console.log(process.env.REACT_APP_API_BASE_URL)
/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing jobs.
 * @returns {Promise<[job]>}
 *  a promise that resolves to a possibly empty array of jobs saved in the database.
 */

export async function listJobs(params, signal) {
  const url = new URL(`${API_BASE_URL}/jobs`);

  return await fetchJson(url, { headers, signal }, [])
}

export async function readJobs(job_id, signal){
  const url = `${API_BASE_URL}/jobs/${job_id}/edit`
  return await fetchJson(url, { headers, signal })
}

export async function createJobs(job, signal) {
  const url = `${API_BASE_URL}/jobs`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: job }),
    signal,
  };
  return await fetchJson(url, options, job);
}

export async function deleteJobs(job, job_id, signal){
  const url = `${API_BASE_URL}/jobs/${job_id}/edit`;
  const options = {
    method: 'DELETE',
    signal
  }
  return await fetchJson(url, options, job)
}

export async function updateJob(job, job_id, signal) {
  //console.log(job)
  //console.log(job_id)
  const url = `${API_BASE_URL}/jobs/${job_id}/edit`;
  const options = {
    method: "PUT",
    body: JSON.stringify({ data: { ...job } }),
    headers: { "Content-Type": "application/json" },
    signal,
  };
  return await fetchJson(url, options, job);
}

export async function convertToBase64URL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64DataURL = reader.result;
      resolve(base64DataURL);
    };

    reader.readAsDataURL(file);
  });
} 

export async function createObjectURLFromBase64(base64Data) {
  const blob = new Blob([base64Data], { type: "image/png" }); // Adjust the MIME type if needed
  return URL.createObjectURL(blob);
}