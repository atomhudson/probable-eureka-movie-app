import { Client, Databases, Permission, Query, Role } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const docId = `search_${searchTerm.replace(/\s+/g, "_").toLowerCase()}`;
        let existing = null;

        try {
            existing = await databases.getDocument(DATABASE_ID, COLLECTION_ID, docId);
        } catch (err) {
            if (err.code !== 404) console.error("Movie is missing in search");
        }

        if (existing) {
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, {
                count: existing.count + 1
            });
        } else {
            await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                docId,
                {
                    search: searchTerm,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                    count: 1
                },
                [
                    Permission.read(Role.any()),   // anyone can read
                    Permission.update(Role.any()) // anyone can update
                ]
            );
        }
    } catch (error) {
        console.error("Error updating search count:", error);
    }
};

export const getTrendingMovies = async () => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ]);
        return result.documents;
    } catch (error) {
        console.error("Error getting trending movies:", error);
    }
};
