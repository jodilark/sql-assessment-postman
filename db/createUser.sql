insert into users
(name, email)
VALUES ($1, $2)
RETURNING *;