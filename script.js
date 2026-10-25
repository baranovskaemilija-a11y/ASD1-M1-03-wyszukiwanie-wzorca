function szukajNaiwnie(tekst, wzorzec) {
    const pozycje = [];

    for (let i = 0; i <= tekst.length - wzorzec.length; i++) {
        let j = 0;

        while (
            j < wzorzec.length &&
            tekst[i + j] === wzorzec[j]
        ) {
            j++;
        }

        if (j === wzorzec.length) {
            pozycje.push(i);
        }
    }

    return pozycje;
}

const poleTekstu = document.getElementById("tekst");
const poleWzorca = document.getElementById("wzorzec");
const wynik = document.getElementById("wynik");

document.getElementById("szukaj").addEventListener("click", function () {
    const tekst = poleTekstu.value;
    const wzorzec = poleWzorca.value;

    if (
        tekst.length > 120 ||
        wzorzec.length < 1 ||
        wzorzec.length > 20 ||
        /[^A-Z ]/.test(tekst) ||
        /[^A-Z ]/.test(wzorzec)
    ) {
        wynik.textContent =
            "Błąd: używaj tylko A–Z i spacji. Tekst: do 120 znaków, wzorzec: 1–20.";
        return;
    }

    const pozycje = szukajNaiwnie(tekst, wzorzec);

    wynik.textContent =
        "Pozycje wystąpień (indeksy od 0): [" + pozycje.join(", ") + "]";
});

function wyczyscWynik() {
    wynik.textContent = "";
}

poleTekstu.addEventListener("input", wyczyscWynik);
poleWzorca.addEventListener("input", wyczyscWynik);

   function zbudujPi(wzorzec) {
    const pi = new Array(wzorzec.length).fill(0);
    let j = 0;

    for (let i = 1; i < wzorzec.length; i++) {
        while (j > 0 && wzorzec[i] !== wzorzec[j]) {
            j = pi[j - 1];
        }

        if (wzorzec[i] === wzorzec[j]) {
            j++;
        }

        pi[i] = j;
    }

    return pi;
}
function szukajKMP(tekst, wzorzec, pi) {
    const pozycje = [];
    let j = 0;

    for (let i = 0; i < tekst.length; i++) {
        while (j > 0 && tekst[i] !== wzorzec[j]) {
            j = pi[j - 1];
        }

        if (tekst[i] === wzorzec[j]) {
            j++;
        }

        if (j === wzorzec.length) {
            pozycje.push(i - wzorzec.length + 1);
            j = pi[j - 1];
        }
    }

    return pozycje;
}
const wynikKMP = document.getElementById("wynikKMP");

document.getElementById("szukajKMP").addEventListener("click", function () {
    const tekst = poleTekstu.value;
    const wzorzec = poleWzorca.value;

    if (
        tekst.length > 120 ||
        wzorzec.length < 1 ||
        wzorzec.length > 20 ||
        /[^A-Z ]/.test(tekst) ||
        /[^A-Z ]/.test(wzorzec)
    ) {
        wynikKMP.textContent =
            "Błąd: tylko A–Z i spacje. Tekst: do 120 znaków, wzorzec: 1–20.";
        return;
    }

    const pi = zbudujPi(wzorzec);
    const pozycje = szukajKMP(tekst, wzorzec, pi);

    wynikKMP.textContent =
        "KMP: [" + pozycje.join(", ") +
        "]. Tablica π: [" + pi.join(", ") + "]";
});

function wyczyscKMP() {
    wynikKMP.textContent = "";
}

poleTekstu.addEventListener("input", wyczyscKMP);
poleWzorca.addEventListener("input", wyczyscKMP);

function szukajRK(tekst, wzorzec) {
    const pozycje = [];
    const n = tekst.length;
    const m = wzorzec.length;
    const podstawa = 31;
    const modul = 101;

    if (m > n) {
        return pozycje;
    }

    function modulo(liczba) {
        return ((liczba % modul) + modul) % modul;
    }

    let potega = 1;
    let haszWzorca = 0;
    let haszOkna = 0;

    for (let i = 0; i < m - 1; i++) {
        potega = modulo(potega * podstawa);
    }

    for (let i = 0; i < m; i++) {
        haszWzorca = modulo(
            haszWzorca * podstawa + wzorzec.charCodeAt(i)
        );
        haszOkna = modulo(
            haszOkna * podstawa + tekst.charCodeAt(i)
        );
    }

    for (let i = 0; i <= n - m; i++) {
        if (haszOkna === haszWzorca) {
            let j = 0;

            while (j < m && tekst[i + j] === wzorzec[j]) {
                j++;
            }

            if (j === m) {
                pozycje.push(i);
            }
        }

        if (i < n - m) {
            haszOkna = modulo(
                (haszOkna - tekst.charCodeAt(i) * potega) *
                podstawa + tekst.charCodeAt(i + m)
            );
        }
    }

    return pozycje;
}

