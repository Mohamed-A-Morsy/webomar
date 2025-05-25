import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SocialActivities() {
  const location = useLocation();
  const { games = [], typeName = "النشاط" } = location.state || {};
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  const handleFlip = (id: number) => {
    setFlippedCardId((prev) => (prev === id ? null : id));
  };
  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-4">
            الانشطة الخاصة بـ {typeName}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-3">
        {games.map((game) => {
          const isFlipped = flippedCardId === game.id;

          return (
            <div
              key={game.id}
              onClick={() => handleFlip(game.id)}
              className="w-full h-[400px] perspective"
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
              >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                  <img
                    src={`data:image/${game?.image?.imageExtension};base64,${game?.image?.img}`}
                    alt={game.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                   
                    <h3 className="text-lg font-semibold text-secondary">
                      {game.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {stripHtml(game.description)?.length > 100
                        ? `${stripHtml(game.description).substring(0, 100)}...`
                        : stripHtml(game.description)}
                    </p>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-secondary mb-2">
                      {game.title}
                    </h3>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {stripHtml(game.description)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .perspective {
          perspective: 1200px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
