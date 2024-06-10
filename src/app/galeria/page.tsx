import {ImageCard, Template} from "@/components";

export default function GaleriaPage(){
    return(
        <Template>
            <h1 className="font-bold ">Galeria</h1>

            <section className="grid grid-cols-3 gap-3">
                <ImageCard
                    src='https://cdn.mos.cms.futurecdn.net/EFXSes9UCfsyRVoNeQ2ZTB.png'
                    nome='Paisagem Pixel Art'
                    tamanho='4MB'
                    dataUpload='01/01/2024'
                />

                <ImageCard
                    src='https://cdn.mos.cms.futurecdn.net/EFXSes9UCfsyRVoNeQ2ZTB.png'
                    nome='Paisagem Pixel Art'
                    tamanho='4MB'
                    dataUpload='01/01/2024'
                />

                <ImageCard
                    src='https://cdn.mos.cms.futurecdn.net/EFXSes9UCfsyRVoNeQ2ZTB.png'
                    nome='Paisagem Pixel Art'
                    tamanho='4MB'
                    dataUpload='01/01/2024'
                />

                <ImageCard
                    src='https://cdn.mos.cms.futurecdn.net/EFXSes9UCfsyRVoNeQ2ZTB.png'
                    nome='Paisagem Pixel Art'
                    tamanho='4MB'
                    dataUpload='01/01/2024'
                />

                <ImageCard
                    src='https://cdn.mos.cms.futurecdn.net/EFXSes9UCfsyRVoNeQ2ZTB.png'
                    nome='Paisagem Pixel Art'
                    tamanho='4MB'
                    dataUpload='01/01/2024'
                />

                <ImageCard
                    src='https://cdn.mos.cms.futurecdn.net/EFXSes9UCfsyRVoNeQ2ZTB.png'
                    nome='Paisagem Pixel Art'
                    tamanho='4MB'
                    dataUpload='01/01/2024'
                />
            </section>
        </Template>
    )
}