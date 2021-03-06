/**
 * @author Rohan Gajjar
 */
////////////////////// Load module start///////////////////////////////////////////////////
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const User = require('../models/userSchema');
const Genres = require('../models/genresSchema')
require('../db/conn');
const upload = require('../multer')
const cloudinary = require('../cloudinary')
const path = require('path');

////////////////////// Load module end///////////////////////////////////////////////////


//register route
router.post('/signUp', async (req, res) => {

    const { userData, genres } = req.body
    console.log("userData", userData);
    console.log("genres", genres);

    try {
        const usernameExist = await User.findOne({ userName: userData.userName })

        const emailExist = await User.findOne({ email: userData.email })
        if (emailExist || usernameExist) {
            res.status(400).send({ error: "user Already Exist" })
        } else {
            const result = await User(userData).save();

            await User.updateOne({ userName: userData.userName }, { $push: { genres: genres } });

            res.send("Register Sucessfuly")

        }

    }
    catch (err) {
        res.send("error" + err)
    };
})

//login route
router.post('/signIn', async (req, res) => {
    try {
        let token;

        const { email, password } = req.body;

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if (!isMatch) {
                res.status(400).send({ error: "Invalid Credientials!" });
            }
            else {
                token = await userLogin.generateAuthToken();
                console.log("token", token);
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 3600000),

                });
                res.send({ msg: "User Login Successfully!" });
            }
        }
        else {

            res.status(400).send({ error: "Invalid Credientials!" });
        }
    } catch (err) {
        res.send(err)
    }
})

router.put('/updateUser/:id/:email', async (req, res) => {
    try {
        let id = req.params.id;
        let email = req.params.email;
        let updatedValue = req.body
        console.log("updatedValue", updatedValue);

        const result = await User.findByIdAndUpdate(id, updatedValue,
            {
                new: false
            },
        );

        res.json({ msg: "Profile Update SuccessFully" })


        console.log("result", result);
    }
    catch (err) {
        res.send("error" + err)
    };
});

router.put('/changePassword/:id', async (req, res) => {
    try {
        console.log(req.params.id);

        const { oldPassword, password, confirmPassword } = req.body;
        const userLogin = await User.findOne({ _id: req.params.id });
        if (userLogin) {
            const isMatch = await bcrypt.compare(oldPassword, userLogin.password)
            if (isMatch) {
                const bcryptPass = await bcrypt.hash(password, 10);
                const bcryptCPass = await bcrypt.hash(confirmPassword, 10);
                const result = await User.findByIdAndUpdate(req.params.id, { password: bcryptPass, confirmPassword: bcryptCPass },
                    {
                        new: false
                    },
                );
                res.json({ msg: "Password Change SuccessFully" })
            }
            else {
                res.status(400).send({ error: "Old Password did not match" });

            }
        }
    } catch (err) {
        res.send(err)
    }
})


router.post('/addGenres', authenticate, async (req, res) => {

    const genres = req.body
    try {

        const result = await Genres(genres).save();
        res.send("Genres Publised")


    }
    catch (err) {
        res.send("error" + err)
    };
})
router.get('/getGenres', async (req, res) => {

    try {
        const page = req.query.Page
        const search = req.query.Request
        let limit = 5
        let skip = (page - 1) * limit;

        aggregateQuery = []
        if (search === "") {
            aggregateQuery.push(
                { $sort: { title: 1 } },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )
        } else if (search !== "") {
            aggregateQuery.push(
                {
                    $match: { "title": new RegExp("^" + search, 'i') },

                },

                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )
        }

        const matchUser = await Genres.aggregate([{ $sort: { title: 1 } }]);
        let totalPage = Math.ceil(matchUser.length / limit);
        const genres = await Genres.aggregate(aggregateQuery)
        res.send({ genres, totalPage })
    }
    catch (err) {
        res.send("error" + err)
    };
})
router.delete('/deleteGenres/:id', authenticate, async (req, res) => {

    try {

        await Genres.findByIdAndDelete(req.params.id)
        res.send({ msg: "Genres Deleted Successfully" })

    }
    catch (err) {
        res.send("error" + err)
    };
});
router.put('/updateGenres/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedValue = req.body
        console.log("updatedValue", updatedValue);

        const result = await Genres.findByIdAndUpdate(id, updatedValue,
            {
                new: false
            },
        );

        res.json({ msg: "Genres update Successfully" })

    }
    catch (err) {
        res.send("error" + err)
    };
});

