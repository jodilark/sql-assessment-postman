select *, vehicles.id as "vId" from users
join vehicles
on users.id = vehicles.owner_id
where users.id = $1