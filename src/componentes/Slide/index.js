import { useState } from "react"
        

export default function Slide () {
    const images = ["1.jpg","2.jpg","3.jpg"]
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedImage, setSelectedImage] = useState(images[0])

    /*useEffect(()=>{
        setInterval(() => {
            next()
        }, 5000);
    },[selectedImage])*/

    const prev = () => {
        const condition = selectedIndex>0
        const nextIndex = condition ? selectedIndex-1 : images.length-1
        setSelectedIndex(nextIndex)
        setSelectedImage(images[nextIndex])
    }
    const next = () => {
        setSelectedIndex(1)
        const condition = selectedIndex<images.length-1
        const nextIndex = condition ? selectedIndex+1 : 0
        setSelectedIndex(nextIndex)
        setSelectedImage(images[nextIndex])
    }
    return (
        <div className="relative bg-stone-50 mb-2" >
            <div className="static">
                <img src={require(`../../assets/images/${selectedImage}`)} className="h-72 w-4/6 mx-auto rounded-lg" alt=""></img>
                <button className="w-12 h-12 bg-yellow-200 absolute absolute inset-y-28 left-0 rounded-full" onClick={prev}>
                    <box-icon name="chevron-left"></box-icon>
                </button>
                <button className="w-12 h-12 bg-yellow-200 absolute absolute inset-y-28 right-0 rounded-full" onClick={next}>
                    <box-icon name="chevron-right"></box-icon>
                </button>
            </div>
        </div>
    )
}