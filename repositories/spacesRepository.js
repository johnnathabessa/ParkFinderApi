import { query } from "../config/db.js";
import {differenceInMinutes} from 'date-fns';

const VALUES_hOUR =10;
const LIMIT_FRACTION = 1;
const MINUTES_FRACTION = 15;
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
        const text = 'UPDATE spaces SET lastEntry = now() occuped = true WHERE id = $1 RETURNING *';
        const values = [id];
        const result = await query(text, values);
        return result.rows[0];
    },
    async getPriceOfExit(id) {
        const text = 'SELECT lastEntry FROM spaces WHERE id = $1;';
        const values = [id];
        const result = await query(text, values);
        const lastEntry  = result.rows[0].lastEntry;
        const minutes = differenceInMinutes(new Date(), lastEntry);
        const hours =Math.ceil(minutes /60);
        const fractions =Math.ceil(((minutes - 60 ) % 60) / MINUTES_FRACTION);
        const price = (hours * VALUES_HOUR) + (fractions * VALUES_FRACTION);
        return price;
    }
}

export default SpacesRepository;