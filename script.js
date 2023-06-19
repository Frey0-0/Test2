function fetch() {
  const output = document.getElementById("output");
  const url = "https://test.tanmaybajaj.repl.co/";
  console.log("Fetching...");
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
