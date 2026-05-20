"use client";

import { useState } from "react";

export default function DesignTool() {

  const [price, setPrice] =
    useState(270);

  return (
    <section className="mt-20 bg-white p-10 rounded-3xl shadow-sm">

      <h2 className="text-4xl font-serif text-center mb-10">
        Diseña tu ramo
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <img
            src="https://images.pexels.com/photos/34701067/pexels-photo-34701067.jpeg"
            className="rounded-2xl"
          />
        </div>

        <div>

          <h3 className="text-2xl mb-5">
            Extras
          </h3>

          <div className="space-y-3">

            <button
              onClick={() =>
                setPrice(price + 40)
              }
              className="block border px-4 py-2 rounded-full"
            >
              Cinta de seda +Q40
            </button>

            <button
              onClick={() =>
                setPrice(price + 80)
              }
              className="block border px-4 py-2 rounded-full"
            >
              Vela artesanal +Q80
            </button>

          </div>

          <p className="text-3xl mt-10 text-rose-700">
            Q{price}
          </p>

        </div>

      </div>

    </section>
  );
}