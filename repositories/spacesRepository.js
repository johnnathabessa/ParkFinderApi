import { query } from "../config/db.js";
import {differenceInMinutes} from 'date-fns';

const VALUES_HOUR = 10;
const LIMIT_MINUTES = 60;
const FRACTION_MINUTES = 15;
const VALUES_FRACTION = 3;

const SpacesRepository = {
    async getSpaces() {
        const text = 'SELECT * FROM spaces;';
        const result = await query(text);
        return result.rows;
    },
    async getSpaceById(id) {
        const text = 'SELECT * FROM spaces WHERE id = $1;';
        const values = [id];
        const result = await query(text, values);
        return result.rows[0];
    },
    async createSpace(space) {
        const text = 'INSERT INTO spaces (name, floor, occuped, lastEntry) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [space.name, space.floor, space.occuped, space.lastEntry];
        const result = await query(text, values);
        return result.rows[0];
    },
    async updateSpace(id, space) {
        const text = 'UPDATE spaces SET name = $1, floor = $2, occuped = $3, lastEntry = $4 WHERE id = $5 RETURNING *';
        const values = [space.name, space.floor, space.occuped, space.lastEntry, id];
        const result = await query(text, values);
        return result.rows[0];
    },
    async deleteSpace(id) {
        const text = 'DELETE FROM spaces WHERE id = $1;';
        const values = [id];
        const result = await query(text, values);
        return result.rows[0];
    },
    async markEntry(id) {
        const text = 'UPDATE spaces SET lastEntry = now(), occuped = true WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await query(text, values);
        return result.rows[0];
    },
    async getPriceOfExit(id) {
        const text = 'SELECT lastEntry FROM spaces WHERE id = $1;';
        const values = [id];
        const result = await query(text, values);

        let lastEntry  = result.rows[0].lastentry;
        let now = new Date();

        let minutesPassed = Math.abs(differenceInMinutes(now, lastEntry));
      
        let finalValue = 0;

        if (minutesPassed > LIMIT_MINUTES) {
            finalValue = VALUES_HOUR + (minutesPassed - 60) / FRACTION_MINUTES * VALUES_FRACTION;    
        } else {
            finalValue = VALUES_HOUR;
        }
        
        
        return finalValue.toFixed(2);
    },
    async exiteSpace(id) {
        const text = 'UPDATE spaces SET lastEntry = null, occuped = false WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await query(text, values);
        return result.rows[0];
    }
}

export default SpacesRepository;