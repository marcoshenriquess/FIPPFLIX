`use client`


export default function Play({ params: { id } }){
    return (
        <div className="video-play">
            <iframe width="560" height="315" allow='autoplay' src={`https://www.youtube.com/embed/${id}?autoplay=1`}></iframe>
        </div>
    )
}