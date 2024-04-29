import Tweet from '../models/tweet.model.js';

export const getAllTweets = async (req, res) => {
    const tweets = await Tweet.find().populate('user')
    res.json(tweets);
}


export const getTweets = async (req, res) => {
    const tweet = await Tweet.find({
        user: req.user.id
    }).populate('user')
    res.json(tweet);
};

export const createTweet = async (req, res) => {
    const { theme, date } = req.body;


    const newTweet = new Tweet({ theme, date, user: req.user.id });
    const savedTweet = await newTweet.save();
    res.json(savedTweet);
};

export const getTweet = async (req, res) => {
    const tweet = await Tweet.findById(req.params.id).populate('user')
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });
    res.json(tweet);
};

export const deleteTweet = async (req, res) => {
    const tweet = await Tweet.findByIdAndDelete(req.params.id)
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });
    return res.sendStatus(204);
};

export const updateTweet = async (req, res) => {
    const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });
    res.json(tweet);
};