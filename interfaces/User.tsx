export type UserProps = {
    id: Number;
    name: String;
    email: String;
};

export type UsersRepsonseProps = [
    {
        createdAt: Object;
        deleted: Boolean;
        email: String;
        emailVerified: Boolean | null;
        id: String;
    }
];