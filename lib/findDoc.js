'use server';
import doc from '@/src/schemas/doc';

export default async function findDoc(path) {
    const document = await doc.findOne({ path: path });
    if (!document) {
        return 'none';
    }

    return JSON.stringify(document);
}
