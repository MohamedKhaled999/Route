const counters = document.querySelectorAll(".counter");
counters.forEach((counter) => {
  counter.innerHTML = "0";

  const uptadeCounter = () => {
    const target = counter.getAttribute("data-target");
    const c = +counter.innerText;
    const increment = target / 100;
    if (c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`;
      setTimeout(uptadeCounter, 1);
    } else {
      counter.innerText = target;
    }
  };

  uptadeCounter();
});
