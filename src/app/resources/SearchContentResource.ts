import { ConfigureHttpClient } from '../config/HttpClient';

const HttpClient = ConfigureHttpClient(`${ process.env['REACT_APP_API_URL'] }/search-content`);

// function searchContent()
