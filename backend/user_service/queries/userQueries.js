const getUserQuery = `
    select *
    from User
    where user_id = ?
`;

const createUserQuery = `
    insert into User (user_id, first_name, last_name, email, password, phone_number) 
    values (?, ?, ?, ?, ?, ?);
`;

const updateUserQuery = `
        update User
        set 
            first_name = ?,
            last_name = ?,
            email = ?,
            password = ?,
            phone_number = ?,
        where user_id = ?
`;

const deleteUserQuery = `
        delete from User
        where user_id = ?
`;

module.exports = {
    getUserQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery
}