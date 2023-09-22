import formatTodosForAI from "./formatTodosFromAI";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);


  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });

  const GPTData = await res.json();
  const { content } = GPTData;

  return content;
};

export default fetchSuggestion;
