select * from users
join vehicles
on users.id = vehicles.owner_id
where email = $1