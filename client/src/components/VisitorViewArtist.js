import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArtistList } from '../actions'
import Pagination from '@mui/material/Pagination';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Bg from '../assets/bg.jpg'

const VisitorViewArtist = () => {
    const [pageNumber, setpageNumber] = useState(1)

    const page = useSelector(state => state.blogUserReducer.page)
    const artistList = useSelector(state => state.blogUserReducer.artistList)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArtistList(pageNumber))
    }, [pageNumber])
    return (
        <div className='listGenresMainDiv'>
            <div className='slide-image'>

                <div className='mainCardDiv'>
                    {
                        artistList && artistList.map((list) => {
                            return (
                                <>
                                    <div className='cardBox'>
                                        <div className='ArtistView'>
                                            <Avatar alt="Remy Sharp" id="profileImg" src={list.profilePhoto ? list.profilePhoto : "/static/images/avatar/2.jpg"} />
                                            <h6 id='artistUsername'>@{list.userName}</h6>
                                        </div>
                                        <div>
                                            <h6>{list.bio}</h6>
                                        </div>
                                        <div >
                                            {
                                                list && list.genres.map((items => {
                                                    return <Chip
                                                        id='listGenresNames'
                                                        label={items}
                                                        variant="outlined" />

                                                }))
                                            }
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

export default VisitorViewArtist