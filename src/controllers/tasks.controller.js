import Tweet from "../models/tweet.model.js";

export const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate("user");
  res.json(tweets);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};

export const getTweets = async (req, res) => {
  try {
    const tweet = await Tweet.find({
        user: req.user.id,
      }).populate("user");
      res.json(tweet);
  } catch (error) {
    return res.status(404).json({ message: "Tweets went wrong" });
  }
};

export const createTweet = async (req, res) => {
  try {
    const { theme, date } = req.body;

  const newTweet = new Tweet({ theme, date, user: req.user.id });
  const savedTweet = await newTweet.save();
  res.json(savedTweet);
  } catch (error) {
    return res.status(400).json({ message: "Error creating tweet" });
  }
};

export const getTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).populate("user");
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });
    res.json(tweet);
  } catch (error) {
    return res.status(404).json({ message: "Tweet not found" });
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndDelete(req.params.id);
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Tweet not found" });
  }
};

export const updateTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tweet) return res.status(404).json({ message: "Tweet not found" });
    res.json(tweet);
  } catch (error) {
    return res.status(404).json({ message: "Tweet not found" });
  }
};
