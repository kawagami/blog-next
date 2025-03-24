'use server';

/**
 * Calculates completion time using the Sango API
 * @param {number} now - Required parameter representing current time/progress
 * @param {number} [remaining_troops] - Optional parameter for remaining troops
 * @param {number} [full] - Optional parameter for full capacity
 * @returns {Promise<any>} The API response as JSON
 */
async function getSangoCalculate(now, remaining_troops, full) {
    // Build the base URL with the required 'now' parameter
    let url = `${process.env.API_URL}/tools/caculate_complete_time?now=${now}`;

    // Add optional parameters if provided
    if (remaining_troops !== undefined) {
        url += `&remaining_troops=${remaining_troops}`;
    }

    if (full !== undefined) {
        url += `&full=${full}`;
    }

    // Make the API request
    const res = await fetch(url, { cache: 'no-store' });

    // Check if the request was successful
    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    return res.json();
}

export default getSangoCalculate;