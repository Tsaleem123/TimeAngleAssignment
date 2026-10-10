import 'dotenv/config';
import { calcTimeAngleFromHoursMins, calcTimeAngleFromTime, calculateAngle } from './timeAngleApp';

const API_URL = process.env.API_URL ?? 'http://localhost:3000';

// Based on the correction provided
// Added actual unit tests on the function itself
// Created more input validation, and calculation tests.

describe('calculateAngle', () => {
    // Calculation section
    test('returns 0° for 12:00 AM', () => {
        expect(calculateAngle(0, 0)).toBe('0°');
    });

    test('returns 0° for 12:00 PM', () => {
        expect(calculateAngle(12, 0)).toBe('0°');
    });

    test('returns 90° for 3:00', () => {
        expect(calculateAngle(3, 0)).toBe('90°');
    });


    test('returns 713.5° for 23:59', () => {
        expect(calculateAngle(23, 59)).toBe('713.5°');
    });

    //Input Validation tests
    test('rejects an invalid hour', () => {
        expect(() => calculateAngle(25, 30))
            .toThrow('Hour must be between 0 and 23.');
    });

    test('rejects an invalid minute', () => {
        expect(() => calculateAngle(12, 70))
            .toThrow('Minute must be between 0 and 59.');
    });

    test('rejects negative inputs', () => {
        expect(() => calculateAngle(-1, -30)).toThrow();
    });

     test('rejects negative hours', () => {
        expect(() => calculateAngle(-1, 30)).toThrow();
    });
     test('rejects negative minutes', () => {
        expect(() => calculateAngle(1, -30)).toThrow();
    });

    test('rejects non-numeric values', () => {
        expect(() => calculateAngle(NaN, 30)).toThrow();
    });

    test('rejects fractional hours', () => {
        expect(() => calculateAngle(3.5, 30)).toThrow();
    });

    test('rejects fractional minutes', () => {
        expect(() => calculateAngle(3, 30.5)).toThrow();
    });

    test('rejects Infinity', () => {
        expect(() => calculateAngle(Infinity, 30)).toThrow();
    });

});

// I added some more tests for both methods that call calculateAngle.
// These are not as indepth with the calculation tests, but I believe
// this to be fine since the core calculations happen the calculateAngle
// function level.

describe('calcTimeAngleFromHoursMins', () => {

    test('returns 90° for hour 3 and minute 0', () => {
        expect(calcTimeAngleFromHoursMins('3', '0')).toBe('90°');
    });

    test('returns 285° for hour 3 and minute 30', () => {
        expect(calcTimeAngleFromHoursMins('3', '30')).toBe('285°');
    });

    test('rejects an invalid hour', () => {
        expect(() => calcTimeAngleFromHoursMins('abc', '30'))
            .toThrow('Hour and minute must be valid numbers.');
    });

    test('rejects an invalid minute', () => {
        expect(() => calcTimeAngleFromHoursMins('3', 'abc'))
            .toThrow('Hour and minute must be valid numbers.');
    });

    test('rejects an hour outside the valid range', () => {
        expect(() => calcTimeAngleFromHoursMins('25', '30'))
            .toThrow('Hour must be between 0 and 23.');
    });

    test('rejects a minute outside the valid range', () => {
        expect(() => calcTimeAngleFromHoursMins('3', '70'))
            .toThrow('Minute must be between 0 and 59.');
    });

});

describe('calcTimeAngleFromTime', () => {

    test('returns 0° for 12:00', () => {
        expect(calcTimeAngleFromTime('12:00')).toBe('0°');
    });

    test('returns 358° for 05:32', () => {
        expect(calcTimeAngleFromTime('05:32')).toBe('358°');
    });

    test('rejects time without a colon', () => {
        expect(() => calcTimeAngleFromTime('0300'))
            .toThrow('Time must be in HH:MM format.');
    });

    test('rejects time with too many colons', () => {
        expect(() => calcTimeAngleFromTime('03:30:00'))
            .toThrow('Time must be in HH:MM format.');
    });

    test('rejects an invalid hour', () => {
        expect(() => calcTimeAngleFromTime('abc:30'))
            .toThrow('Hour and minute must be valid numbers.');
    });

    test('rejects an invalid minute', () => {
        expect(() => calcTimeAngleFromTime('03:abc'))
            .toThrow('Hour and minute must be valid numbers.');
    });

    test('rejects an hour outside the valid range', () => {
        expect(() => calcTimeAngleFromTime('25:30'))
            .toThrow('Hour must be between 0 and 23.');
    });

    test('rejects a minute outside the valid range', () => {
        expect(() => calcTimeAngleFromTime('03:70'))
            .toThrow('Minute must be between 0 and 59.');
    });

});

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