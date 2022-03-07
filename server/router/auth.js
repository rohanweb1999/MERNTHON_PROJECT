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
// const Comment = require('../models/commentsSchema');
require('../db/conn');
const upload = require('../multer')
const cloudinary = require('../cloudinary')
const path = require('path');

////////////////////// Load module end///////////////////////////////////////////////////


//register route
router.post('/signUp', async (req, res) => {

    const userData = req.body
    try {
        const userExist = await User.findOne({ email: userData.email })
        if (userExist) {
            res.status(400).send({ error: "user Already Exist" })
        } else {
            const result = await User(userData).save();
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
        if (updatedValue.email !== email) {
            const emailExist = await User.findOne({ email: updatedValue.email });

            if (emailExist) {
                return res.status(400).send({ error: "This Email is already taken" });
            }
            else {
                await User.findByIdAndUpdate(id, updatedValue,
                    {
                        new: false
                    },
                );

                res.json({ msg: "Profile Update SuccessFully" })
            }
        }
        else {

            await User.findByIdAndUpdate(id, updatedValue,
                {
                    new: false
                },
            );

            res.json({ msg: "Profile Update SuccessFully" })
        }


    }
    catch (err) {
        res.send("error" + err)
    };
});

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