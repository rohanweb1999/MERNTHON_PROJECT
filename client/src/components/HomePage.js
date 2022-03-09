import React from 'react'
import HomeImg from '../assets/1.jpg'
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getNFT } from '../actions';


const HomePage = () => {

    const dispatch = useDispatch();


    const AudioFile = useSelector(state => state.blogUserReducer.AudioFile)
    console.log("AudioFile", AudioFile);
    useEffect(() => {
        dispatch(getNFT())
    }, [])
    return (
        <div className='main-div'>
            <div className='slide-image'>
                <img className='HomeImg' src={HomeImg} alt='jpg'></img>
                <div className='cardmaindiv'>
                    {
                        AudioFile && AudioFile.map((items => {
                            return (
                                <>
                                    <Card sx={{ maxWidth: 345 }} className='NFTBox'>
                                        <CardMedia
                                            component="img"
                                            alt="green iguana"
                                            height="140"
                                            image={items.NFT.coverImage}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {items.NFT.title}
                                            </Typography>

                                            <h6 id='nftUserName'>@{items.userName}</h6>
                                        </CardContent>
                                    </Card>
                                </>
                            )
                        }))
                    }




                </div>
            </div>

        </div>

    )
}

export default HomePage