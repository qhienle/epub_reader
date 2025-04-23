let book, rendition;

document.getElementById('upload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);

    book = ePub(url);
    rendition = book.renderTo("viewer", {
      width: "100%",
      height: "100%"
    });

    rendition.display();
  }
});

document.getElementById("prev").addEventListener("click", function() {
  if (rendition) rendition.prev();
});

document.getElementById("next").addEventListener("click", function() {
  if (rendition) rendition.next();
});
