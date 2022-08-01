import { Readable } from 'stream';

export class S3 {
    getSignedUrl = jest.fn((_, params) => `http://some-url.com/${params.Key}`);
    copyObject = jest.fn(() => ({
        promise: () => Promise.resolve(),
    }));
    deleteObject = jest.fn(() => ({
        promise: () => Promise.resolve(),
    }));
    getObject = jest.fn(() => ({
        createReadStream: jest.fn(() => {
            const st = new Readable();
            st.push('test');
            st.push(null);
            
            return st;
        }),
    }));
}

export default {
    S3,
}
