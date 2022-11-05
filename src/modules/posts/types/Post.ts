type Post = {
    slug: string;
    meta: PostMeta;
    content?: any;
}

type PostMeta = {
    title: string;
    abstract: string;
    category: string;
    published: string;
    thumbnail: string;
}

export type {PostMeta, Post};