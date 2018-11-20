function vyresVyraz() {

  var vyraz = document.getElementById("vyraz").value;
  var cislo = 0,
    zaklad = 1,
  mocnina = 0;
  var delic = [];
  for (var i = 0; i < vyraz.length; i++) {
    if ("1234567890".includes(vyraz.charAt(i))) {
      if (mocnina === 0) {
        cislo *= 10;
      }
      cislo += parseInt(vyraz.charAt(i)) * Math.pow(10, mocnina);
    } else if (".,".includes(vyraz.charAt(i))) {
      mocnina--;
    } else if ("+-*/".includes(vyraz.charAt(i))) {
      if (i === 0 && vyraz.charAt(i) === "-") {
        zaklad = -1;
      } else {
        mocnina = 0;
        delic.push(cislo * zaklad);
        zaklad = 1;
        cislo = 0;
        delic.push(vyraz.charAt(i));
      }
    }
  }
  if (delic.length == 0) {
    delic.push(cislo * zaklad);
  } else {
    delic.push(cislo);
  }

  for (var i = 0; i < delic.length; i++) {
    if ("*/".includes(delic[i])) {
      var num = vypocet[delic[i]](delic[i - 1], delic[i + 1]);
      delic.splice(i - 1, 3, num);
      i--;
    }
  }

  for (var i = 0; i < delic.length; i++) {
    if ("+-".includes(delic[i])) {
      var num = vypocet[delic[i]](delic[i - 1], delic[i + 1]);
      delic.splice(i - 1, 3, num);
      i--;
    }
  }

  document.getElementById("vysledek").innerHTML = "Se rovna: " + delic[0];
}


var input = document.getElementById("vyraz");
input.addEventListener("stisk", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    vyresVyraz();
}
  const vypocet = {
  "/": (x, y) => x / y,
  "*": (x, y) => x * y,
  "-": (x, y) => x - y,
  "+": (x, y) => x + y
};
});

