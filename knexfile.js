module.exports = {
  development: {
    client: `pg`,
    connection: `postgres://localhost/todolist`
  },
  test: {},
  production: {
    client: `pg`,
    connection: process.env.DATABASE_URL
  }
}
