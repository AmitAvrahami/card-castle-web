import React from 'react'
import { useParams } from 'react-router-dom'

const PackDetails = ({ packs }) => {
    const { packName } = useParams()
    const pack = packs.find(pack => pack.set_name === packName)

    if (!pack) {
        return <div>Pack not found</div>
    }


    return (
        <div>
            <h2>{pack.set_name}</h2>
            <img src={pack.set_image} alt={pack.set_name} />
        </div>

    )

}

export default PackDetails


