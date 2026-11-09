SELECT id,
        name AS "firstName",
        email,
        role,
        date_created AS "dateCreated"
FROM user_app
WHERE family_id = 1
ORDER BY name