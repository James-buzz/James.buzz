type Walk = {
    slug: string;
    meta: WalkMeta;
    content?: any;
}

type WalkMeta = {
    title: string;
    abstract: string;
    category: string;
    published: string;
    thumbnail: string;
    mapURL: string;
}

export type {Walk, WalkMeta};