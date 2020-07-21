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
  return artworkInfo;
};

// based off of https://github.com/kjschmidt913/AIC/blob/master/script.js
function getQuery(limit) {
  return {
    'resources': 'artworks',
    'fields': [
      'pagination',
      'id',
      'title',
      'image_id',
      'thumbnail',
      'artist_title',
      'description',
      'department_title',
    ],
    'limit': limit,
    'query': {
      'bool': {
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
        ],
      },
    },
  };
}

function getMuseumArtworks(path, params) {
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
    body: JSON.stringify(getQuery(params.get('limit'))),
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

export function fetchMuseumArtworks(page, limit) {
  return (dispatch) => {
    dispatch(fetchMuseumArtworksBegin());
    return getMuseumArtworks('artworks/search', new Map()
        .set('page', page)
        .set('limit', limit),
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
