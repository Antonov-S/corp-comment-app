import { useEffect, useMemo, useState } from "react";

import Container from "./layout/Container";
import HashtagList from "./hashtag/HashtagList";
import Footer from "./layout/Footer";

import { TFeedbackItem } from "../lib/types";
import { API_ADDRESS } from "../lib/constants";

function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const filteredfeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(
            item => item.company.toUpperCase() === selectedCompany
          )
        : feedbackItems,
    [feedbackItems, selectedCompany]
  );

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(" ")
      .find(word => word.includes("#"))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase()
    };

    setFeedbackItems([...feedbackItems, newItem]);

    await fetch(API_ADDRESS, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  const companyList = useMemo(
    () =>
      feedbackItems
        .map(company => company.company)
        .map(companyName => companyName.toUpperCase())
        .filter(
          (companyName, index, array) => array.indexOf(companyName) === index
        ),
    [feedbackItems]
  );

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(API_ADDRESS);

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />

      <Container
        feedbackItems={filteredfeedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />

      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
