import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArtistAndGenresCount } from '../actions'


const Dashboard = () => {
    const dispatch = useDispatch()
    const ArtistCount = useSelector(state => state.blogUserReducer.ArtistCount)
    const GenresCount = useSelector(state => state.blogUserReducer.GenresCount)

    useEffect(() => {
        dispatch(getArtistAndGenresCount())
    }, [])
    return (
        <>
            <div id='dashboard'>
                <h1>DASHBOARD</h1>
            </div>
            <div className='mainCardDiv'>
                <div className='cardBox'>
                    <div>
                        <h3>Total Number of Artists</h3>
                    </div>
                    <div>
                        <p>{ArtistCount}</p>
                    </div>

                </div>

            </div>
            <div className='mainCardDiv'>
                <div className='cardBox'>
                    <div>
                        <h3>Total Number of Genres</h3>
                    </div>
                    <div>
                        <p>{GenresCount}</p>
                    </div>

                </div>

            </div>
        </>

    )
}

export default Dashboard