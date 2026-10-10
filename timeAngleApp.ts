import express, { type Express} from 'express';
import 'dotenv/config';

const app: Express = express();
app.use(express.json()); 

//Section for defining host properties for the app.
const API_URL = process.env.API_URL ?? 'http://localhost:3000';
const url = new URL(API_URL);
const PORT = Number(url.port);
const HOST = url.hostname;

//Functions to calculate API response

// Now added 
export function calculateAngle(hours: number, minutes: number): string {
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        throw new Error("Hour and minute must be valid numbers.");
    }

    if (hours < 0 || hours > 23) {
        throw new Error("Hour must be between 0 and 23.");
    }

    if (minutes < 0 || minutes > 59) {
        throw new Error("Minute must be between 0 and 59.");
    }
    
    //Corrected formula based on feed back from reviewers.

    const hourHandAngle = (hours % 12) * 30 + minutes * 0.5;
    const minuteHandAngle = minutes * 6;
    const angle = hourHandAngle + minuteHandAngle;

    return `${angle}°`;
}

export function calcTimeAngleFromHoursMins(hour: string, min: string): string {
    const hours = Number(hour);
    const minutes = Number(min);

    return calculateAngle(hours, minutes);
}

export function calcTimeAngleFromTime(time: string): string {
    const parts = time.split(":");

    if (parts.length !== 2) {
        throw new Error("Time must be in HH:MM format.");
    }

    const [hour, min] = parts;

    const hours = Number(hour);
    const minutes = Number(min);

    return calculateAngle(hours, minutes);
}

// HTTP section
app.post('/CalculateTimeAngle', (req, res) => {
    // converted my origianal switch structure to account for more input validation
    try {
        const { time, hour, minute } = req.body ?? {};

        if (time !== undefined) {
            res.send(calcTimeAngleFromTime(time));
            return;
        }

        if (hour !== undefined && minute !== undefined) {
            res.send(calcTimeAngleFromHoursMins(hour, minute));
            return;
        }

        res.status(400).send(
            'Incorrect format. Expected time: "03:00" or hour and minute: 5, 30.'
        );
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(500).send("An unexpected error occurred.");
        }
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at ${API_URL}`);
});