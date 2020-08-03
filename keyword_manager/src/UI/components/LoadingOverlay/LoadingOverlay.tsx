import React from 'react'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const LoadingOverlay = () => {

    return(
        <div className='LoadingOverlay'>
            <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={10000}
            />
        </div>
    )
}

export { LoadingOverlay }