const wynikRK = document.getElementById("wynikRK");

document.getElementById("szukajRK").addEventListener("click", function () {
    const tekst = poleTekstu.value;
    const wzorzec = poleWzorca.value;

    if (
        tekst.length > 120 ||
        wzorzec.length < 1 ||
        wzorzec.length > 20 ||
        /[^A-Z ]/.test(tekst) ||
        /[^A-Z ]/.test(wzorzec)
    ) {
        wynikRK.textContent =
            "Błąd: tylko A–Z i spacje. Tekst: do 120 znaków, wzorzec: 1–20.";
        return;
    }

    const pozycje = szukajRK(tekst, wzorzec);

    wynikRK.textContent =
        "Rabin–Karp: [" + pozycje.join(", ") + "]";
});

function wyczyscRK() {
    wynikRK.textContent = "";
}

poleTekstu.addEventListener("input", wyczyscRK);
poleWzorca.addEventListener("input", wyczyscRK);

function ustawPrzyklad(tekst, wzorzec) {
    poleTekstu.value = tekst;
    poleWzorca.value = wzorzec;

    poleTekstu.dispatchEvent(new Event("input"));
    poleWzorca.dispatchEvent(new Event("input"));
}

document.getElementById("przyklad1").addEventListener("click", function () {
    ustawPrzyklad("ABABABA", "ABA");
});

document.getElementById("przyklad2").addEventListener("click", function () {
    ustawPrzyklad("AAAAA", "AAA");
});

document.getElementById("przyklad3").addEventListener("click", function () {
    ustawPrzyklad("ABCDEF", "XYZ");
});

document.getElementById("przyklad4").addEventListener("click", function () {
    ustawPrzyklad("DI", "AA");
});

function* krokiNaiwne(tekst, wzorzec) {
    const pozycje = [];
    let porownania = 0;

    for (let i = 0; i <= tekst.length - wzorzec.length; i++) {
        let j = 0;

        while (j < wzorzec.length) {
            const zgodne = tekst[i + j] === wzorzec[j];
            porownania++;

            yield {
                i,
                j,
                pozycje: [...pozycje],
                porownania,
                opis: "Porównuję tekst[" + (i + j) +
                    "] ze wzorcem[" + j + "]: " +
                    (zgodne ? "znaki zgodne." : "znaki różne.")
            };

            if (!zgodne) {
                break;
            }

            j++;
        }

        if (j === wzorzec.length) {
            pozycje.push(i);

            yield {
                i,
                j,
                pozycje: [...pozycje],
                porownania,
                opis: "Znaleziono wystąpienie na pozycji " + i + "."
            };
        }
    }

    return {
        pozycje,
        porownania,
        opis: "Wyszukiwanie zakończone."
    };
}
const wyborMetody = document.getElementById("metoda");
const wizualizacja = document.getElementById("wizualizacja");
const opisKroku = document.getElementById("opisKroku");

let przebieg = null;
let zakonczony = false;

function resetPokazu() {
    document.getElementById("plansza").replaceChildren();
    przebieg = null;
    zakonczony = false;
    wizualizacja.textContent = "";
    opisKroku.textContent = "Wybierz metodę i kliknij Krok.";
}

