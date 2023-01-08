import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";
import { Button } from "primereact/button";

const Home: NextPage = () => {
  const [priceEur, setInputValue] = useState<number | null>(0);
  const [givenEur, setGivenEur] = useState<number | null>(0);
  const [givenKn, setGivenKn] = useState<number | null>(0);

  const calcRest = api.calculateRest.calculateRest.useQuery({
    priceEur: priceEur ?? 0,
    givenEur: givenEur ?? 0,
    givenKn: givenKn ?? 0,
  });

  const goToGitHub = () => {
    window.open("https://github.com/xiphoss1/kusur.martinovic.dev", "_blank");
  };

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
      <main className="min-h-screen bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
        <Button
          icon="pi pi-github"
          className="p-button-rounded p-button-lg p-button-plain p-button-text absolute top-0 right-0 "
          aria-label="GitHub"
          onClick={(event) => goToGitHub()}
        />
        <div className="flex min-h-[90vh] flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-center text-5xl font-extrabold tracking-tight text-slate-200 sm:text-[5rem]">
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
                  <label htmlFor="priceEur">Unesite iznos artikla u €</label>
                </span>
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
                />
                <label htmlFor="givenEur">Iznos kojeg je kupac dao u €</label>
              </span>
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
                  />
                  <label htmlFor="givenKn">Iznos kojeg je kupac dao u kn</label>
                </span>
              </div>
            </div>
            <p className="text-center text-2xl text-white">
              {calcRest.data
                ? calcRest.data.resultText
                : "Unesite iznos u € i iznos kojeg je kupac dao kako biste dobili izračun ostatka!"}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
