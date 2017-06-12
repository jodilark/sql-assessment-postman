select * from users
join vehicles
on users.id = vehicles.owner_id
where name like $1 || '%';

-- select vehicles.make, vehicles.model, vehicles.year, vehicles.owner_id from users
-- join vehicles
-- on users.id = vehicles.owner_id
-- where name like $1 || '%';