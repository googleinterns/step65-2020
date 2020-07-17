import PlaceholderImage from '../components/dashboard/images/colorful.jpeg';

function fakeGetUserArtworks() {
  return new Promise((resolve) => {
    // Resolve after a timeout so we can see the loading indicator
    setTimeout(
        () =>
          resolve({
            artworks: [
              {
                id: 0,
                title: 'title',
                artist: 'artist',
                alt: 'alt text',
                description: 'description',
                img: PlaceholderImage,
              },
              {
                id: 1,
                title: 'title',
                artist: 'artist',
                alt: 'alt text',
                description: 'description',
                img: PlaceholderImage,
              },
              {
                id: 2,
                title: 'title',
                artist: 'artist',
                alt: 'alt text',
                description: 'description',
                img: PlaceholderImage,
              },
              {
                id: 3,
                title: 'title',
                artist: 'artist',
                alt: 'alt text',
                description: 'description',
                img: PlaceholderImage,
              },
              {
                id: 4,
                title: 'title',
                artist: 'artist',
                alt: 'alt text',
                description: 'description',
                img: PlaceholderImage,
              },
              {
                id: 5,
                title: 'title',
                artist: 'artist',
                alt: 'alt text',
                description: 'description',
                img: PlaceholderImage,
              },
              {
                id: 6,
                title: 'title',
                artist: 'artist',
                alt: 'alt text',
                description: 'description',
                img: PlaceholderImage,
              },
              {
                id: 7,
                title: 'title',
                artist: 'artist',
                alt: 'alt text',
                description: 'description',
                img: PlaceholderImage,
              },
              {
                id: 8,
                title: 'title',
                artist: 'artist',
                alt: 'alt text',
                description: 'description',
                img: PlaceholderImage,
              },
            ],
          }),
        1000,
    );
  });
}

function convertToArtworkInfo(artwork) {
  const artworkInfo = new Map();
  artworkInfo.set('id', artwork.id);
  artworkInfo.set('alt', artwork.alt);
  artworkInfo.set('url', artwork.img);
  artworkInfo.set('title', artwork.title);
  artworkInfo.set('artist', artwork.artist);
  artworkInfo.set('description', artwork.description);
  return artworkInfo;
}

function artworksJsonToMap(artworks) {
  const artworksMap = new Map();
  for (const artwork of artworks) {
    artworksMap.set(artwork.id.toString(), convertToArtworkInfo(artwork));
  }
  return artworksMap;
}

export function fetchUserArtworks() {
  return (dispatch) => {
    dispatch(fetchUserArtworksBegin());
    return fakeGetUserArtworks()
        .then((json) => json.artworks)
        .then((artworks) => artworksJsonToMap(artworks))
        .then((artworksMap) => {
          dispatch(fetchUserArtworksSuccess(artworksMap));
          return artworksMap;
        })
        .catch((error) =>
          dispatch(fetchUserArtworksFailure(error)),
        );
  };
}

export const FETCH_USER_ARTWORKS_BEGIN = 'FETCH_USER_ARTWORKS_BEGIN';
export const FETCH_USER_ARTWORKS_SUCCESS =
    'FETCH_USER_ARTWORKS_SUCCESS';
export const FETCH_USER_ARTWORKS_FAILURE =
    'FETCH_USER_ARTWORKS_FAILURE';

export const fetchUserArtworksBegin = () => ({
  type: FETCH_USER_ARTWORKS_BEGIN,
});

export const fetchUserArtworksSuccess = (artworks) => ({
  type: FETCH_USER_ARTWORKS_SUCCESS,
  payload: {artworks},
});

export const fetchUserArtworksFailure = (error) => ({
  type: FETCH_USER_ARTWORKS_FAILURE,
  payload: {error},
});
