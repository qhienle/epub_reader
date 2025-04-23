document.getElementById('epub-file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            const url = URL.createObjectURL(new Blob([arrayBuffer]));
            const book = ePub(url);

            book.loaded.navigation.then(function(toc) {
                const renderer = ePub.createRenderer({
                    width: '100%',
                    height: '80vh',
                    container: document.getElementById('epub-viewer')
                });

                book.renderTo(renderer);

                // Display the table of contents
                const tocContainer = document.createElement('div');
                tocContainer.id = 'toc-container';
                document.body.appendChild(tocContainer);

                const tocList = document.createElement('ul');
                tocContainer.appendChild(tocList);

                toc.forEach(function(item) {
                    const listItem = document.createElement('li');
                    listItem.textContent = item.label;
                    listItem.addEventListener('click', function() {
                        book.goto(item.href);
                    });
                    tocList.appendChild(listItem);
                });
            });
        };
        reader.readAsArrayBuffer(file);
    }
});
