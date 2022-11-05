/**
 * The purpose of this file is to act as a helper to access mdx files for
 * Walks that are publicly available on this website.
 *
 */
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import moment from "moment/moment";
import {serialize} from "next-mdx-remote/serialize";
import {Walk} from "../types/Walk";

// Global reference to the posts folder for the functions to access
const WALKS_FOLDER = path.join(process.cwd(), 'src', 'modules', 'walks', 'content');

/**
 * This function will return all the filenames that are present within
 * the posts content folder
 */
const getFileNames = () => {
    return fs.readdirSync(path.join(WALKS_FOLDER));
}

/**
 * Retrieve all mdx walks including the meta only
 */
const getAllWalks = (): Walk[] => {
    // Retrieve all files in the posts folder
    const fileNames = getFileNames();

    // @ts-ignore
    const walks: Walk[] = fileNames.map(fileName => {
        // Do not allow non-mdx files
        if (!fileName.endsWith('.mdx')) return;

        const markdownWithMeta = fs.readFileSync(path.join(WALKS_FOLDER, fileName));

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
                mapURL: metaData.mapURL as string
            },
            content: null
        }
    })

    // Sort All Walks by Descending date
    walks.sort((a: Walk, b: Walk) => {
        const format = 'DD/MM/YYYY';
        return moment(a.meta.published, format) < moment(b.meta.published, format) ? 1 : -1;
    })

    return walks;
}

const getWalkBySlug = (slug: string): Walk => {
    // Ensure slug is lowercase
    slug = slug.toLowerCase();

    const markdownWithMeta = fs.readFileSync(path.join(WALKS_FOLDER, `${slug}.mdx`));

    const {data: metaData, content} = matter(markdownWithMeta);

    return {
        slug: slug,
        meta: {
            title: metaData.title,
            abstract: metaData.abstract,
            category: metaData.category,
            published: metaData.published,
            thumbnail: metaData.thumbnail,
            mapURL: metaData.mapURL
        },
        content: content
    }
}

export async function getFileBySlug(dataType: string, slug: string) {
    slug = slug.toLowerCase();

    const markdownWithMeta = fs.readFileSync(path.join(WALKS_FOLDER, dataType, `${slug}.mdx`));

    const {data: frontMatter, content} = await matter(markdownWithMeta);

    // @ts-ignore
    const mdxSource = await serialize(content);

    return {
        frontMatter,
        slug,
        mdxSource
    };
}


// Export functions and references as globally accessible
export {WALKS_FOLDER, getFileNames, getAllWalks, getWalkBySlug};