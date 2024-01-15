import FeedbackItem from "./FeedbackItem";

const feedbackItems = [
  {
    upvoteCount: 411,
    badgeLetter: "S",
    companyName: "Starbucks",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    daysAgo: 5
  },
  {
    upvoteCount: 312,
    badgeLetter: "SA",
    companyName: "SAntonov",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit test",
    daysAgo: 2
  }
];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedbackItems.map(feedbackItem => (
        <FeedbackItem feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
