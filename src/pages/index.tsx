import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

const Home: NextPage = () => {
  const [priceEur, setInputValue] = useState<number | null>(0);
  const [givenEur, setGivenEur] = useState<number | null>(0);
  const [givenKn, setGivenKn] = useState<number | null>(0);

  const calcRest = api.calculateRest.calculateRest.useQuery({
    priceEur: priceEur ?? 0,
    givenEur: givenEur ?? 0,
    givenKn: givenKn ?? 0,
  });

  return (
      <>
        <Head>
          <title>Izračun kn/€ ostatka</title>
          <meta
              name="description"
              content="Aplikacija koja računa ostatak gotovine koju prodavač treba vratiti u eurima"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold text-center tracking-tight text-slate-200 sm:text-[5rem]">
              Povrat <span className="text-slate-400">€</span> nakon plaćanja u{" "}
              <span className="text-slate-400">kn</span>
            </h1>
            <div className="flex justify-center ">
              <div className="xl:w-50">
              <span className="p-float-label">
              <InputNumber
                  className="p-inputtext-lg"
                  id="priceEur"
                  value={priceEur}
                  onValueChange={(e) => setInputValue(e.value)}
                  mode="decimal"
                  locale="de-DE"
                  minFractionDigits={2}
              />
              <label
                  htmlFor="priceEur"
              >
                Unesite iznos artikla u €
              </label></span>
              </div>
            </div>
            <div className="flex justify-center">
            <span className="p-float-label">

              <InputNumber
                  className="p-inputtext-lg"
                  id="givenEur"
                  value={givenEur}
                  onValueChange={(e) => setGivenEur(e.value)}
                  mode="decimal"
                  locale="de-DE"
                  minFractionDigits={2}
              /><label
                htmlFor="givenEur"
            >
                Iznos kojeg je kupac dao u €
              </label></span>
            </div>
            <div className="flex justify-center">
              <div className="xl:w-50 mb-3">
              <span className="p-float-label">
              <InputNumber
                  className="p-inputtext-lg"
                  id="givenKn"
                  value={givenKn}
                  onValueChange={(e) => setGivenKn(e.value)}
                  mode="decimal"
                  locale="de-DE"
                  minFractionDigits={2}
              /><label
                  htmlFor="givenKn"
              >
                Iznos kojeg je kupac dao u kn
              </label>
              </span></div>
            </div>
            <p className="text-2xl text-white text-center">
              {calcRest.data
                  ? calcRest.data.resultText
                  : "Unesite iznos u € i iznos kojeg je kupac dao kako biste dobili izračun ostatka!"}
            </p>
          </div>
        </main>
      </>
  );
};

export default Home;
