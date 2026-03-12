# HexSoftwares_AI-Chatbot-Development
AI Chat bot for traveling agent
# Virtual Assistant 🤖✈️

A conversational AI agent built for the EgyWonders marketplace, designed to handle customer inquiries, provide intelligent support, and fetch real-time flight data for tourists planning their trip.

## Overview
This repository contains the core logic and workflow architecture for the EgyWonders chatbot. It leverages Natural Language Processing (NLP) to understand user intent and uses a custom API integration to securely query live flight prices based on user input.

## Features
* **Custom Knowledge Base:** Grounded in proprietary Egyptian tourism data to accurately answer domain-specific questions without hallucinating.
* **Live Flight Search Integration:** Bypasses standard LLM limitations by securely connecting to a live travel database to fetch real-time ticket prices.
* **Deterministic Data Capture:** Uses strict variable extraction to gather origin, destination, and travel dates securely before triggering external HTTP requests.
* **Intelligent Error Handling:** Gracefully catches API timeouts or empty responses, ensuring the user is never left with a broken workflow or exposed debug code.

## Tech Stack
* **Conversational Engine:** Botpress Cloud
* **Custom Logic:** Native JavaScript (Node.js environment)
* **External Data Provider:** Travelpayouts (Aviasales) API

## Architecture: The Flight Search Pipeline
The core technical feature of this bot is the custom API pipeline (`travelpayouts_api.js`). 

1. **Capture:** The Botpress workflow temporarily suspends the generative AI agent and prompts the user for specific strict parameters (`originCityCode`, `destCityCode`, `travelDate`).
2. **Execution:** The custom JavaScript node executes, utilizing the native `fetch` API to pass the parameterized query and authentication headers to the Travelpayouts database.
3. **Parsing:** The script parses the returned JSON array, isolating the cheapest available ticket for that specific route.
4. **Formatting:** The extracted data (Airline IATA code, Flight Number, Price) is reformatted into a human-readable string and injected back into the Botpress conversational state.

## Repository Structure
* `egywonders_bot.bpz` - The core Botpress export file containing the visual node flow, intent routing, and defined variables. 
* `travelpayouts_api.js` - The isolated native JavaScript code responsible for the HTTP request and error handling logic.

## Setup Instructions
To view or edit the conversational flow:
1. Create a free account at [Botpress](https://botpress.com).
2. Create a new workspace and select "Import Bot".
3. Upload the `.bpz` file located in this repository.
4. To test the flight API, you will need to generate your own free API token from Travelpayouts and insert it into the Execute Code node.
