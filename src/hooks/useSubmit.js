import {useRef, useState} from "react";
/** @param {number} ms */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/** @typedef {{type: 'success' | 'error', message: string}} SubmitResponse */
/** Simulates a two-second request with equal success and failure probabilities. No data is sent. */
const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(/** @type {SubmitResponse | null} */ (null));
  const pending = useRef(/** @type {Promise<SubmitResponse> | null} */ (null));
  /** @param {{firstName: string}} data */
  const submit = (data) => {
    if (pending.current) return pending.current;
    const random = Math.random();
    setLoading(true);
    pending.current = (async () => {
      await wait(2000);
      /** @type {SubmitResponse} */
      const result = random < 0.5
        ? {type: 'error', message: 'Something went wrong, please try again later!'}
        : {type: 'success', message: `Thanks for your submission ${data.firstName}, we will get back to you shortly!`};
      setResponse(result);
      setLoading(false);
      pending.current = null;
      return result;
    })();
    return pending.current;
  };
  return {isLoading, response, submit};
};
export default useSubmit;
