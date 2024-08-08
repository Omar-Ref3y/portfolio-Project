const text = "Wep Developer";
    const textElement = document.querySelector('.animate .text');
    let index = 0;
    let isDeleting = false;




    function type() {
        let currentText = text.slice(0, index);
        textElement.textContent = currentText;

        if (!isDeleting && index < text.length) {
            index++;
            setTimeout(type, 100);
        } else if (isDeleting && index > 0) {
            index--;
            setTimeout(type, 50);
        } else if (!isDeleting && index === text.length) {
            isDeleting = true;
            setTimeout(type, 1000);
        } else if (isDeleting && index === 0) {
            isDeleting = false;
            setTimeout(type, 500);
        }
    }

    type();

    function scrollToElement(ele, ins = 0) {
        let element = document.querySelectorAll(ele)
        if (element.length > ins) {
            element[ins].scrollIntoView({ behavior: 'smooth' })
        }
    }
    const link1 = document.getElementById("link1")
    const link2 = document.getElementById("link2")
    const link3 = document.getElementById("link3")
    link1.addEventListener('click', () => {
        scrollToElement('.header')
    });
    link2.addEventListener('click', () => {
        scrollToElement('.header', 1)
    });
    link3.addEventListener('click', () => {
        scrollToElement('.column')
    });