function wykonajKrok() {
    if (zakonczony) {
        return;
    }

    const tekst = poleTekstu.value;
    const wzorzec = poleWzorca.value;

    if (
        tekst.length > 120 ||
        wzorzec.length < 1 ||
        wzorzec.length > 20 ||
        /[^A-Z ]/.test(tekst) ||
        /[^A-Z ]/.test(wzorzec)
    ) {
        opisKroku.textContent = "Wprowadź poprawne dane: A–Z i spacje.";
        return;
    }
    

       if (przebieg === null) {
        if (wyborMetody.value === "kmp") {
            przebieg = krokiKMP(tekst, wzorzec);
        } else if (wyborMetody.value === "rk") {
            przebieg = krokiRK(tekst, wzorzec);
        } else {
            przebieg = krokiNaiwne(tekst, wzorzec);
        }
    }
    

    const krok = przebieg.next();
    const stan = krok.value;

rysujPlansze(tekst, wzorzec, stan, krok.done);
pokazPseudokod(stan, krok.done);
przygotujPytanie(stan, krok.done);

    wizualizacja.textContent =
        "Tekst: " + tekst + "\n" +
        "Wzorzec: " + wzorzec + "\n" +
        "Porównania znaków: " + stan.porownania + "\n" +
        "Znalezione pozycje: [" + stan.pozycje.join(", ") + "]";

    if (!krok.done) {
        wizualizacja.textContent +=
            "\nPozycja wzorca i = " + stan.i +
            "\nIndeks we wzorcu j = " + stan.j;
    }

        if (stan.pi !== undefined) {
        wizualizacja.textContent +=
            "\nFaza: " + stan.faza +
            "\nTablica π: [" + stan.pi.join(", ") + "]" +
            "\nPorównania przy budowie π: " + stan.porownaniaPi;
    }
        if (stan.haszOkna !== undefined) {
        wizualizacja.textContent +=
            "\nHasz wzorca: " + stan.haszWzorca +
            "\nHasz okna: " + stan.haszOkna +
            "\nAktualizacje hasza: " + stan.aktualizacjeHasza +
            "\nZgodności haszy: " + stan.zgodnosciHaszy;
    }

    opisKroku.textContent = stan.opis;
    zakonczony = krok.done;
}

document.getElementById("krok").addEventListener("click", wykonajKrok);
document.getElementById("reset").addEventListener("click", resetPokazu);

poleTekstu.addEventListener("input", resetPokazu);
poleWzorca.addEventListener("input", resetPokazu);
wyborMetody.addEventListener("change", resetPokazu);

const przyciskStart = document.getElementById("startPauza");
const wyborTempa = document.getElementById("tempo");

let zegar = null;
let odtwarzanie = false;

function zatrzymajPokaz() {
    clearTimeout(zegar);
    zegar = null;
    odtwarzanie = false;
    przyciskStart.textContent = "Start";
}

function odtworzKrok() {
    wykonajKrok();

    if (zakonczony || przebieg === null) {
        zatrzymajPokaz();
        return;
    }

    zegar = setTimeout(odtworzKrok, Number(wyborTempa.value));
}

przyciskStart.addEventListener("click", function () {
    if (odtwarzanie) {
        zatrzymajPokaz();
        return;
    }

    if (zakonczony) {
        resetPokazu();
    }

    odtwarzanie = true;
    przyciskStart.textContent = "Pauza";
    odtworzKrok();
});

document.getElementById("reset")
    .addEventListener("click", zatrzymajPokaz);

document.getElementById("krok")
    .addEventListener("click", zatrzymajPokaz);

poleTekstu.addEventListener("input", zatrzymajPokaz);
poleWzorca.addEventListener("input", zatrzymajPokaz);
wyborMetody.addEventListener("change", zatrzymajPokaz);

function* krokiPi(wzorzec) {
    const pi = new Array(wzorzec.length).fill(0);
    let j = 0;
    let porownaniaPi = 0;

    for (let i = 1; i < wzorzec.length; i++) {
        while (true) {
            const zgodne = wzorzec[i] === wzorzec[j];
            porownaniaPi++;

            yield {
                faza: "Budowa π",
                i,
                j,
                pi: [...pi],
                pozycje: [],
                porownania: 0,
                porownaniaPi,
                opis: "Budowa π: porównuję wzorzec[" + i +
                    "] i wzorzec[" + j + "]. " +
                    (zgodne ? "Znaki zgodne." : "Znaki różne.")
            };

            if (zgodne) {
                j++;
                break;
            }

            if (j === 0) {
                break;
            }

            const poprzednieJ = j;
            j = pi[j - 1];

            yield {
                faza: "Budowa π",
                i,
                j,
                pi: [...pi],
                pozycje: [],
                porownania: 0,
                porownaniaPi,
                opis: "Korzystam z π[" + (poprzednieJ - 1) +
                    "] = " + j + ". Sprawdzę krótszy prefiks."
            };
        }

        pi[i] = j;

        yield {
            faza: "Budowa π",
            i,
            j,
            pi: [...pi],
            pozycje: [],
            porownania: 0,
            porownaniaPi,
            opis: "Zapisuję π[" + i + "] = " + j + "."
        };
    }

    return { pi, porownaniaPi };
}


    function* krokiKMP(tekst, wzorzec) {
    const { pi, porownaniaPi } = yield* krokiPi(wzorzec);
    const pozycje = [];
    let porownania = 0;
    let i = 0;
    let j = 0;

    function stan(opis) {
        return {
            faza: "Wyszukiwanie KMP",
            i,
            j,
            pi: [...pi],
            pozycje: [...pozycje],
            porownania,
            porownaniaPi,
            opis
        };
    }

    yield stan("Tablica π gotowa. Zaczynam wyszukiwanie.");

    while (i < tekst.length) {
        const zgodne = tekst[i] === wzorzec[j];
        porownania++;

        yield stan(
            "Porównuję tekst[" + i + "] i wzorzec[" + j + "]: " +
            (zgodne ? "znaki zgodne." : "znaki różne.")
        );

        if (zgodne) {
            i++;
            j++;

            if (j === wzorzec.length) {
                const pozycja = i - wzorzec.length;
                pozycje.push(pozycja);

                yield stan(
                    "Znaleziono wystąpienie na pozycji " + pozycja + "."
                );

                j = pi[j - 1];

                yield stan(
                    "Po dopasowaniu korzystam z π: zachowuję " +
                    j + " znaków. To pozwala znaleźć nakładające się wyniki."
                );
            }
        } else if (j > 0) {
            const stareJ = j;
            j = pi[j - 1];

            yield stan(
                "Korzystam z π[" + (stareJ - 1) + "] = " + j +
                ". Indeks tekstu i pozostaje bez zmian."
            );
        } else {
            i++;

            yield stan(
                "Nie ma dopasowanego prefiksu. Przechodzę do kolejnego znaku tekstu."
            );
        }
    }

    return stan("Wyszukiwanie zakończone.");
}

