/**
 * The purpose of this file is to act as a helper to access mdx files for
 * posts that are publicly available on this website.
 *
 */
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import {Post} from "../types/Post";
import moment from "moment/moment";
import {serialize} from "next-mdx-remote/serialize";

// Global reference to the posts folder for the functions to access
const POSTS_FOLDER = path.join(process.cwd(), 'src', 'modules', 'posts', 'content');

/**
 * This function will return all the filenames that are present within
 * the posts content folder
 */
const getFileNames = () => {
    return fs.readdirSync(path.join(POSTS_FOLDER));
}

const getRecentPosts = (): Post[] => {
    return getAllPosts().splice(0, 3);
}

/**
 * Retrieve all mdx posts including the meta only
 */
const getAllPosts = (): Post[] => {
    // Retrieve all files in the posts folder
    const fileNames = getFileNames();

    // @ts-ignore
    const posts: Post[] = fileNames.map(fileName => {
        // Do not allow non-mdx files
        if (!fileName.endsWith('.mdx')) return;

        const markdownWithMeta = fs.readFileSync(path.join(POSTS_FOLDER, fileName));

        // Parse the markdown from the MDX post file and retrieve the metadata
        const {data: metaData} = matter(markdownWithMeta);

        return {
            slug: fileName.replace('.mdx', '') as string,
            meta: {
                title: metaData.title as string,
                abstract: metaData.abstract as string,
                category: metaData.category as string,
                published: metaData.published as string,
                thumbnail: metaData.thumbnail as string,
            },
            content: null
        }
    })

    // Sort All Posts by Descending date
    posts.sort((a: Post, b: Post) => {
        const format = 'DD/MM/YYYY';
        return moment(a.meta.published, format) < moment(b.meta.published, format) ? 1 : -1;
    })

    return posts;
}

const getPostBySlug = (slug: string): Post => {
    // Ensure slug is lowercase
    slug = slug.toLowerCase();

    const markdownWithMeta = fs.readFileSync(path.join(POSTS_FOLDER, `${slug}.mdx`));

    const {data: metaData, content} = matter(markdownWithMeta);

    return {
        slug: slug,
        meta: {
            title: metaData.title,
            abstract: metaData.abstract,
            category: metaData.category,
            published: metaData.published,
            thumbnail: metaData.thumbnail
        },
        content: content
    }
}

export async function getFileBySlug(dataType: string, slug: string) {
    slug = slug.toLowerCase();

    const markdownWithMeta = fs.readFileSync(path.join(POSTS_FOLDER, dataType, `${slug}.mdx`));

    const {data: frontMatter, content} = await matter(markdownWithMeta);

    const mdxSource = await serialize(content);

    return {
        frontMatter,
        slug,
        mdxSource
    };
}


// Export functions and references as globally accessible
export {POSTS_FOLDER, getFileNames, getAllPosts, getPostBySlug, getRecentPosts};