import pg from "pg";

const poll = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "store",
  password: "isabelle.2024",
  port: 5432,
});

const query = async (text, params) => {
  try {
    const result = await poll.query(text, params);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { 
    query
};
