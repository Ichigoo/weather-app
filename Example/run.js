// example/run.js

import getWeatherInfo from '../index.js'; // Import the main function

// A function to call the module and display the results
async function testLocation(location) {
    console.log(`\n--- Testing Location: ${location} ---`);

    try {
        const data = await getWeatherInfo(location);

        // Check if the result is an Array (Country List) or an Object (Single City)
        if (Array.isArray(data)) {
            console.log(`✅ Success: Found ${data.length} cities for COUNTRY: ${location}.`);
            console.log('Sample data (first city):', JSON.stringify(data[0], null, 2));
        } else {
            console.log(`✅ Success: Found single CITY weather for ${location}.`);
            console.log('Result:', JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error(`❌ Failure for ${location}: ${error.message}`);
    }
}

// --- Run the Specific Test Cases ---
async function runSimpleTests() {

    // 1. Test Case: Single City (Expected to succeed directly)
    await testLocation('Marrakech');

    // 2. Test Case: Country (Expected to fail city search, then succeed country search)
    await testLocation('Morocco');

    // 3. Test Case: Invalid input (Optional, to ensure error handling works)
    await testLocation('ZZZ_Invalid_City_Name');
}

runSimpleTests();