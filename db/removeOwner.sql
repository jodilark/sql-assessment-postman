UPDATE vehicles 
SET owner_id = null
WHERE vehicles.id = $2
and owner_id = $1
RETURNING *;