(function () {
    "use strict";
    // Works only when there are elements that should have counter
    if (!document.querySelector('.rj-charcounter')) {
           throw new Error('There are no elements that have "rj-charcounter" class');
           return;
    } else {
        const inputs = document.getElementsByClassName('rj-charcounter');

        // Function that highlights actual characters count
        function showCount(input) {
            const el = this || input;     // Get input ("this" when it works under event listener, inputs[i] when it works on start)
            const counter = el.nextElementSibling.children[0];
            counter.textContent = el.value.length;
        }

        for (let i = inputs.length; i--;) {
            // Handle lack of "maxlength" attribute or lack of value
            if (inputs[i].getAttribute('maxlength') === null) {
                throw new Error(`This input/textarea doesn't have required "maxlength" attribute: ${inputs[i].outerHTML}`);
                return;
            } else if (inputs[i].getAttribute('maxlength') === '') {
                throw new Error(`Please set "maxlength" attribute value to this input/textarea: ${inputs[i].outerHTML}`);
                return;
            }

            // Preparation of the counter element
            const charMax = inputs[i].getAttribute('maxlength');
            const counterElement = `<span class="rj-counter-box"><span class="rj-counter-element"></span>/${charMax} znaków</span>`;
            inputs[i].parentNode.innerHTML += counterElement;

            // Invoke function after page is loaded (to show initial value)
            showCount(inputs[i]);

            // Adding event listeners for keyup, paste and change events in counted input
            inputs[i].addEventListener('keyup', showCount);
            inputs[i].addEventListener('paste', showCount);
            inputs[i].addEventListener('change', showCount);
        }
    }
})();