router.get('/getArtistList', async (req, res) => {

    try {
        const page = req.query.Page
        const search = req.query.Request
        let limit = 5
        let skip = (page - 1) * limit;

        aggregateQuery = []

        aggregateQuery.push(
            { $match: { "roll": "artist" } },
        )

        if (search === "") {
            aggregateQuery.push(

                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )
        } else if (search !== "") {
            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            { "userName": new RegExp("^" + search, 'i') },
                            { "email": new RegExp(search, 'i') },

                        ]
                    },
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )


        }

        const matchUser = await User.aggregate([{ $match: { "roll": "artist" } }]);
        let totalPage = Math.ceil(matchUser.length / limit);
        const artists = await User.aggregate(aggregateQuery)
        res.send({ artists, totalPage })
    }
    catch (err) {
        res.send("error" + err)
    };
})

router.post('/uploadNFT', authenticate, upload.single('image'), async (req, res) => {
    try {

        const userId = req.query.Id;
        const { title, description, price } = req.body.values;
        const audioFile = req.body.AudioFile;
        const coverImage = req.body.CoverImg;

        const Nft = {
            title, description, coverImage, audioFile, price
        }
        await User.findOneAndUpdate({ _id: userId }, { $push: { NFT: Nft } })

        res.send({ msg: " Audio Nft Created Successfully! " })
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//============================= Add Audio Nft Audio File =============================

router.post('/uploadImg', authenticate, upload.single('image'), async (req, res) => {
    try {

        const file = req.file;

        const type = path.extname(file.originalname);

        if (type !== '.jpg' && type !== '.jpeg' && type !== '.png') {
            res.status(400).send({ error: 'File Is Not An Image file!' })
        }
        else {
            const uploadFiles = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });

            const coverImg = uploadFiles.secure_url;

            res.send(coverImg);
        }
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
});


//============================= Add Audio Nft =============================

router.post('/uploadAudioFile', authenticate, upload.single('audio'), async (req, res) => {

    try {


        const file = req.file;

        const type = path.extname(file.originalname);

        if (type !== '.mp3' && type !== '.wav' && type !== '.sit') {

            res.status(400).send({ error: 'File Is Not An Audio file!' })
        }
        else {
            const uploadFiles = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });

            const audioFile = uploadFiles.secure_url;

            res.send(audioFile);

        }
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
});

router.get('/getNFT', async (req, res) => {
    try {

        let aggregateQuery = [];

        aggregateQuery.push(
            {
                $unwind: "$NFT"
            },
            {
                $sort: {
                    "NFT.createAt": -1
                }
            }
        );

        const playList = await User.aggregate([aggregateQuery]);

        res.send(playList)
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
});

router.get('/getArtistAndGenresCount', authenticate, async (req, res) => {
    try {
        const aggregateQuery = [];

        aggregateQuery.push(
            {
                $match: {
                    roll: "artist"
                }
            }
        )

        const artists = await User.aggregate([aggregateQuery]);

        const ArtistCount = artists.length;

        const genres = await Genres.find();
        const GenresCount = genres.length;

        res.send({ ArtistCount, GenresCount });
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
});
//////////////////////////// ***********************************/////////////////////////////
router.post('/uploadProfilePicture/:email', upload.single('profilePicture'), async (req, res) => {

    try {
        const photo = req.file;
        const UserEmail = req.params.email

        const uploadPhoto = await cloudinary.uploader.upload(photo.path, { resource_type: 'auto' });

        await User.updateOne({ email: UserEmail }, { $push: { profilePhoto: uploadPhoto.secure_url } })

        res.send({ msg: "Profile Picture Updated Successfully!" })

    }
    catch (err) {
        res.send(err);
    }
})


router.get('/logout', authenticate, async (req, res) => {

    try {
        req.authenticateUser.Tokens = req.authenticateUser.Tokens.filter((ele) => {
            return ele.token !== req.token
        })
        //clear cookie
        res.clearCookie("jwt");
        await req.authenticateUser.save();
        res.status(200).send("User Logout");

    }
    catch (err) {
        res.status(500).send(err);
    }

});

router.get('/getLoginUserDetails', authenticate, async (req, res) => {
    try {
        const LoginUser = req.authenticateUser
        const LoginUserBlogs = req.authenticateUser.Articles
        res.send({ LoginUser, LoginUserBlogs });

    }
    catch (err) {
        res.send(err)
    }
})
router.put('/getPublicBlogs', authenticate, async (req, res) => {
    try {
        const blogs = await User.find()
        res.send({ blogs });

    }
    catch (err) {
        res.send(err)
    }
})
router.post('/addNewBlog', authenticate, async (req, res) => {
    try {

        const { title, description, category, tags } = req.body.values;
        const banner = req.body.Banner;
        const article = {
            title: title,
            description: description,
            category: category,
            tags: tags,
            banner: banner
        }

        await User.updateOne({ email: req.authenticateUser.email }, { $push: { Articles: article } })

        res.send({ msg: 'Article Added successfully!' })
    }
    catch (err) {
        res.send(err)
    };
});

router.post('/uploadArticalBanner', upload.single('ArticalBanner'), async (req, res) => {

    try {

        const photo = req.file;

        const uploadPhoto = await cloudinary.uploader.upload(photo.path, { resource_type: 'auto' });

        const banner = uploadPhoto.secure_url;

        res.send(banner);
    }
    catch (err) {
        res.send(err)
    };
})

router.delete('/deletePersonalBlog/:id', authenticate, async (req, res) => {

    try {

        await User.updateOne(
            { email: req.authenticateUser.email },
            { $pull: { Articles: { _id: req.params.id } } }
        )

        //============================= Send Response =============================
        res.send({ msg: "Blog Deleted Successfully" })

    }
    catch (err) {
        res.send("error" + err)
    };
});
router.put('/editAndUpdatePersonalBlog', authenticate, async (req, res) => {
    try {
        const { _id, title, description, category, tags, banner } = req.body.values;
        const ArticleBanner = req.body.Banner;

        if (ArticleBanner.length === undefined) {
            const article = {
                _id: _id,
                title: title,
                description: description,
                category: category,
                tags: tags,
                banner: banner
            }
            await User.findOneAndUpdate(
                { "Articles._id": req.query.id }, { $set: { "Articles.$": article } }
            );
            res.send({ msg: 'Blog Update successfully!' })
        }
        else {
            const article = {
                _id: _id,
                title: title,
                description: description,
                category: category,
                tags: tags,
                banner: ArticleBanner
            }
            await User.findOneAndUpdate(
                { "Articles._id": req.query.id }, { $set: { "Articles.$": article } }
            );
            res.send({ msg: 'Blog Update successfully!' })

        }
    }
    catch (err) {
        console.log("hello catch");

        res.send(err)
    }
})



router.put('/likeBlog/:id', authenticate, async (req, res) => {

    try {

        const { userId, username } = req.body;
        const articleId = req.params.id;



        const like = await User.findOneAndUpdate({ "Articles._id": articleId }, { $push: { "Articles.$.likes": userId } })


        res.send({ msg: "Like" })

    }
    catch (err) {
        res.send("error" + err)
    };
});
router.put('/unlikeBlog/:id', authenticate, async (req, res) => {

    try {

        const { userId, username } = req.body;
        const articleId = req.params.id;



        const unlike = await User.findOneAndUpdate({ "Articles._id": articleId }, { $pull: { "Articles.$.likes": userId } })


        res.send({ msg: "Unlike" })

    }
    catch (err) {
        res.send("error" + err)
    };
});
router.get('/getLikes', authenticate, async (req, res) => {

    try {

        let aggregateQuery = [];

        aggregateQuery.push(
            {
                $project: { userName: 1 }
            }
        )
        //============================= Get Like Articles =============================
        const likes = await User.aggregate([aggregateQuery]);
        res.send(likes);
    }
    catch (err) {
        res.send("error" + err)
    };
});

router.post('/addComment/:id', authenticate, async (req, res) => {

    try {
        const { userId, username, comment } = req.body;
        const articleId = req.params.id;

        const user = {
            userId: userId,
            username: username,
            comment: comment
        };

        const alreadyCommentByOtheres = await Comment.findOne({ articleId: articleId });


        if (alreadyCommentByOtheres !== null) {

            await Comment.updateOne({ articleId: articleId }, { $push: { Users: user } });

            res.send({ msg: "Comment Posted" });
        }
        else {

            await new Comment({ articleId }).save();
            await Comment.updateOne({ articleId: articleId }, { $push: { Users: user } });

            res.send({ msg: "Comment Posted" });
        }

    }
    catch (err) {
        res.send("error" + err)
    };
});

router.get('/getComments', authenticate, async (req, res) => {

    try {

        const comments = await Comment.find();
        res.send(comments);
    }
    catch (err) {
        res.send("error" + err)
    };
});

router.put('/getSearchBlogs', authenticate, async (req, res) => {

    try {
        const { SearchValue } = req.body;
        let aggregateQuery = [];

        if (SearchValue === "") {
            aggregateQuery.push(

                {
                    $unwind: "$Articles",
                },

            )
            const blogs = await User.aggregate([aggregateQuery]);

            res.send(blogs);
        }

        else {
            aggregateQuery.push(
                {
                    $unwind: "$Articles",
                },
                {
                    $match: {
                        $or: [
                            { "Articles.title": new RegExp("^" + SearchValue, 'i') },
                            { "Articles.category": new RegExp("^" + SearchValue, 'i') },
                            { "Articles.tags": new RegExp(SearchValue, 'i') },
                            { "userName": new RegExp("^" + SearchValue, 'i') }
                        ]
                    },
                }
            );

            const matchUser = await User.aggregate([aggregateQuery]);
            res.send(matchUser);
        }
    }
    catch (err) {
        console.log(err);

    };
});

module.exports = router;