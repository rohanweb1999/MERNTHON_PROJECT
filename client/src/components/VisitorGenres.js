import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { deleteGenres, getGenres, getLoginUserDetails } from '../actions'
import genresBg from '../assets/genres.jpg';
import Pagination from '@mui/material/Pagination';
const VisitorGenres = () => {

    const dispatch = useDispatch()
    const [pageNumber, setpageNumber] = useState(1)

    const genres = useSelector(state => state.blogUserReducer.genres)
    const page = useSelector(state => state.blogUserReducer.page)
    const toggle = useSelector(state => state.blogUserReducer.toggle)


    useEffect(() => {
        dispatch(getGenres(pageNumber))
    }, [pageNumber, toggle])

    return (
        <div className='listGenresMainDiv'>
            <div className='slide-image'>
                <div className='mainCardDiv'>
                    {
                        genres && genres.map((list) => {
                            return (
                                <>
                                    <div className='cardBox'>
                                        <div>
                                            <h3>{list.title}</h3>
                                        </div>
                                        <div>
                                            <p>{list.description}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className="pagination" >
                <Pagination
                    id="pagination"
                    count={page}
                    variant="outlined"
                    color="secondary"
                    onChange={(e, value) => { setpageNumber(value) }}
                />
            </div>
        </div>
    )
}

export default VisitorGenres

