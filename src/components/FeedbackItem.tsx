import { TriangleUpIcon } from "@radix-ui/react-icons";

import { TFeedbackItem } from "../lib/types";

type FeedmackItemProps = {
  feedbackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedbackItem }: FeedmackItemProps) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedbackItem.upvoteCount}</span>
      </button>

      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedbackItem.companyName}</p>
        <p>{feedbackItem.text}</p>
      </div>

      <p>{feedbackItem.daysAgo}d</p>
    </li>
  );
}
