import create from "../../images/tutorial/create.png";
import pending from "../../images/tutorial/pending.png";
import chat from "../../images/tutorial/chat.png";
import games from "../../images/tutorial/games.png";
import map from "../../images/tutorial/map.png";

const TutorialData = [
  {
    title: "Create Game",
    desc: "As simple as filling up all the information needed to playing the game of your needs! Set a time, price, type of players, and location and start attracting players nearby right away!",
    img: create,
  },
  {
    title: "Pick Users",
    desc: "Go through an array of potential users and view whether or not their profiles are suitable for your game. You get to make the decision and the types of player you're going with!",
    img: pending,
  },
  {
    title: "Communicate",
    desc: "Using the secure live-chat feature, users that have been approved into your game can communicate in real time regarding game plans and details, ensuring smooth and easy gameplay!",
    img: chat,
  },
  {
    title: "Play",
    desc: "Use the icon at the top right (controller) to view all your current or past games and easily gain access to them! This way, your games are orgnanized and you know when your next game is up!",
    img: games,
  },
  {
    title: "Rate & Explore",
    desc: "Finally, you can rate the players you've played with or against, making sure everyone is safe and competent at playing. This makes the platform safer and more enjoyable for everyone!",
    img: map,
  },
];

export default TutorialData;
