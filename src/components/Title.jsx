export default function Title ({name, page, lang}) {
    return (
        <>
            <div className="bg-gray-800 border-t border-gray-600 shadow rounded-lg w-full p-6 mt-10 ">
            <h1 className="text-white"> Name : {name} </h1>
            <p className="text-white"> Page : {page }</p>
            <p className="text-white"> Language : {lang} </p>
        </div>
        </>
    )
}