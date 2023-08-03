import data from "./data.js";

//Using slope intercept form on user input
const slopeIntercept = (userInput) => {
  const mappedScore = 0.5 * userInput - 1.5;
  return mappedScore;
};

// Similarity Formula
const percentSimilarity = (userInput, roleScore) => {
  // 6 being the max difference possible
  return Math.floor(100 * (1 - Math.abs(userInput - roleScore) / 6));
};

// Calculates score from user inputs
const caculateUserScore = () => {
  const workOutdoors = document.querySelector("#outdoors-work").value;
  const handSkills = document.querySelector("#hand-skills").value;
  const techWork = document.querySelector("#tech-work").value;

  return (
    slopeIntercept(workOutdoors) +
    slopeIntercept(handSkills) +
    slopeIntercept(techWork)
  );
};

// A first draft at puttin it all together
const searchAlgorithm = () => {
  const userScore = caculateUserScore();
  const results = data.map((el) => {
    const roleScore =
      el.outdoorsExtent + el.handsOnExtent + el.technologyExtent;

    return {
      title: el.name,
      matchScore: percentSimilarity(userScore, roleScore),
    };
  });

  //Sort results
  results.sort((a, b) => b.matchScore - a.matchScore);

  //Cut to top three matches
  const topMatches = results.slice(0, 3);

  //Console logs each match scole and job title
  topMatches.forEach((match, index) => {
    console.log(
      `#${index + 1}: Job Title: ${match.title} | Match Score: ${
        match.matchScore
      }`
    );
  });
};

const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", (event) => {
  //Prevent page reload
  event.preventDefault();

  //Run Algorithm
  searchAlgorithm();

  //Reset form
  const form = document.querySelector("form");
  form.reset();
});
