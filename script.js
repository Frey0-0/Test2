function fetch(){
  const output = document.getElementById('output');
  const url = 'https://test.tanmaybajaj.repl.co/';
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    output.innerHTML = data;
  });
}