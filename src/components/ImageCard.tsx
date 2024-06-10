interface ImageCardProps{
    src: string;
    nome: string;
    tamanho: string;
    dataUpload: string;
}

export const ImageCard: React.FC<ImageCardProps> = ( {src, nome, tamanho, dataUpload } : ImageCardProps) => {
    return (
        <nav className="card mt-5 relative bg-neutral-800 rounded-md
         transition-transform ease-in duration-300
         transform hover:shadow-lg hover:-translate-y-2 hover:100">

            <img className=" h-56 w-full object-cover rounded-md" src={src} alt=""/>
            <section className="py-4">
                <div className="m-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-600">{nome}</h3>
                    <p className="text-xs mb-2 text-indigo-600">{tamanho}</p>
                    <p className="text-xs text-indigo-600">{dataUpload}</p>
                </div>
            </section>

        </nav>
    )
}
