'use server';
import doc from '@/src/schemas/doc';

export default async function findDocs(category) {
    const documents = await doc.find({ path: { $regex: new RegExp(`^${category}`) } });

    if (!documents) {
        return 'none';
    }

    return JSON.stringify(documents.sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true })));
}
