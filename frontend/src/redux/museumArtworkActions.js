const getIIIFLevel = (artwork, displayWidth) => {
  return {
    url: 'https://www.artic.edu/iiif/2/' + artwork.image_id + '/full/' + displayWidth + ',/0/default.jpg',
    width: displayWidth,
    height: Math.floor(artwork.thumbnail.height *
      displayWidth / artwork.thumbnail.width),
  };
};

const convertToArtworkInfo = (artwork) => {
  const artworkInfo = new Map();
  artworkInfo.set('id', artwork.id);
  artworkInfo.set('alt', artwork.thumbnail.alt_text);
  artworkInfo.set('url', getIIIFLevel(artwork, 500).url);
  artworkInfo.set('title', artwork.title);
  artworkInfo.set('artist', artwork.artist_title);
  artworkInfo.set('description', artwork.description);
  artworkInfo.set('department', artwork.department_title);
  artworkInfo.set('date', artwork.date_display);
  return artworkInfo;
};

const sortByQuerySyntax = new Map()
    .set('relevance',
        {
          '_score': {
            'order': 'desc',
          },
        })
    .set('artist',
        {
          'artist_title.keyword': {
            'order': 'asc',
          },
        })
    .set('date',
        {
          'date_end': {
            'order': 'desc',
          },
        })
    .set('title',
        {
          'title.keyword': {
            'order': 'asc',
          },
        });

const convertSearchToQuerySyntax = (searchField, search) => {
  if (searchField !== '' && search !== '') {
    const json = { };
    json[searchField] = search;
    return json;
  }
  return null;
};

// based off of https://github.com/kjschmidt913/AIC/blob/master/script.js
function getQuery(limit, sortBy, searchQuery) {
  return {
    'resources': 'artworks',
    'mappings': {
      '_doc': {
        'properties': {
          'title': {
            'type': 'string',
            'analyzer': 'english',
            'fields': {
              'raw': {
                'type': 'string',
                'index': 'not_analyzed',
              },
            },
          },
        },
      },
    },
    'fields': [
      'pagination',
      'id',
      'title',
      'image_id',
      'thumbnail',
      'artist_title',
      'description',
      'department_title',
      'date_display',
    ],
    'limit': limit,
    'sort': [
      sortBy,
    ],
    'query': {
      'bool': {
        ...searchQuery && {'filter': [
          {
            'match': searchQuery,
          },
        ]},
        'must': [
          {
            'term': {
              'is_public_domain': true,
            },
          },
          {
            'exists': {
              'field': 'image_id',
            },
          },
          {
            'exists': {
              'field': 'thumbnail.width',
            },
          },
          {
            'exists': {
              'field': 'thumbnail.height',
            },
          },
          {
            'exists': {
              'field': 'description',
            },
          },
          {
            'exists': {
              'field': 'department_title',
            },
          },
          {
            'exists': {
              'field': 'artist_title',
            },
          },
          {
            'exists': {
              'field': 'date_display',
            },
          },
        ],
      },
    },
  };
}

function getMuseumArtworks(path, params, sortBy, searchField, search) {
  const apiUrl = new URL('https://aggregator-data.artic.edu/api/v1/');
  apiUrl.pathname += path;
  if (params) {
    for (const [key, value] of params) {
      apiUrl.searchParams.append(key, value);
    }
  }
  const API = apiUrl.toString();

  return fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(getQuery(
        params.get('limit'),
        sortByQuerySyntax.get(sortBy),
        convertSearchToQuerySyntax(searchField, search))),
  })
      .then(handleErrors)
      .then((res) => res.json());
}

function artworksJsonToMap(artworks) {
  const artworksMap = new Map();
  for (const artwork of artworks) {
    artworksMap.set(artwork.id.toString(), convertToArtworkInfo(artwork));
  }
  return artworksMap;
}

export function fetchMuseumArtworks(
    page, limit, searchQuery='', sortBy='relevance', searchField='') {
  /*
   if user wants to search by all fields, perform a simple query
   instead of a complex query
  */
  let simpleQuery = '';
  let searchFieldArgument = searchField;
  if (searchField === 'all-fields') {
    simpleQuery = searchQuery;
    searchFieldArgument = '';
  }

  return (dispatch) => {
    dispatch(fetchMuseumArtworksBegin());
    return getMuseumArtworks('artworks/search',
        new Map()
            .set('page', page)
            .set('limit', limit)
            .set('q', simpleQuery),
        sortBy,
        searchFieldArgument,
        searchQuery,
    )
        .then((artworks) => artworks.data)
        .then((artworks) => {
          return artworksJsonToMap(artworks);
        })
        .then((artworks) => {
          dispatch(fetchMuseumArtworksSuccess(artworks));
          return artworks;
        })
        .catch((error) =>
          dispatch(fetchMuseumArtworksFailure(error)),
        );
  };
}

export function fetchSingleMuseumArtwork(id) {
  return (dispatch) => {
    dispatch(fetchSingleMuseumArtworkBegin());
    return getMuseumArtworks(`artworks/${id}`, new Map()
        .set('limit', 1),
    )
        .then((artwork) => artwork.data)
        .then((artwork) => {
          return convertToArtworkInfo(artwork);
        })
        .then((artwork) => {
          dispatch(fetchSingleMuseumArtworkSuccess(artwork));
          return artwork;
        })
        .catch((error) =>
          dispatch(fetchSingleMuseumArtworkFailure(error)),
        );
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_MUSEUM_ARTWORKS_BEGIN =
  'FETCH_MUSEUM_ARTWORKS_BEGIN';
export const FETCH_MUSEUM_ARTWORKS_SUCCESS =
  'FETCH_MUSEUM_ARTWORKS_SUCCESS';
export const FETCH_MUSEUM_ARTWORKS_FAILURE =
  'FETCH_MUSEUM_ARTWORKS_FAILURE';
export const FETCH_SINGLE_MUSEUM_ARTWORK_BEGIN =
  'FETCH_SINGLE_MUSEUM_ARTWORK_BEGIN';
export const FETCH_SINGLE_MUSEUM_ARTWORK_SUCCESS =
    'FETCH_SINGLE_MUSEUM_ARTWORK_SUCCESS';
export const FETCH_SINGLE_MUSEUM_ARTWORK_FAILURE =
    'FETCH_SINGLE_MUSEUM_ARTWORK_FAILURE';
export const SET_CURRENT_MUSEUM_ARTWORK =
    'SET_CURRENT_MUSEUM_ARTWORK';

export const fetchMuseumArtworksBegin = () => ({
  type: FETCH_MUSEUM_ARTWORKS_BEGIN,
});

export const fetchMuseumArtworksSuccess = (artworks) => ({
  type: FETCH_MUSEUM_ARTWORKS_SUCCESS,
  payload: {artworks},
});

export const fetchMuseumArtworksFailure = (error) => ({
  type: FETCH_MUSEUM_ARTWORKS_FAILURE,
  payload: {error},
});

export const fetchSingleMuseumArtworkBegin = () => ({
  type: FETCH_SINGLE_MUSEUM_ARTWORK_BEGIN,
});

export const fetchSingleMuseumArtworkSuccess = (artwork) => ({
  type: FETCH_SINGLE_MUSEUM_ARTWORK_SUCCESS,
  payload: {artwork},
});

export const fetchSingleMuseumArtworkFailure = (error) => ({
  type: FETCH_SINGLE_MUSEUM_ARTWORK_FAILURE,
  payload: {error},
});

export const setCurrentMuseumArtwork = (id) => ({
  type: SET_CURRENT_MUSEUM_ARTWORK,
  payload: {id},
});
