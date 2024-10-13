import { Schema } from 'mongoose';
import { getMongoConnection } from '@/lib/db';

const docSchema = new Schema(
    {
        path: String,
        title: String,
        description: String,
        content: [
            {
                type: String,
                content: String,
                position: String,
            },
        ],
    },
    {
        collection: 'docs',
    }
);

const connection = await getMongoConnection('primary');
const doc = connection.models.docSchema || connection.model('docSchema', docSchema);
export default doc;