function* krokiRK(tekst, wzorzec) {
    const pozycje = [];
    const m = wzorzec.length;
    const modulo = liczba => ((liczba % 101) + 101) % 101;

    let i = 0;
    let j = 0;
    let potega = 1;
    let haszWzorca = 0;
    let haszOkna = 0;
    let porownania = 0;
    let aktualizacjeHasza = 0;
    let zgodnosciHaszy = 0;

    function stan(opis) {
        return {
            faza: "Rabin–Karp",
            i,
            j,
            pozycje: [...pozycje],
            porownania,
            haszWzorca,
            haszOkna,
            aktualizacjeHasza,
            zgodnosciHaszy,
            opis
        };
    }

    if (m > tekst.length) {
        return stan("Wzorzec jest dłuższy od tekstu. Brak wystąpień.");
    }

    for (let k = 0; k < m - 1; k++) {
        potega = modulo(potega * 31);
    }

    for (let k = 0; k < m; k++) {
        haszWzorca = modulo(
            haszWzorca * 31 + wzorzec.charCodeAt(k)
        );
        haszOkna = modulo(
            haszOkna * 31 + tekst.charCodeAt(k)
        );

        yield stan("Obliczam początkowe hasze: dodaję znak o indeksie " + k + ".");
    }

    for (i = 0; i <= tekst.length - m; i++) {
        j = 0;

        yield stan("Porównuję hasz okna z haszem wzorca.");

        if (haszOkna === haszWzorca) {
            zgodnosciHaszy++;

            yield stan("Hasze są równe. Muszę sprawdzić rzeczywiste znaki.");

            while (j < m) {
                const zgodne = tekst[i + j] === wzorzec[j];
                porownania++;

                yield stan(
                    "Sprawdzam tekst[" + (i + j) +
                    "] i wzorzec[" + j + "]: " +
                    (zgodne ? "znaki zgodne." : "kolizja haszy — znaki różne.")
                );

                if (!zgodne) {
                    break;
                }

                j++;
            }

            if (j === m) {
                pozycje.push(i);

                yield stan("Potwierdzono wystąpienie na pozycji " + i + ".");
            }
        } else {
            yield stan("Hasze są różne. To okno nie pasuje.");
        }

        if (i < tekst.length - m) {
            const staryHasz = haszOkna;
            const usuwany = tekst.charCodeAt(i);
            const dodawany = tekst.charCodeAt(i + m);

            haszOkna = modulo(
                (staryHasz - usuwany * potega) * 31 + dodawany
            );
            aktualizacjeHasza++;

            yield stan(
                "Obliczam hasz następnego okna: ((" +
                staryHasz + " − " + usuwany + " × " +
                potega + ") × 31 + " + dodawany +
                ") modulo 101 = " + haszOkna + "."
            );
        }
    }

    return stan("Wyszukiwanie zakończone.");
}

function zakonczGenerator(generator) {
    let krok = generator.next();

    while (!krok.done) {
        krok = generator.next();
    }

    return krok.value;
}

const wynikPorownania = document.getElementById("wynikPorownania");

