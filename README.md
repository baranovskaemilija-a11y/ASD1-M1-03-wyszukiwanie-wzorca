# Wyszukiwanie wzorca w tekście

Autor: Emilija Baranovska
Kod tematu: ASD1-M1-03
Przedmiot: Algorytmy i struktury danych I
Rok akademicki: 2026/2027

## Cel projektu

Laboratorium pokazuje wyszukiwanie wszystkich wystąpień wzorca
trzema metodami: naiwną, KMP i Rabina–Karpa.
Uwzględnia również nakładające się wystąpienia.

## Uruchomienie aplikacji

1. Umieść index.html, style.css i script.js w jednym folderze.
2. Otwórz index.html w przeglądarce, np. Google Chrome.
3. Aplikacja działa lokalnie, bez instalowania bibliotek,
   płatnych usług i kont użytkowników.

## Dane wejściowe

- Tekst: od 0 do 120 znaków.
- Wzorzec: od 1 do 20 znaków.
- Dozwolone są wielkie litery A–Z oraz spacje.
- Indeksy zaczynają się od 0.
- Spacje są istotne; program nie usuwa ich z wejścia.
- Nieprawidłowe dane są odrzucane.

## Obsługa

Przyciski „Szukaj” uruchamiają wybraną metodę do końca.

W sekcji pokazu wybierz metodę i używaj:
- Krok — wykonanie pojedynczego kroku;
- Start / Pauza — automatyczne odtwarzanie i zatrzymanie;
- Reset — rozpoczęcie pokazu od początku;
- wybór tempa — zmiana czasu między krokami.

Zmiana tekstu, wzorca lub metody resetuje pokaz.
Gotowe przykłady wypełniają pola wejściowe.
Przycisk „Porównaj trzy metody” pokazuje wyniki i liczniki
dla tych samych danych.

## Algorytmy

- Naiwna: sprawdza wzorzec na kolejnych pozycjach tekstu.
- KMP: buduje tablicę prefiksową π i wykorzystuje ją
  do zachowania informacji o wcześniejszym dopasowaniu.
- Rabin–Karp: stosuje przesuwany hasz z kodami ASCII,
  podstawą 31 i modułem 101. Wynik modulo jest normalizowany
  do zakresu 0–100. Równość haszy zawsze wymaga
  sprawdzenia rzeczywistych znaków.

Implementacje znajdują się w script.js.
Kroki pokazu powstają podczas wykonywania generatorów JavaScript.

## Uruchomienie testów

1. Otwórz index.html w przeglądarce.
2. Kliknij „Uruchom testy”.
3. Odczytaj liczbę zaliczonych sprawdzeń oraz szczegółowy raport.

Zestaw zawiera 74 sprawdzenia:
- 48 sprawdzeń wyników: 8 przypadków dla 3 metod
  oraz ich 3 wersji krokowych;
- 2 sprawdzenia stanów pośrednich;
- 24 sprawdzenia walidacji przez przyciski aplikacji.

Przypadki obejmują pusty tekst, dłuższy wzorzec,
dopasowanie całego tekstu, brak wyniku, nakładanie wystąpień,
powtórzenia, spacje oraz kolizję haszy.

Podczas sprawdzenia w Google Chrome uzyskano 74/74.
Po zmianach kodu należy ponownie uruchomić testy.

## Przykłady kontrolne

- ABABABA / ABA → [0, 2, 4]; π = [0, 0, 1].
- AAAAA / AAA → [0, 1, 2].
- ABCDEF / XYZ → [].
- DI / AA → []; oba hasze wynoszą 60.
- ALA MA KOTA / KOTA → [7].

## Liczniki i koszty

Porównania znaków, budowa π, aktualizacje hasza
i weryfikacja po zgodności haszy są rozróżnione w aplikacji.

Koszty algorytmów nie obejmują walidacji, interfejsu,
rysowania planszy ani kopiowania stanów animacji.
Program nie przechowuje historii klatek.

## Pliki projektu

- index.html — interfejs i opisy.
- style.css — wygląd aplikacji.
- script.js — algorytmy, pokaz, pytania, porównanie i testy.
- README.md — instrukcja projektu.

## Materiały do obrony — do przygotowania

- prezentacja.pptx — osobna prezentacja, 10 slajdów.
- dokumentacja.pdf — osobna dokumentacja, 10 stron.

Kolejność obrony: prezentacja → pokaz aplikacji → pytania.

## Wykorzystanie AI

Korzystano z ChatGPT przy przygotowywaniu fragmentów kodu,
wyjaśnianiu algorytmów i diagnozowaniu błędów.

Własny wkład: składanie projektu w VS Code, wprowadzanie zmian,
uruchamianie aplikacji, wykonywanie testów i sprawdzanie
wyników na przykładach.

Źródło wymagań: karta zadania ASD1-M1-03 przekazana przez prowadzącego.