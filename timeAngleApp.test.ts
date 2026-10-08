import 'dotenv/config';

const API_URL = process.env.API_URL ?? 'http://localhost:3000';

describe('POST /CalculateTimeAngle', () => {

    test('returns 90° for time 03:00', async () => {
        const response = await fetch(
            `${API_URL}/CalculateTimeAngle`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    time: '03:00'
                })
            }
        );

        const result = await response.text();

        expect(response.status).toBe(200);
        expect(result).toBe('90°');
    });


    test('returns error when hour is not a valid number', async () => {
        const response = await fetch(
            `${API_URL}/CalculateTimeAngle`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hour: 'dsadasd',
                    minute: '30'
                })
            }
        );

        const result = await response.text();

        expect(response.status).toBe(400);
        expect(result).toBe('Hour and minute must be valid numbers.');
    });


    test('returns error when minute is not a valid number', async () => {
        const response = await fetch(
            `${API_URL}/CalculateTimeAngle`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hour: '12',
                    minute: '3adsada0'
                })
            }
        );

        const result = await response.text();

        expect(response.status).toBe(400);
        expect(result).toBe('Hour and minute must be valid numbers.');
    });


    test('returns error when hour is outside valid range', async () => {
        const response = await fetch(
            `${API_URL}/CalculateTimeAngle`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hour: '22222',
                    minute: '30'
                })
            }
        );

        const result = await response.text();

        expect(response.status).toBe(400);
        expect(result).toBe('Hour must be between 0 and 23.');
    });


    test('returns error when minute is outside valid range', async () => {
        const response = await fetch(
            `${API_URL}/CalculateTimeAngle`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    hour: '5',
                    minute: '70'
                })
            }
        );

        const result = await response.text();

        expect(response.status).toBe(400);
        expect(result).toBe('Minute must be between 0 and 59.');
    });
});