document.getElementById("porownaj").addEventListener("click", function () {
    const tekst = poleTekstu.value;
    const wzorzec = poleWzorca.value;

    if (
        tekst.length > 120 ||
        wzorzec.length < 1 ||
        wzorzec.length > 20 ||
        /[^A-Z ]/.test(tekst) ||
        /[^A-Z ]/.test(wzorzec)
    ) {
        wynikPorownania.textContent =
            "Błąd: używaj A–Z i spacji. Tekst: do 120 znaków, wzorzec: 1–20.";
        return;
    }

    const naiwna = zakonczGenerator(krokiNaiwne(tekst, wzorzec));
    const kmp = zakonczGenerator(krokiKMP(tekst, wzorzec));
    const rk = zakonczGenerator(krokiRK(tekst, wzorzec));

    const lista = stan => "[" + stan.pozycje.join(", ") + "]";

    const zgodne =
        lista(naiwna) === lista(kmp) &&
        lista(kmp) === lista(rk);

    wynikPorownania.textContent =
        "Długość tekstu n = " + tekst.length +
        ", długość wzorca m = " + wzorzec.length +
        "\n\nNAIWNA" +
        "\nPozycje: " + lista(naiwna) +
        "\nPorównania znaków: " + naiwna.porownania +
        "\n\nKMP" +
        "\nPozycje: " + lista(kmp) +
        "\nPorównania podczas wyszukiwania: " + kmp.porownania +
        "\nPorównania przy budowie π: " + kmp.porownaniaPi +
        "\n\nRABIN–KARP" +
        "\nPozycje: " + lista(rk) +
        "\nPorównania znaków po zgodności haszy: " + rk.porownania +
        "\nZgodności haszy: " + rk.zgodnosciHaszy +
        "\nAktualizacje hasza okna: " + rk.aktualizacjeHasza +
        "\n\nIdentyczne listy wyników: " + (zgodne ? "TAK" : "NIE");
});

poleTekstu.addEventListener("input", function () {
    wynikPorownania.textContent = "";
});

poleWzorca.addEventListener("input", function () {
    wynikPorownania.textContent = "";
});

document.getElementById("uruchomTesty").addEventListener("click", function () {
    zatrzymajPokaz();

    const raport = [];
    let zaliczone = 0;
    let wszystkie = 0;

    function test(nazwa, wejscie, oczekiwane, oblicz) {
        wszystkie++;

        try {
            const wynik = oblicz();
            const poprawny =
                JSON.stringify(wynik) === JSON.stringify(oczekiwane);

            if (poprawny) zaliczone++;

            raport.push(
                (poprawny ? "OK" : "BŁĄD") + " — " + nazwa +
                "\nWejście: " + wejscie +
                "\nOczekiwano: " + JSON.stringify(oczekiwane) +
                "\nOtrzymano: " + JSON.stringify(wynik)
            );
        } catch (blad) {
            raport.push(
                "BŁĄD — " + nazwa +
                "\nWejście: " + wejscie +
                "\nOczekiwano: " + JSON.stringify(oczekiwane) +
                "\nWyjątek: " + blad.message
            );
        }
    }

    const przypadki = [
        ["Pusty tekst", "", "A", []],
        ["Wzorzec dłuższy od tekstu", "AB", "ABC", []],
        ["Cały tekst", "ABC", "ABC", [0]],
        ["Brak dopasowania", "ABCDEF", "XYZ", []],
        ["Nakładanie ABA", "ABABABA", "ABA", [0, 2, 4]],
        ["Powtarzające się A", "AAAAA", "AAA", [0, 1, 2]],
        ["Kolizja haszy", "DI", "AA", []],
        ["Spacje", "A A A", "A A", [0, 2]]
    ];

    const metody = [
        ["Naiwna", (t, w) => szukajNaiwnie(t, w)],
        ["KMP", (t, w) => szukajKMP(t, w, zbudujPi(w))],
        ["Rabin–Karp", (t, w) => szukajRK(t, w)],
        ["Kroki naiwne", (t, w) =>
            zakonczGenerator(krokiNaiwne(t, w)).pozycje],
        ["Kroki KMP", (t, w) =>
            zakonczGenerator(krokiKMP(t, w)).pozycje],
        ["Kroki Rabina–Karpa", (t, w) =>
            zakonczGenerator(krokiRK(t, w)).pozycje]
    ];

    for (const [nazwa, tekst, wzorzec, oczekiwane] of przypadki) {
        for (const [metoda, oblicz] of metody) {
            test(
                nazwa + " / " + metoda,
                JSON.stringify([tekst, wzorzec]),
                oczekiwane,
                () => oblicz(tekst, wzorzec)
            );
        }
    }

    test(
        "Stan pośredni budowy π",
        'wzorzec "ABA", po zapisaniu π[2]',
        [0, 0, 1],
        function () {
            for (const stan of krokiPi("ABA")) {
                if (stan.i === 2 && stan.pi[2] === 1) {
                    return stan.pi;
                }
            }
            return null;
        }
    );

    test(
        "Stan pośredni kolizji",
        'tekst "DI", wzorzec "AA", po porównaniu D z A',
        {
            haszWzorca: 60,
            haszOkna: 60,
            porownania: 1,
            pozycje: []
        },
        function () {
            for (const stan of krokiRK("DI", "AA")) {
                if (stan.porownania === 1) {
                    return {
                        haszWzorca: stan.haszWzorca,
                        haszOkna: stan.haszOkna,
                        porownania: stan.porownania,
                        pozycje: stan.pozycje
                    };
                }
            }
            return null;
        }
    );

    const stareDane = [poleTekstu.value, poleWzorca.value];

    const przyciski = [
        ["szukaj", "wynik"],
        ["szukajKMP", "wynikKMP"],
        ["szukajRK", "wynikRK"],
        ["porownaj", "wynikPorownania"]
    ];

    const stareWyniki = przyciski.map(
        ([, id]) => document.getElementById(id).textContent
    );

    const bledneDane = [
        ["Pusty wzorzec", "ABC", ""],
        ["Mała litera", "AbC", "A"],
        ["Cyfra we wzorcu", "ABC", "A1"],
        ["Niedozwolona litera", "ĄBC", "A"],
        ["Za długi tekst", "A".repeat(121), "A"],
        ["Za długi wzorzec", "ABC", "A".repeat(21)]
    ];

    try {
        for (const [nazwa, tekst, wzorzec] of bledneDane) {
            for (const [przycisk, poleWyniku] of przyciski) {
                test(
                    "Walidacja: " + nazwa + " / " + przycisk,
                    JSON.stringify([tekst, wzorzec]),
                    true,
                    function () {
                        poleTekstu.value = tekst;
                        poleWzorca.value = wzorzec;

                        const pole = document.getElementById(poleWyniku);
                        pole.textContent = "";
                        document.getElementById(przycisk).click();

                        return /błąd/i.test(pole.textContent);
                    }
                );
            }
        }
    } finally {
        poleTekstu.value = stareDane[0];
        poleWzorca.value = stareDane[1];

        przyciski.forEach(function ([, id], indeks) {
            document.getElementById(id).textContent = stareWyniki[indeks];
        });
    }

    document.getElementById("wynikiTestow").textContent =
        "Zaliczone: " + zaliczone + " / " + wszystkie +
        "\n\n" + raport.join("\n\n");
});

