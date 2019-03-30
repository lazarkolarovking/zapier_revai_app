const {BASE_ITEM_URL} = require('../constants');
const utils = require('../utils');
const handleError = utils.handleError;
const getFileDetailsFromRequest = utils.getFileDetailsFromRequest;

const createFile = (z, bundle) => {
  
  const mediaUrl = bundle.inputData.media_url;

  z.console.log(mediaUrl);

  return getFileDetailsFromRequest(mediaUrl)
    .then((fileDetails) => {

      const responsePromise = z.request({
        method: 'POST',
        url: `${BASE_ITEM_URL}/jobs`,
        body: {
          "media_url": mediaUrl
        }
      });

      return responsePromise
        .then(response => JSON.parse(response.content));
    })
    .catch(handleError);
};

module.exports = {
  key: 'file',
  noun: 'File',

  // Will become a create on the app. Key will be `createFile`
  create: {
    display: {
      label: 'Send File',
      description: 'Send an existing file or attachment.',
      important: true,
    },
    operation: {
      inputFields: [
        {
          key: 'access_token',
          type: 'string',
          label: 'Access Token',
          required: true,
          helpText: 'Must be a Access Token from Rev.ai.',
        },
        {
          key: 'media_url',
          type: 'string',
          label: 'Media Url',
          required: true,
          helpText: 'Must be a file object from another service (or some text or URL).',
        },
      ],
      perform: createFile,
    },
  },

  sample: {
    id: '1',
    name: 'Example.jpg',
    _path: '/Something/Example.jpg',
    media_url: '/example.com/Something/Example.avi',
    _parent: '/Something',
    webUrl: 'http://example.com',
    createdDateTime: '2019-03-22T03:37:04.72Z',
    lastModifiedDateTime: '2019-03-22T03:37:04.72Z',
  },

  outputFields: [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'File Name' },
    { key: '_path', label: 'File Path' },
    { key: 'media_url', label: 'Media Url' },
    { key: '_parent', label: 'Folder' },
    { key: 'webUrl', label: 'URL' },
  ],
};
