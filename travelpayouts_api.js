const apiToken = "YOUR_TRAVELPAYOUTS_API_TOKEN";

try {
  const origin = workflow.originCityCode;
  const destination = workflow.destCityCode;
  const date = workflow.travelDate;

  const flightResponse = await axios.get(
    `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&destination=${destination}&depart_date=${date}&currency=USD`,
    { headers: { "x-access-token": apiToken } }
  );

  const responseData = flightResponse.data.data;

  if (responseData && responseData[destination]) {
    const flightIds = Object.keys(responseData[destination]);
    const cheapestFlight = responseData[destination][flightIds[0]];

    workflow.apiResult = `I found a great option! Airline ${cheapestFlight.airline} (Flight ${cheapestFlight.flight_number}) has a ticket around $${cheapestFlight.price} USD.`;
  } else {
    workflow.apiResult =
      "I couldn't find any available flights for that route on this specific date.";
  }

  // Tell the flow we succeeded
  workflow.apiSuccess = true;
} catch (error) {
  // Log the real error to the backend console for you to debug later
  console.log("API EXECUTION ERROR:", String(error));

  // Set a clean, user-facing error message
  workflow.apiResult =
    "I'm having trouble connecting to the airline database right now.";

  // Tell the flow we failed
  workflow.apiSuccess = false;
}
