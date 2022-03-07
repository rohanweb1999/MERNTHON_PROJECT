import React from 'react'
import HomeImg from '../assets/1.jpg'
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const HomePage = () => {
    return (
        <div className='main-div'>
            <div className='slide-image'>
                <img className='HomeImg' src={HomeImg} alt='jpg'></img>
                <div className='cardmaindiv'>
                    <Card sx={{ maxWidth: 345 }} className='cardBox'>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card sx={{ maxWidth: 345 }} className='cardBox'>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card sx={{ maxWidth: 345 }} className='cardBox'>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card sx={{ maxWidth: 345 }} className='cardBox'>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>

                    </Card>
                    <Card sx={{ maxWidth: 345 }} className='cardBox'>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="140"
                            image="https://cdn.pixabay.com/photo/2015/05/07/11/02/guitar-756326_960_720.jpg"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>

                    </Card>
                </div>
            </div>

        </div>

    )
}

export default HomePage