function rysujPlansze(tekst, wzorzec, stan, koniec) {
    const plansza = document.getElementById("plansza");
    plansza.replaceChildren();

    const budowaPi = stan.faza === "Budowa π";
    const porownanie = !koniec &&
        /^(Porównuję tekst\[|Sprawdzam tekst\[|Budowa π: porównuję)/.test(stan.opis);

    function dodajRzad(nazwa, napis, aktywne, przesuniecie, wyniki) {
        const podpis = document.createElement("p");
        podpis.textContent = nazwa;
        plansza.appendChild(podpis);

        const rzad = document.createElement("div");
        rzad.className = "rzad-znakow";
        rzad.style.marginLeft = (przesuniecie * 48) + "px";

        if (napis.length === 0) {
            rzad.textContent = "(pusty tekst)";
        }

        for (let indeks = 0; indeks < napis.length; indeks++) {
            const komorka = document.createElement("div");
            komorka.className = "komorka";

            if (aktywne.includes(indeks)) {
                komorka.classList.add("aktywna");
            }

            const znaleziony = wyniki.includes(indeks);

            if (znaleziony) {
                komorka.classList.add("znaleziony-start");
            }

            const numer = document.createElement("small");
            numer.textContent = indeks + (znaleziony ? " ✓" : "");

            const znak = document.createElement("strong");
            znak.textContent = napis[indeks] === " " ? "␣" : napis[indeks];

            komorka.append(numer, znak);
            rzad.appendChild(komorka);
        }

        plansza.appendChild(rzad);
    }

    if (budowaPi) {
        dodajRzad(
            "Budowa π — porównywane pozycje i oraz j:",
            wzorzec,
            porownanie ? [stan.i, stan.j] : [],
            0,
            []
        );
    } else {
        const kmp = wyborMetody.value === "kmp";
        let przesuniecie = kmp ? stan.i - stan.j : stan.i;

        if (stan.opis.startsWith("Obliczam hasz następnego okna")) {
            przesuniecie++;
        }

        przesuniecie = Math.max(
            0,
            Math.min(przesuniecie, Math.max(0, tekst.length - wzorzec.length))
        );

        const indeksTekstu = kmp ? stan.i : stan.i + stan.j;

        dodajRzad(
            "Tekst — indeksy od 0:",
            tekst,
            porownanie ? [indeksTekstu] : [],
            0,
            stan.pozycje
        );

        dodajRzad(
            "Wzorzec — przesunięcie: " + przesuniecie,
            wzorzec,
            porownanie ? [stan.j] : [],
            przesuniecie,
            []
        );
    }

    const legenda = document.createElement("p");
    legenda.textContent =
        "▼ — porównywany znak; ✓ i podwójna dolna ramka — początek znalezionego wystąpienia; ␣ — spacja.";
    plansza.appendChild(legenda);
}

function pokazPseudokod(stan, koniec) {
    const pole = document.getElementById("pseudokod");
    const opis = stan.opis;
    let wiersze;
    let aktywny = 0;

    if (stan.faza === "Budowa π") {
        wiersze = [
            "Porównaj wzorzec[i] ze wzorcem[j].",
            "Przy niezgodności: j = π[j − 1]; sprawdź krótszy prefiks.",
            "Zapisz π[i] = długość pasującego prefiksu."
        ];

        if (opis.startsWith("Korzystam")) aktywny = 1;
        if (opis.startsWith("Zapisuję")) aktywny = 2;
    } else if (wyborMetody.value === "kmp") {
        wiersze = [
            "Zbuduj π; ustaw i = 0, j = 0.",
            "Porównaj tekst[i] ze wzorcem[j].",
            "Przy zgodności zwiększ i oraz j; po pełnym dopasowaniu zapisz i − m.",
            "Po dopasowaniu ustaw j = π[j − 1], aby zachować nakładanie.",
            "Przy niezgodności i j > 0 ustaw j = π[j − 1]; nie zmieniaj i.",
            "Przy niezgodności i j = 0 zwiększ i.",
            "Zwróć wszystkie znalezione pozycje."
        ];

        if (opis.startsWith("Porównuję")) aktywny = 1;
        if (opis.startsWith("Znaleziono")) aktywny = 2;
        if (opis.startsWith("Po dopasowaniu")) aktywny = 3;
        if (opis.startsWith("Korzystam")) aktywny = 4;
        if (opis.startsWith("Nie ma")) aktywny = 5;
        if (koniec) aktywny = 6;
    } else if (wyborMetody.value === "rk") {
        wiersze = [
            "Jeśli m > n, zwróć pustą listę.",
            "Oblicz hasz wzorca i pierwszego okna: h = (h × 31 + ASCII) mod 101.",
            "Porównaj hasz okna z haszem wzorca.",
            "Jeśli hasze są równe, rozpocznij weryfikację znaków.",
            "Porównuj znaki; niezgodność odrzuca okno mimo równości haszy.",
            "Po zgodności wszystkich m znaków zapisz pozycję okna.",
            "Przy różnych haszach pomiń weryfikację znaków.",
            "Przesuń hasz: ((h − ASCII(stary) × 31^(m−1)) × 31 + ASCII(nowy)) mod 101.",
            "Zwróć wszystkie potwierdzone pozycje."
        ];

        aktywny = 1;
        if (opis.startsWith("Porównuję hasz")) aktywny = 2;
        if (opis.startsWith("Hasze są równe")) aktywny = 3;
        if (opis.startsWith("Sprawdzam tekst")) aktywny = 4;
        if (opis.startsWith("Potwierdzono")) aktywny = 5;
        if (opis.startsWith("Hasze są różne")) aktywny = 6;
        if (opis.startsWith("Obliczam hasz następnego")) aktywny = 7;
        if (koniec) aktywny = opis.startsWith("Wzorzec jest dłuższy") ? 0 : 8;
    } else {
        wiersze = [
            "Dla każdego przesunięcia i od 0 do n − m ustaw j = 0.",
            "Porównuj tekst[i + j] ze wzorcem[j]; przy zgodności zwiększ j.",
            "Przy niezgodności zakończ sprawdzanie tego przesunięcia.",
            "Jeśli dopasowano m znaków, zapisz pozycję i.",
            "Przesuń wzorzec o 1 i powtórz sprawdzanie.",
            "Zwróć wszystkie znalezione pozycje."
        ];

        aktywny = 1;
        if (opis.includes("znaki różne")) aktywny = 2;
        if (opis.startsWith("Znaleziono")) aktywny = 3;
        if (koniec) aktywny = 5;
    }

    pole.replaceChildren();

    wiersze.forEach(function (tekst, indeks) {
        const wiersz = document.createElement("div");
        const biezacy = indeks === aktywny;

        wiersz.className =
            "wiersz-kodu" + (biezacy ? " biezacy" : "");

        wiersz.textContent =
            (biezacy ? "▶ " : "  ") + (indeks + 1) + ". " + tekst;

        pole.appendChild(wiersz);
    });
}

let aktualnaOdpowiedz = "";

function przygotujPytanie(stan, koniec) {
    const pytanie = document.getElementById("pytanieStanu");
    const odpowiedz = document.getElementById("odpowiedzStanu");
    odpowiedz.textContent = "";

    if (koniec) {
        pytanie.textContent =
            "Jakie pozycje znalazła metoda w zakończonym przebiegu?";

        aktualnaOdpowiedz =
            "[" + stan.pozycje.join(", ") + "]. " +
            "Lista zawiera początki wystąpień, liczone od 0.";
    } else if (stan.faza === "Budowa π") {
        const indeks = Math.max(0, stan.i - 1);

        pytanie.textContent =
            "Ile wynosi już obliczona wartość π[" + indeks + "]?";

        aktualnaOdpowiedz =
            "π[" + indeks + "] = " + stan.pi[indeks] + ". " +
            "To długość najdłuższego właściwego prefiksu, " +
            "który jest też sufiksem fragmentu wzorca od 0 do " + indeks + ".";
    } else if (
        wyborMetody.value === "kmp" &&
        stan.j > 0
    ) {
        const indeks = stan.j - 1;

        pytanie.textContent =
            "Aktualnie j = " + stan.j +
            ". Jaką wartość przyjmie j po wykonaniu j = π[j − 1]?";

        aktualnaOdpowiedz =
            "j = π[" + indeks + "] = " + stan.pi[indeks] + ". " +
            "KMP zachowa informację o krótszym pasującym prefiksie.";
    } else if (wyborMetody.value === "rk") {
        pytanie.textContent =
            "Aktualny hasz wzorca to " + stan.haszWzorca +
            ", a hasz okna to " + stan.haszOkna +
            ". Czy same te wartości dowodzą dopasowania?";

        aktualnaOdpowiedz =
            stan.haszWzorca === stan.haszOkna
                ? "Nie. Hasze są równe, ale dopasowanie wymaga " +
                  "zgodności wszystkich znaków. Możliwa jest kolizja."
                : "Nie. Hasze są różne. Jeśli ich obliczanie jest już " +
                  "zakończone, bieżące okno nie pasuje do wzorca.";
    } else if (wyborMetody.value === "naiwna") {
        const nastepne = stan.i + 1;
        const ostatnie = poleTekstu.value.length - poleWzorca.value.length;

        pytanie.textContent =
            "Obecne przesunięcie to " + stan.i +
            ". Jakie przesunięcie sprawdzimy po zakończeniu tego okna?";

        aktualnaOdpowiedz =
            nastepne <= ostatnie
                ? "Przesunięcie " + nastepne +
                  ". Metoda naiwna przesuwa wzorzec o jedną pozycję."
                : "Nie ma następnego pełnego okna. " +
                  "Po sprawdzeniu obecnego okna wyszukiwanie się zakończy.";
    } else {
        pytanie.textContent =
            "W KMP j = 0. Co zrobić, jeśli porównywane znaki będą różne?";

        aktualnaOdpowiedz =
            "Zwiększyć indeks tekstu i o 1. " +
            "Nie ma dopasowanego prefiksu do zachowania.";
    }
}

document.getElementById("pokazOdpowiedz")
    .addEventListener("click", function () {
        document.getElementById("odpowiedzStanu").textContent =
            aktualnaOdpowiedz || "Najpierw wykonaj krok pokazu.";
    });

function wyczyscPytanie() {
    aktualnaOdpowiedz = "";
    document.getElementById("pytanieStanu").textContent =
        "Wykonaj krok, aby zobaczyć pytanie o aktualny stan.";
    document.getElementById("odpowiedzStanu").textContent = "";
    document.getElementById("pseudokod").replaceChildren();
}

document.getElementById("reset")
    .addEventListener("click", wyczyscPytanie);

poleTekstu.addEventListener("input", wyczyscPytanie);
poleWzorca.addEventListener("input", wyczyscPytanie);
wyborMetody.addEventListener("change", wyczyscPytanie);

document.getElementById("przyklad5").addEventListener("click", function () {
    ustawPrzyklad("ALA MA KOTA", "KOTA");
});