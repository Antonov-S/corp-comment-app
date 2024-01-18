import { useState } from "react";
import { TriangleUpIcon } from "@radix-ui/react-icons";

import { TFeedbackItem } from "../../lib/types";

type FeedmackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: FeedmackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedbackItem.upvoteCount);

  const hadleUpvote = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUpvoteCount(prev => ++prev);
    e.currentTarget.disabled = true;
    e.stopPropagation();
  };

  return (
    <li
      className={`feedback ${open ? "feedback--expand" : ""}`}
      onClick={() => setOpen(prev => !prev)}
    >
      <button onClick={hadleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.company}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo === 0 ? "NEW" : `${feedbackItem.daysAgo}d`}</p>
    </li>
  );
}
