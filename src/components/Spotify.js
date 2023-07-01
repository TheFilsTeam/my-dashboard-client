import { Spotify as SpotifyPlayer } from 'react-spotify-embed';
export default function Spotify({contentUrl}){
    console.log("Spotify url", contentUrl);
    return (
    <div id="spotify-player">
        {!contentUrl && <p>Configure spotify content url in settings</p>}
        {contentUrl && <SpotifyPlayer link={contentUrl} /> }
    </div>);
}