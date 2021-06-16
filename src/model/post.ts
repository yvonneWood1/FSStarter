class Post {
    id: number;
    user_id: String;
    title: String;
    body: String;
    created_at: Date;
    updated_at: Date;

    constructor() {
        return this;
    }
}

export const post = () => new Post();

