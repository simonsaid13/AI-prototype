# Product catalog

Living note for the Azercell assistant. The offer files and the customer file exist. The cards, and the debug switch that picks a customer, are not built yet.

Source: [azercell.com](https://azercell.com), English, personal customers. Collected 9 October 2026. Prices are in manat and already include tax, as written on the site.

## The three files

The assistant must open only the file that matches the question. It must not guess a price, a minute count, an SMS code, or a country rate that is not in that file.

| Question is about | File |
| --- | --- |
| A monthly or daily plan (tariff) | `server/data/tariffs.json` |
| Extra internet you buy on top of a plan | `server/data/internet-packs.json` |
| Using the phone abroad, or a visitor pack inside Azerbaijan | `server/data/roaming.json` |

Each file starts with the same header: source, language, personal segment, collection date, and the tax note. Then `kind`, shared notes, and `families`. Each family is a group of offers. Each offer sits in `plans`.

## Easy mix-ups

- **Data+** and **Data (postpaid)** are tariffs. They live in the tariff file. They are not internet packs.
- **High-volume, Weekly, Daily, Unlimited** are extra internet packs. They live in the internet-pack file.
- **Travel packs** (30GB, 60GB, 120GB) are for foreign visitors using a line inside Azerbaijan. They are not for an Azercell customer who is abroad.
- **Roaming internet packs** (500MB, 2GB, 5GB, 10GB) are for an Azercell customer abroad.
- Full call, SMS, and internet prices exist only for **Turkey, Georgia, and Germany**. Other countries in the roaming file only list which local networks work. If a price is missing, the assistant says it does not have that price. It does not fill it in.

## What is in each file

### Tariffs — 7 groups, 27 plans

Shared notes: personal use only; how to change a prepaid or postpaid plan; postpaid bills run 5th–5th or 25th–25th.

| Group | Line | Plans |
| --- | --- | --- |
| Alfa Plan | Postpaid | 12GB, 25GB, 40GB, 60GB, 120GB |
| DigiMax | Prepaid | Daily, Weekly, 3GB, 5GB, 10GB, 25GB |
| Premium+ | Prepaid | 60GB, 100GB |
| Data+ | Prepaid | 3GB, 6GB, 12GB, 30GB, 60GB, 100GB, 200GB |
| Data (postpaid) | Postpaid | 1.5GB, 6GB, 12GB, 30GB, 55GB |
| Veteran | Prepaid | Veteran |
| Əsgərcell | Special soldier line | Əsgərcell |

A normal plan has a name, price, how long it lasts, internet, minutes, SMS, extra perks, and how to turn it on (SMS, short code, or the Azercell app). Some groups also have contract discounts, what you pay after the included amount runs out, and questions and answers.

Veteran and Əsgərcell are different. They are priced per minute, not as a monthly bundle. Əsgərcell includes a phone and a new number, lasts 18 months, and only works in set hours to five saved numbers.

### Internet packs — 4 groups, 10 packs

Shared notes: same packs for prepaid and postpaid; balance check; without a pack, 1 MB costs 0.05 manat.

| Group | Packs |
| --- | --- |
| High-volume | 3GB, 6GB, 12GB, 30GB, 56GB |
| Weekly | 2GB |
| Daily | 350MB, 1.5GB |
| Unlimited | 1 hour, 3 hours |

A pack has a price, how long it lasts (prepaid and postpaid can differ), how much internet, a rough “hours of use” guide, and how to turn it on or off. Each pack also has its own questions and answers.

### Roaming — 3 groups

Shared notes: how to turn roaming on, the small balance needed on prepaid, internet only on 4G, and customer-care numbers from abroad.

| Group | What it is |
| --- | --- |
| Roaming internet packs | 500MB, 2GB, 5GB, 10GB for customers abroad. Also a long list of countries and networks where roaming works, without prices. |
| Travel packs | 30GB, 60GB, 120GB for visitors inside Azerbaijan, plus what they pay after the included amount runs out. |
| Countries and prices | Turkey, Georgia, Germany only. Each local operator has call, SMS, and internet prices for prepaid and postpaid. |

## How the assistant should behave

Today the assistant answers in plain text only. It is told it cannot see the customer’s account, so it must not invent a balance, a date, or which plan the person is on. It does not open these files yet.

When this is built, the flow is:

1. Read the question and pick one file from the table above.
2. Find the matching group and plan inside that file.
3. Send that record to the chat screen. The screen draws the card. The assistant does not retype the price list as a paragraph.
4. Add one short line in the customer’s language: what the card is, or the one difference they asked about.
5. If nothing matches, say so. Do not offer a similar plan with made-up numbers.
6. Questions about “my plan” or “what I bought” use the selected person in `server/data/customers.json`. Prices and included amounts still come from the matching offer file. If no person is selected, do not invent an account.

## Customers

Debug mode will let us pick one person per test. The switch is not on screen yet. Until it is, the default person is Simon.

File: `server/data/customers.json`. Date of this snapshot: 9 October 2026.

Each person has an id, a scenario name, a short profile, the plan they are on, the plans they had before, and purchases from the past year. A purchase only stores the date, the kind, the group, and the name. The assistant looks up the price in the offer file. It does not keep a second copy of the price here.

| Scenario | Person | Use it to test |
| --- | --- | --- |
| happy_path | Simon Budanov | A long-time prepaid customer who sometimes buys extra internet |
| new_customer | Nigar Hasanova | Someone who joined recently and has almost no history |
| postpaid_traveler | Elvin Rasulov | A postpaid customer who bought roaming for a trip |

**Simon Budanov** is the happy path. He is 30 (born 12 March 1996), lives in Baku, and has been with Azercell for 7 years (since 9 October 2019). He has had three plans, all DigiMax: 3GB, then 5GB, and now DigiMax 10GB since 1 November 2025. In the past year he bought a 2GB roaming pack on 18 November 2025 for a trip to Turkey, a 6GB internet pack on 9 July 2026, and a 3GB internet pack on 3 October 2026.

The Turkey trip is a roaming pack because those packs are for leaving Azerbaijan. A trip into Azerbaijan would be a visitor pack, and that does not fit Simon.

**Nigar Hasanova** is 22 (born 20 January 2004), lives in Ganja, and joined on 1 August 2026. Her only plan is Data+ 3GB. Her only extra purchase is a 350MB daily pack on 14 September 2026.

**Elvin Rasulov** is 41 (born 4 July 1985), lives in Sumqayit, and has been a customer for 11 years (since 1 March 2015). His plans were Data 6GB, then Alfa Plan 12GB, and now Alfa Plan 25GB since 1 February 2024. On 12 August 2026 he bought a 5GB roaming pack for a trip to Georgia.

## Cards that do not exist yet

Chat has no product cards. The test screen does not show plans. These four cards still need to be designed and built. Each card is filled only from the record the assistant found.

**Tariff card** — group name, plan name, prepaid or postpaid, price and period, how long it lasts, internet, minutes, SMS, and the main way to turn it on. Contract discount and “after the bundle” rates only if that plan has them.

**Internet pack card** — group (daily, weekly, high-volume, or unlimited), name, price, how long it lasts, internet amount, and how to turn it on. Show the hours-of-use lines only when the file has them.

**Roaming pack card** — used for both roaming internet packs and travel packs. Name, price, how long it lasts, what is included, and how to turn it on. The label must say whether it is for going abroad or for a visitor inside Azerbaijan.

**Country price card** — country name, then each local operator with outgoing calls, calls home, incoming calls, internet, and SMS. Only for Turkey, Georgia, and Germany.

A list of several plans (for example “show Alfa plans”) is a row of the same card, not a new layout.

## Still to build

- Debug switch that picks one customer from `server/data/customers.json`.
- Assistant opens the matching offer file, and the selected customer when the question is about their own plan or purchases.
- The four cards above, filled from that record.
- Chat places the card under the assistant’s short reply.
