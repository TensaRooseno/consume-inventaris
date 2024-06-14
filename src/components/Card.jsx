export default function Card(props){
    return(
        <>
        <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg w-3/4 p-10 mt-20 ">
        <h4 className='text-white text-2xl'>Card</h4><br />
        <h1 className="text-white">Judul : {props.judul}</h1>
        <p className="text-white">Content: {props.content}</p>
        </div>
        </>
    )
}