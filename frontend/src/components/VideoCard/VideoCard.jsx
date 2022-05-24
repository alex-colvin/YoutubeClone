import './VideoCard.css'


const VideoCard = (props) => {

    return ( 
     
            <div className='card shadow'>
                <img src={props.video.snippet.thumbnails.medium.url} />
                <div>
                    <h6>{props.video.snippet.title}</h6>
                </div>
            </div>

     );
}
 
export default VideoCard;