import axios from 'axios';

const wcApi = axios.create({
  baseURL: 'https://luvpotion.co/wp-json/wc/v3',
  auth: {
    username: 'ck_71b857f444546aad4b8f176836caf6b5ded3c42c',
    password: 'cs_7eeb98ac1717863a20d4b4f820959c4d46a7d5c9',
  },
});

export default wcApi;
